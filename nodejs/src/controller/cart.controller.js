const db = require("../util/db");
const { isEmptyOrNull } = require("../util/helper");

const getCartByCutomer = async (req, res) => {
  const { customer_id } = req.params;

  var sql = "SELECT c.id AS ID, c.quantity AS qty, c.quantity*p.price AS Subtotal, p.* FROM carts c";
  sql += " INNER JOIN product p ON (c.product_id = p.id)";
  sql += " WHERE c.customer_id = ?";
  const list = await db.query(sql, [customer_id]);
  const total = `SELECT COUNT(c.id) AS totalItems, SUM(c.quantity*p.price) as totalPrice 
                  FROM carts c
                  INNER JOIN product p ON p.id = c.product_id WHERE customer_id = ?`
  const totalRecord = await db.query(total, [customer_id]);
  res.json({
    list: list,
    totalRecord: totalRecord,
  });
};

const addCart = async (req, res) => {
    const { customer_id, product_id, quantity } = req.body;
    var message = {};
    if (isEmptyOrNull(customer_id)) {
      message.customer_id = "customer_id required!";
    }
    if (isEmptyOrNull(product_id)) {
      message.product_id = "product_id required!";
    }
    // if (isEmptyOrNull(quantity)) {
    //   message.quantity = "quantity required!";
    // }
    if (Object.keys(message).length > 0) {
      res.json({
        error: true,
        message: message,
      });
    }
  
    // Check if there's already an existing cart entry for the same customer and product combination
    var existingCart = await db.query("SELECT * FROM carts WHERE customer_id = ? AND product_id = ?", [customer_id, product_id]);
  
    if (existingCart.length > 0) {
      // If a matching entry exists, update the quantity by incrementing it
      var updatedQuantity = existingCart[0].quantity + 1;
      await db.query("UPDATE carts SET quantity = ? WHERE customer_id = ? AND product_id = ?", [updatedQuantity, customer_id, product_id]);
      res.json({
          message: "The same product quantity updated!",
      });
    } else {
      // If no matching entry exists, insert a new row into the carts table
      var sql = "INSERT INTO carts (customer_id, product_id) VALUES (?, ?)";
      var data = await db.query(sql, [customer_id, product_id]);
      res.json({
        message: "New product added to Cart!",
        data: data,
      });
    }
  };
  

const updateCart = async (req, res) => {
  const {
    id,
    quantity, // -1 | 1
  } = req.body;
  var message = {};
  if (isEmptyOrNull(id)) {
    message.cart_id = "cart_id required!";
  }
  if (isEmptyOrNull(quantity)) {
    message.quantity = "quantity required!";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
  }
  // var sql = "UPDATE carts SET quantity=(quantity+?) WHERE id=?";
  var sql = "UPDATE carts SET quantity= ? WHERE id=?";
  // 4 => 1 => (4+1) =5
  // 4 => -1 => (4-1) = 3
  var data = await db.query(sql, [quantity, id]);
  res.json({
    message: "Cart update success!",
    data: data,
  });
};

const removeCart = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await db.query("DELETE FROM carts WHERE id = ?", [id]);
    if (data.affectedRows === 0) {
      return res.status(404).json({
        message: "Cart not found or already removed.",
      });
    }
    res.json({
      data: data,
      message: "1 item removed!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const removeAll = async (req, res) => {
  const { customer_id } = req.body;
  var data = await db.query("DELETE FROM carts WHERE customer_id = ?", [customer_id]);
  res.json({
    data: data,
    message: "Cart removed!",
  });
};

module.exports = {
  getCartByCutomer,
  addCart,
  removeCart,
  updateCart,
  removeAll
};
