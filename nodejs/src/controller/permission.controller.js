const db = require("../util/db");
const { isEmptyOrNull } = require("../util/helper");

const getAll = async (req, res) => {
  const { id, name, code, group } = req.body;
  const sql = await db.query("SELECT * FROM permission", [
    id,
    name,
    code,
    group,
  ]);
  res.json({
    list: sql,
  });
};
const create = async (req, res) => {
  const { name, code, group } = req.body;
  const sqlCheckName = await db.query(
    "SELECT * FROM permission WHERE code = ?",
    [code]
  );

  if (sqlCheckName.length > 0) {
    return res.status(400).json({
      message: "Duplicate code name. Please input another code name!",
    });
  }
  const sqlCreate = await db.query(
    "INSERT INTO permission (name, code, `group`) VALUES (?, ?, ?)",
    [name, code, group]
  );
  res.json({
    message: "New permission created successfully",
    data: sqlCreate,
  });
};


const update = async (req, res) => {
  const { id, name, code, group } = req.body;
  const sqlUpdate = await db.query(
    "UPDATE permission SET name = ?, code = ?, `group` = ? WHERE id = ?",
    [name, code, group, id]
  );
  res.json({
    message:
      sqlUpdate.affectedRows != 0
        ? "permission updated successfully!"
        : "permission not found!",
    data: sqlUpdate,
  });
};

const remove = async (req, res) => {
  const { id } = req.body;
  const sqlRemove = await db.query("DELETE FROM permission WHERE id = ?", [id]);
  res.json({
    message:
      sqlRemove.affectedRows != 0
        ? "permission removed successfully!"
        : "permission not found!",
  });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
