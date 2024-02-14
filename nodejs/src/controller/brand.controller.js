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
  try{
  const { page, txtSearch, status } = req.query;
  var param = [];
  var limitItem = 7;
  var offset = (page - 1) * limitItem;
  if (isNaN(offset)) {
    offset = 0; // Set a default value of 0 if the offset is not a valid number
  }

  var select = "SELECT * FROM brand";
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

  var selectTotal = "SELECT COUNT(id) as total FROM brand";
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
  const { name, description, status } = req.body;
  const sqlCheckName = await db.query("SELECT * FROM brand WHERE name = ?", [
    name,
  ]);

  if (sqlCheckName.length > 0) {
    return res.status(400).json({
      message: "Duplicate brand. Please input other brand!",
    });
  }
  const sqlCreate = await db.query(
    "INSERT INTO brand (name, description, status) VALUES (?, ?, ?)",
    [name, description, status]
  );
  res.json({
    message: "New brand created successfully",
    data: sqlCreate,
  });
};
const update = async (req, res) => {
  const { id, name, description, status } = req.body;
  const sqlUpdate = await db.query(
    "UPDATE brand SET name = ?, description = ?, status = ? WHERE id = ?",
    [name, description, status, id]
  );
  res.json({
    message:
      sqlUpdate.affectedRows != 0
        ? "Brand updated successfully!"
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
};
