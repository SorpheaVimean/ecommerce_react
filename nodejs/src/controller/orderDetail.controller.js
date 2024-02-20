// const db = require("../util/db");
// const { isEmptyOrNull } = require("../util/helper");

// const getAll = async (req, res) =>{

// }
// const create = async (req, res) =>{

// }
// const update = async (req, res) =>{

// }
// const remove = async (req, res) =>{

// }

// module.exports = {
//     getAll,
//     create,
//     update,
//     remove,
//   };

const db = require("../util/db");
const { isEmptyOrNull, getParam } = require("../util/helper");

const getAll = async (req, res) => {
  try {
    const { page, txtSearch, status } = req.query;
    var param = [];
    var limitItem = 7;
    var offset = (page - 1) * limitItem;
    if (isNaN(offset)) {
      offset = 0; // Set a default value of 0 if the offset is not a valid number
    }

    var select = "SELECT * FROM order_detail";
    var where = "";
    if (!isEmptyOrNull(txtSearch)) {
      where = " WHERE id = ? OR name LIKE ?";
      param.push(txtSearch);
      param.push("%" + txtSearch + "%");
    }
    if (!isEmptyOrNull(status)) {
      if (where === "") {
        where = " WHERE status = ?";
      } else {
        where += " AND status = ?";
      }

      param.push(status);
    }
    var order = " ORDER BY id DESC ";
    var limit = " LIMIT " + limitItem + " OFFSET " + offset + "";
    var sql = select + where + order + limit;
    const list = await db.query(sql, param);

    var selectTotal = "SELECT COUNT(id) as total FROM order_detail";
    var sqlTotal = selectTotal + where;
    const totalRecord = await db.query(sqlTotal, param);
    res.json({
      list: list,
      totalRecord: totalRecord,
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
const getOrderByCustomer = async (req, res) => {
  try {
    const { order_id } = req.params;

    // Input validation
    if (!order_id) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // Ensure order_id is a valid integer or string
    if (isNaN(order_id)) {
      return res.status(400).json({ message: "Order ID must be a valid number" });
    }

    // Retrieve order details from the database
    const list = await db.query(
      `SELECT od.*,  p.image_1 AS Image, p.name AS PName
         FROM order_detail od
         INNER JOIN product p ON p.id = od.product_id
         WHERE order_id = ?`,
      [order_id]
    );
    const getTotal = await db.query("SELECT SUM(total) AS subtotal, SUM(quantity) AS Quantity FROM order_detail WHERE order_id = ?", [order_id]);
    // Return the list of order details
    res.json({
      list: list,
      getTotal: getTotal,
    });
  } catch (error) {
    console.error("Error in getOrderByCustomer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const create = async (req, res) => {
  const { name, description, status } = req.body;
  const sqlCheckName = await db.query(
    "SELECT * FROM order_detail WHERE name = ?",
    [name]
  );

  if (sqlCheckName.length > 0) {
    return res.status(400).json({
      message: "Duplicate order_detail. Please input other order_detail!",
    });
  }
  const sqlCreate = await db.query(
    "INSERT INTO order_detail (name, description, status) VALUES (?, ?, ?)",
    [name, description, status]
  );
  res.json({
    message: "New order_detail created successfully",
    data: sqlCreate,
  });
};
const update = async (req, res) => {
  const { id, name, description, status } = req.body;
  const sqlUpdate = await db.query(
    "UPDATE order_detail SET name = ?, description = ?, status = ? WHERE id = ?",
    [name, description, status, id]
  );
  res.json({
    message:
      sqlUpdate.affectedRows != 0
        ? "order_detail updated successfully!"
        : "Brand not found!",
    data: sqlUpdate,
  });
};

const remove = async (req, res) => {
  const { id } = req.body;
  const sqlRemove = await db.query("DELETE FROM brand WHERE id = ?", [id]);
  res.json({
    message:
      sqlRemove.affectedRows != 0
        ? "Brand removed successfully!"
        : "Brand not found!",
  });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  getOrderByCustomer,
};
