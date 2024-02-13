const db = require("../util/db");
const { isEmptyOrNull } = require("../util/helper");

const getAll = async (req, res) => {
  const { id, name, description, status, create_at } = req.body;
  const sql = await db.query("SELECT * FROM category", [
    id,
    name,
    description,
    status,
    create_at,
  ]);
  res.json({
    list: sql,
  });
};
const create = async (req, res) => {
  const { name, description, status } = req.body;
  const sqlCheckName = await db.query("SELECT * FROM category WHERE name = ?", [
    name,
  ]);

  if (sqlCheckName.length > 0) {
    return res.status(400).json({
      message: "Duplicate category. Please input other category!",
    });
  }
  const sqlCreate = await db.query(
    "INSERT INTO category (name, description, status) VALUES (?, ?, ?)",
    [name, description, status]
  );
  res.json({
    message: "New category created successfully",
    data: sqlCreate,
  });
};
const update = async (req, res) => {
    const { id, name, description, status } = req.body;
    const sqlUpdate = await db.query(
      "UPDATE category SET name = ?, description = ?, status = ? WHERE id = ?",
      [name, description, status, id] 
    );
    res.json({
      message:
      sqlUpdate.affectedRows != 0
        ? "category updated successfully!"
        : "category not found!",
        data: sqlUpdate,
    });
  };
  
const remove = async (req, res) => {
  const { id } = req.body;
  const sqlRemove = await db.query("DELETE FROM category WHERE id = ?", [id]);
  res.json({
    message:
      sqlRemove.affectedRows != 0
        ? "category removed successfully!"
        : "category not found!",
  });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
