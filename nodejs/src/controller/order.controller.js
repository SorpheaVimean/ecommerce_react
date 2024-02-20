const db = require("../util/db");
const { isEmptyOrNull, invoiceNumber } = require("../util/helper");

const generateInvoiceNo = async () => {
  const data = await db.query(" SELECT MAX( id ) as id FROM `order`; ");
  return invoiceNumber(data[0].id); //null 1 , 2, 3
};

const getAll = async (req, res) => {
    try{
    const { page, txtSearch, order_status_id, payment_method_id, is_paid } = req.query;
    var param = [];
    var limitItem = 7;
    var offset = (page - 1) * limitItem;
    if (isNaN(offset)) {
      offset = 0; 
    }
    var select =` SELECT o.*, os.name as StatusName, pm.name as PayName 
    FROM \`order\` o 
    INNER JOIN order_status os ON os.id = o.order_status_id 
    INNER JOIN payment_methode pm ON pm.id = o.payment_method_id`;
    var where = "";
    if (!isEmptyOrNull(txtSearch)) {
      where = " WHERE invoice_no LIKE ? OR firstname LIKE ? OR lastname LIKE ?";
      param.push("%" + txtSearch + "%");
      param.push("%" + txtSearch + "%");
      param.push("%" + txtSearch + "%");
    }
    if (!isEmptyOrNull(order_status_id)) {
      if (where === "") {
        where = " WHERE order_status_id = ?";
      } else {
        where += " AND order_status_id = ?";
      }
      
      param.push(order_status_id);
    }
    if (!isEmptyOrNull(payment_method_id)) {
      if (where === "") {
        where = " WHERE payment_method_id = ?";
      } else {
        where += " AND payment_method_id = ?";
      }
      
      param.push(payment_method_id);
    }
    if (!isEmptyOrNull(is_paid)) {
      if (where === "") {
        where = " WHERE is_paid = ?";
      } else {
        where += " AND is_paid = ?";
      }
      
      param.push(is_paid);
    }
    var order = " ORDER BY o.id DESC ";
    var limit = " LIMIT " + limitItem + " OFFSET " + offset + "";
    var sql = select + where + order + limit;
    const list = await db.query(sql, param);
  
    var selectTotal = "SELECT COUNT(id) as total FROM `order`";
    var sqlTotal = selectTotal + where;
    const totalRecord = await db.query(sqlTotal, param);
    const orderStatusName = await db.query("SELECT * FROM order_status", param);
    const paymentName = await db.query("SELECT * FROM payment_methode", param);
    const latetestOrder = await db.query(` SELECT o.*, os.name as StatusName, pm.name as PayName 
    FROM \`order\` o 
    INNER JOIN order_status os ON os.id = o.order_status_id 
    INNER JOIN payment_methode pm ON pm.id = o.payment_method_id
    ORDER BY o.id LIMIT 4`);
    const lastFourMonth = await db.query(` SELECT
    YEAR(create_at) AS year,
    MONTH(create_at) AS month,
    COUNT(*) AS total_orders
  FROM
  \`order\`
  WHERE
    create_at >= DATE_SUB(CURRENT_DATE, INTERVAL 4 MONTH)
  GROUP BY
    YEAR(create_at), MONTH(create_at)
  ORDER BY
    year DESC, month DESC;`);
    
    
    res.json({
      list: list,
      totalRecord: totalRecord,
      orderStatusName: orderStatusName,
      paymentName: paymentName,
      latetestOrder: latetestOrder,
      lastFourMonth: lastFourMonth,
      bodyData: req.body,
      queryData: req.query,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: e.message,
      error: e,
    });
  }
  };


const getOne = async (req, res) => {
  const list = await db.query("SELECT * FROM `order` WHERE order_id = ?", [
    req.params.id,
  ]);
  res.json({
    list: list,
  });
};

const getOderByCustomer = async (req, res) => {
  const { customer_id } = req.params;
  const order = `SELECT o.*, os.message AS Message
                   FROM \`order\` o 
                   INNER JOIN order_status os ON os.id = o.order_status_id
                    WHERE customer_id = ? `;
  const list = await db.query(order, [
    customer_id,
  ]);
  res.json({
    list: list,
  });
};

const create = async (req, res) => {
  try {
    // Begin transaction
    await db.beginTransaction();

    // Destructure request body
    const {
      customer_id,
      customer_address,
      order_status_id,
      payment_method_id,
      comment,
    } = req.body;

    // Validate required fields
    const message = {};
    if (!customer_id) message.customer_id = "customer_id required!";
    if (!payment_method_id)
      message.payment_method_id = "payment_method_id required!";
    if (!customer_address)
      message.customer_address = "customer_address required!";
    if (Object.keys(message).length > 0) {
      res.json({
        message: message,
        error: true,
      });
      return;
    }

    // Fetch products from the cart
    const products = await db.query(
      "SELECT c.*, p.price FROM carts c INNER JOIN product p ON (c.product_id = p.id) WHERE c.customer_id = ?",
      [customer_id]
    );

    if (products.length > 0) {
      // Calculate order total
      let order_total = 0;
      products.forEach((item) => {
        order_total += item.quantity * item.price;
      });

      // Fetch customer information
      const [customerInfo] = await db.query(
        "SELECT firstname, lastname, tel FROM customer WHERE id = ?",
        [customer_id]
      );
      const { firstname, lastname, tel } = customerInfo;

      // Insert data into the order table
      const order_status_id = 1; // Pending
      const inv_no = await generateInvoiceNo();
      const sqlOrder =
        "INSERT INTO `order` (customer_id, customer_address, payment_method_id, order_status_id, comment, order_total, invoice_no, firstname, lastname, tel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const sqlOrderParam = [
        customer_id,
        customer_address,
        payment_method_id,
        order_status_id,
        comment,
        order_total,
        inv_no,
        firstname,
        lastname,
        tel,
      ];
      const order = await db.query(sqlOrder, sqlOrderParam);

      // Insert order details
      const orderDetailInsertions = products.map(async (item) => {
        const sqlOrderDetails =
          "INSERT INTO order_detail (order_id, product_id, quantity, price, total) VALUES (?, ?, ?, ?, ?)";
        const sqlOrderDetailsParam = [
          order.insertId,
          item.product_id,
          item.quantity,
          item.price,
          order_total,
        ];
        return await db.query(sqlOrderDetails, sqlOrderDetailsParam);
      });
      await Promise.all(orderDetailInsertions);

      // Update product stock
      const stockUpdates = products.map(async (item) => {
        const sqlProduct =
          "UPDATE product SET quantity = (quantity - ?) WHERE id = ?";
        return await db.query(sqlProduct, [item.quantity, item.product_id]);
      });
      await Promise.all(stockUpdates);

      // Clear carts for the customer
      await db.query("DELETE FROM carts WHERE customer_id = ?", [customer_id]);

      // Commit transaction
      await db.commit();

      // Send success response
      res.json({
        message: "Your order has been placed successfully!",
        data: order,
      });
    } else {
      res.json({
        message: "Your carts is empty!",
        error: true,
      });
    }
  } catch (e) {
    // Rollback transaction on error
    await db.rollback();
    res.status(500).json({
      message: e.message,
      error: true,
    });
  }
};

const update = async (req, res) => {
  try {
    const { order_status_id, is_paid, id } = req.body;
    const sqlupdate = await db.query(
      "UPDATE `order` SET order_status_id = ?, is_paid = ? WHERE id = ?",
      [order_status_id, is_paid, id]
    );
    if (sqlupdate) {
      res.json({
        message:
        sqlupdate.affectedRows != 0
          ? "Order updated successfully!"
          : "Order not found!",
        error: true,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
      error: true,
    });
  }
};

const remove = async (req, res) => {
    const { id } = req.body;
    const sqlRemove = await db.query("DELETE FROM `order` WHERE id = ?", [id]);
    res.json({
      message:
        sqlRemove.affectedRows != 0
          ? "order removed successfully!"
          : "order not found!",
    });
  };
module.exports = {
  getAll,
  getOne,
  update,
  remove,
  create,
  getOderByCustomer,
};
