const db = require("../util/db");
const { isEmptyOrNull } = require("../util/helper");

const getAll = async (req, res) => {
  try{
  const { page, txtSearch, status } = req.query;
  var param = [];
  var limitItem = 9;
  var offset = (page - 1) * limitItem;
  if (isNaN(offset)) {
    offset = 0; // Set a default value of 0 if the offset is not a valid number
  }

  var select = "SELECT * FROM role";
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

  var selectTotal = "SELECT COUNT(id) as total FROM role";
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
