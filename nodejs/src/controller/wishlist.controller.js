const db = require("../util/db");
const { isEmptyOrNull } = require("../util/helper");

const getAll = async (req, res) => {
  const { customer_id  } = req.body;
  const sql = await db.query("SELECT * FROM wishlist WHERE customer_id = ?", [customer_id]);
  res.json({
    list: sql,
  });
};
const create = async (req, res) => {
    const { customer_id, product_id } = req.body;
    const sqlCheckProduct = await db.query(
      "SELECT * FROM product WHERE id = ?",
      [product_id]
    );
  
    if (sqlCheckProduct.length === 0) {
      return res.status(400).json({
        message: "Product not found!",
      });
    }
  
    const sqlCheckWishlist = await db.query(
      "SELECT * FROM wishlist WHERE customer_id = ? AND product_id = ?",
      [customer_id, product_id]
    );
  
    if (sqlCheckWishlist.length > 0) {
      return res.status(400).json({
        message: "Product already added to wishlist!",
      });
    }
  
    const sqlCreate = await db.query(
      "INSERT INTO wishlist (customer_id, product_id) VALUES (?, ?)",
      [customer_id, product_id]
    );
    
    res.json({
      message: "New product added to wishlist!",
      data: sqlCreate,
    });
  };
  


const remove = async (req, res) => {
  const { id } = req.body;
  const sqlRemove = await db.query("DELETE FROM wishlist WHERE id = ?", [
    id,
  ]);
  res.json({
    message:
      sqlRemove.affectedRows != 0
        ? "wishlist removed successfully!"
        : "wishlist not found!",
  });
};

module.exports = {
  getAll,
  create,
  remove,
};
