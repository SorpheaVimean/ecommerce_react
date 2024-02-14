const db = require("../util/db");
const { isEmptyOrNull } = require("../util/helper");

const getAll = async (req, res) => {
  try{
  const { page, txtSearch, group } = req.query;
  var param = [];
  var limitItem = 9;
  var offset = (page - 1) * limitItem;
  if (isNaN(offset)) {
    offset = 0; // Set a default value of 0 if the offset is not a valid number
  }

  var select = "SELECT * FROM permission";
  var where = "";
  if (!isEmptyOrNull(txtSearch)) {
    where = " WHERE id = ? OR name LIKE ? OR code LIKE ? ";
    param.push(txtSearch);
    param.push("%" + txtSearch + "%");
    param.push("%" + txtSearch + "%");
  }
  if (!isEmptyOrNull(group)) {
    if (where === "") {
      where = " WHERE `group` = ?";
    } else {
      where += " AND `group` = ?";
    }
    param.push(group);
  }
  
  var order = " ORDER BY id DESC ";
  var limit = " LIMIT " + limitItem + " OFFSET " + offset + "";
  var sql = select + where + order + limit;
  const list = await db.query(sql, param);

  var selectTotal = "SELECT COUNT(id) as total FROM permission";
  var sqlTotal = selectTotal + where;
  const totalRecord = await db.query(sqlTotal, param);
  const sqlgroupname = "SELECT * FROM permission GROUP BY `group`";
  const sqlGroup = await db.query(sqlgroupname, param);
  res.json({
    list: list,
    totalRecord: totalRecord,
    groupName: sqlGroup,
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
  const { name, code, group } = req.body;
  const sqlCheckName = await db.query(
    "SELECT * FROM permission WHERE name = ? AND code = ? ",
    [name,code]
  );

  if (sqlCheckName.length > 0) {
    return res.status(400).json({
      message: "Duplicate Name and Code Name. Please input another Name and Code Name!",
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
  const sqlCheckName = await db.query(
    "SELECT * FROM permission WHERE name = ? AND code = ? ",
    [name,code]
  );

  if (sqlCheckName.length > 0) {
    return res.status(400).json({
      message: "Duplicate Name and Code Name. Please input another Name and Code Name!",
    });
  }
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
