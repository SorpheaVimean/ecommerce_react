const db = require("../util/db");
const { isEmptyOrNull } = require("../util/helper");

const getAll = async (req, res) => {
  const {role_id, permission_id,  } = req.body;
  const sql = await db.query("SELECT * FROM role_permission", [
    role_id,
    permission_id,
    ,
  ]);
  res.json({
    list: sql,
  });
};
const create = async (req, res) => {
    const { role_permissions } = req.body;
    
    // Ensure role_permissions array is provided and not empty
    if (!Array.isArray(role_permissions) || role_permissions.length === 0) {
      return res.status(400).json({
        message: "Role permissions array is required and must not be empty!",
      });
    }
  
    // Construct the placeholders for the VALUES part of the query
    const placeholders = role_permissions.map(() => "(?, ?)").join(", ");
  
    // Extract values from the role_permissions array
    const values = role_permissions.reduce((acc, role_permission) => {
      acc.push(role_permission.role_id, role_permission.permission_id);
      return acc;
    }, []);
    const role_id = role_permissions[0].role_id;
    // Check for duplicate permissions
    const duplicatePermissions = await db.query(
        "SELECT permission_id FROM role_permission WHERE permission_id IN (?) AND role_id = ?",
        [role_permissions.map((role_permission) => role_permission.permission_id), role_id]
      );
      
  
    if (duplicatePermissions.length > 0) {
      return res.status(400).json({
        message: "Duplicate permission. Please input another permission!",
      });
    }
  
    // Insert the role_permissions into the role_permission table
    const sqlCreate = await db.query(
      `INSERT INTO role_permission (role_id, permission_id) VALUES ${placeholders}`,
      values
    );
  
    res.json({
      message: "New role_permissions created successfully",
      data: sqlCreate,
    });
  };
  

const update = async (req, res) => {
  const { id, role_id, message,  } = req.body;
  const sqlUpdate = await db.query(
    "UPDATE role_permission SET role_id = ?, message = ? WHERE id = ?",
    [role_id, message, , id]
  );
  res.json({
    message:
      sqlUpdate.affectedRows != 0
        ? "role_permission updated successfully!"
        : "role_permission not found!",
    data: sqlUpdate,
  });
};

const remove = async (req, res) => {
  const { id } = req.body;
  const sqlRemove = await db.query("DELETE FROM role_permission WHERE id = ?", [
    id,
  ]);
  res.json({
    message:
      sqlRemove.affectedRows != 0
        ? "role_permission removed successfully!"
        : "role_permission not found!",
  });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
