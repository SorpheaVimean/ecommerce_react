const db = require("../util/db");
const { isEmptyOrNull, removeFile } = require("../util/helper");

const getAll = async (req, res) => {
  try{
  const { page, txtSearch, status } = req.query;
  var param = [];
  var limitItem = 7;
  var offset = (page - 1) * limitItem;
  if (isNaN(offset)) {
    offset = 0; // Set a default value of 0 if the offset is not a valid number
  }

  var select = "SELECT * FROM payment_methode";
  var where = "";
  if (!isEmptyOrNull(txtSearch)) {
    where = " WHERE id = ? OR name LIKE ? OR code LIKE ? ";
    param.push(txtSearch);
    param.push("%" + txtSearch + "%");
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

  var selectTotal = "SELECT COUNT(id) as total FROM payment_methode";
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
  const sqlCheckName = await db.query(
    "SELECT * FROM payment_methode WHERE code = ?",
    [code]
  );
  var filename = null;
  if (req.file) {
    filename = req.file.filename;
  }
  if (sqlCheckName.length > 0) {
    return res.status(400).json({
      message: "Duplicate code name. Please input other code name!",
    });
  }
  const sqlCreate = await db.query(
    "INSERT INTO payment_methode (name, code, image, status) VALUES (?, ?, ?, ?)",
    [name, code, filename, status]
  );
  res.json({
    message: "New payment_methode created successfully",
    data: sqlCreate,
  });
};

const update = async (req, res) => {
    try {
      const { id, name, code, image, status } = req.body;
      let filename = image;
  
      if (req.file) {
        filename = req.file.filename;
      }
  
      const [sqlselect] = await db.query("SELECT * FROM payment_methode WHERE id = ?", [id]);
  
      const sqlUpdate = await db.query(
        "UPDATE payment_methode SET name = ?, code = ?, image = ?, status = ? WHERE id = ?",
        [name, code, filename, status, id]
      );
  
      if (sqlUpdate.affectedRows !== 0) {
        if (req.file || image === null) {
          // If a new file was uploaded or the image was initially null
          if (sqlselect && sqlselect.image !== null && sqlselect.image !== "") {
            // If there was an existing image
            removeFile(sqlselect.image); // Remove the old image file
          }
        }
      }
  
      res.json({
        message: "Payment method updated successfully!",
        data: sqlUpdate,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  };
  

const remove = (req, res) => {
    const { id, image } = req.body;
    var sql = "DELETE FROM payment_methode WHERE id = ?";
    var param = [id];
    db.query(sql, param, (error, rows) => {
      if (!error) {
        if (rows.affectedRows != 0) {
          removeFile(image);
        }
        res.json({
          message:
            rows.affectedRows != 0
              ? "payment_methode removed successfully!"
              : "payment_methode not found!",
          data: rows,
        });
      } else {
        res.json({
          error: true,
          message: error,
        });
      }
    });
  };

module.exports = {
  getAll,
  create,
  update,
  remove,
};
