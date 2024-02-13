const db = require("../util/db");
const { isEmptyOrNull, removeFile } = require("../util/helper");

const getAll = async (req, res) => {
  const sql = await db.query("SELECT * FROM payment_methode");
  res.json({
    list: sql,
  });
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
