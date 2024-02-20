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
  const { page, txtSearch } = req.query;
  var param = [];
  var limitItem = 9;
  var offset = (page - 1) * limitItem;
  if (isNaN(offset)) {
    offset = 0; // Set a default value of 0 if the offset is not a valid number
  }

  var select = "SELECT * FROM customer_address";
  var where = "";
  if (!isEmptyOrNull(txtSearch)) {
    where = " WHERE id = ? OR customer_id = ?";
    param.push(txtSearch);
    param.push(txtSearch);
    
  }
  var order = " ORDER BY id DESC ";
  var limit = " LIMIT " + limitItem + " OFFSET " + offset + "";
  var sql = select + where + order + limit;
  const list = await db.query(sql, param);

  var selectTotal = "SELECT COUNT(id) as total FROM customer_address";
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
  const {id, customer_id, address_1, address_2 } = req.body;

//   check customer exist or not
  const checkCustomerexisit = await db.query("SELECT id FROM customer WHERE id = ? ", [customer_id]);
  if(checkCustomerexisit.length === 0) {
    return res.status(400).json({
        message: "Customer does not exist. Please input other customer!",
      });
  }
// check duplicate custoemer address
  const sqlCheckCusId = await db.query("SELECT * FROM customer_address WHERE customer_id = ?", [
    customer_id,
  ]);

  if (sqlCheckCusId.length > 0) {
    return res.status(400).json({
      message: "Duplicate customer_address. Please input other customer_address!",
    });
  }

  const sqlCreate = await db.query(
    "INSERT INTO customer_address (customer_id, address_1, address_2) VALUES (?, ?, ?)",
    [customer_id, address_1, address_2]
  );
  res.json({
    message: "New customer_address created successfully",
    data: sqlCreate,
  });
};

const update = async (req, res) => {
    const { id, customer_id, address_1, address_2 } = req.body;

  const sqlUpdate = await db.query(
    "UPDATE customer_address SET customer_id = ?, address_1 = ?, address_2 = ? WHERE id = ?",
    [customer_id, address_1, address_2, id]
  );
  res.json({
    message:
      sqlUpdate.affectedRows != 0
        ? "customer_address updated successfully!"
        : "customer_address not found!",
    data: sqlUpdate,
  });
};

const remove = async (req, res) => {
  const { id } = req.body;
  const sqlRemove = await db.query("DELETE FROM customer_address WHERE id = ?", [id]);
  res.json({
    message:
      sqlRemove.affectedRows != 0
        ? "customer_address removed successfully!"
        : "customer_address not found!",
  });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
