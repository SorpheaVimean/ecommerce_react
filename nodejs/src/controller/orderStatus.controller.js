const db = require("../util/db");
const { isEmptyOrNull } = require("../util/helper");

const getAll = async (req, res) => {
  const { id, name, message, sort_order } = req.body;
  const sql = await db.query("SELECT * FROM order_status", [
    id,
    name,
    message,
    sort_order,
  ]);
  res.json({
    list: sql,
  });
};
const create = async (req, res) => {
  const { name, message, sort_order } = req.body;
  const sqlCheckName = await db.query(
    "SELECT * FROM order_status WHERE name = ?",
    [name]
  );

  if (sqlCheckName.length > 0) {
    return res.status(400).json({
      message: "Duplicate status name. Please input another status name!",
    });
  }
  const sqlCreate = await db.query(
    "INSERT INTO order_status (name, message, `sort_order`) VALUES (?, ?, ?)",
    [name, message, sort_order]
  );
  res.json({
    message: "New order_status created successfully",
    data: sqlCreate,
  });
};

const update = async (req, res) => {
  const { id, name, message, sort_order } = req.body;
  const sqlUpdate = await db.query(
    "UPDATE order_status SET name = ?, message = ?, `sort_order` = ? WHERE id = ?",
    [name, message, sort_order, id]
  );
  res.json({
    message:
      sqlUpdate.affectedRows != 0
        ? "order_status updated successfully!"
        : "order_status not found!",
    data: sqlUpdate,
  });
};

const remove = async (req, res) => {
  const { id } = req.body;
  const sqlRemove = await db.query("DELETE FROM order_status WHERE id = ?", [
    id,
  ]);
  res.json({
    message:
      sqlRemove.affectedRows != 0
        ? "order_status removed successfully!"
        : "order_status not found!",
  });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
