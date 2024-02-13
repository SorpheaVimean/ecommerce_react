const db = require("../util/db");
const { isEmptyOrNull } = require("../util/helper");

const getAll = async (req, res) => {
  const { id, name, code, status, create_at } = req.body;
  const sql = await db.query("SELECT * FROM role", [
    id,
    name,
    code,
    status,
    create_at,
  ]);
  res.json({
    list: sql,
  });
};
const create = async (req, res) => {
  const { name, code, status } = req.body;
  const sqlCheckName = await db.query("SELECT * FROM role WHERE name = ?", [
    name,
  ]);

  if (sqlCheckName.length > 0) {
    return res.status(400).json({
      message: "Duplicate role. Please input other role!",
    });
  }
  const sqlCreate = await db.query(
    "INSERT INTO role (name, code, status) VALUES (?, ?, ?)",
    [name, code, status]
  );
  res.json({
    message: "New role created successfully",
    data: sqlCreate,
  });
};
const update = async (req, res) => {
  const { id, name, code, status } = req.body;
  const sqlUpdate = await db.query(
    "UPDATE role SET name = ?, code = ?, status = ? WHERE id = ?",
    [name, code, status, id]
  );
  res.json({
    message:
      sqlUpdate.affectedRows != 0
        ? "role updated successfully!"
        : "role not found!",
    data: sqlUpdate,
  });
};

const remove = async (req, res) => {
  const { id } = req.body;
  const sqlRemove = await db.query("DELETE FROM role WHERE id = ?", [id]);
  res.json({
    message:
      sqlRemove.affectedRows != 0
        ? "role removed successfully!"
        : "role not found!",
  });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
