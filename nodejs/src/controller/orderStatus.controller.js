const db = require("../util/db");
const { isEmptyOrNull } = require("../util/helper");

const getAll = async (req, res) => {
  try{
  const { page, txtSearch } = req.query;
  var param = [];
  var limitItem = 9;
  var offset = (page - 1) * limitItem;
  if (isNaN(offset)) {
    offset = 0; // Set a default value of 0 if the offset is not a valid number
  }

  var select = "SELECT * FROM order_status";
  var where = "";
  if (!isEmptyOrNull(txtSearch)) {
    where = " WHERE id = ? OR name LIKE ?";
    param.push(txtSearch);
    param.push("%" + txtSearch + "%");
  }
  var order = " ORDER BY id  ";
  var limit = " LIMIT " + limitItem + " OFFSET " + offset + "";
  var sql = select + where + order + limit;
  const list = await db.query(sql, param);

  var selectTotal = "SELECT COUNT(id) as total FROM order_status";
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
  const sqlCheckSort_Order = await db.query(
    "SELECT * FROM order_status WHERE sort_order = ?",
    [sort_order]
  );

  if (sqlCheckSort_Order.length > 0) {
    return res.status(400).json({
      message: "Duplicate sort_order. Please input another sort_order!",
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
  const sqlCheckSort_Order = await db.query(
    "SELECT * FROM order_status WHERE sort_order = ?",
    [sort_order]
  );

  if (sqlCheckSort_Order.length > 0) {
    return res.status(400).json({
      message: "Duplicate sort_order. Please input another sort_order!",
    });
  }
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
