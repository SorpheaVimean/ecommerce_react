const db = require("../util/db");
const { isEmptyOrNull } = require("../util/helper");

const getAll = async (req, res) => {
  try {
    const { page, role_id, permission_id } = req.query;
    var param = [];
    var limitItem = 9;
    var offset = (page - 1) * limitItem;
    if (isNaN(offset)) {
      offset = 0; // Set a default value of 0 if the offset is not a valid number
    }

    var select = `
    SELECT rp.*, r.name AS role_name, p.code AS permission_name
    FROM role_permission rp 
    INNER JOIN role r ON r.id = rp.role_id 
    INNER JOIN permission p ON p.id = rp.permission_id
    `;
    var where = "";
    if (!isEmptyOrNull(role_id)) {
      if (where === "") {
        where = " WHERE role_id = ?";
      } else {
        where += " AND role_id = ?";
      }
      param.push(role_id); // Push role_id into the param array
    }
    if (!isEmptyOrNull(permission_id)) {
      if (where === "") {
        where = " WHERE permission_id = ?";
      } else {
        where += " AND permission_id = ?";
      }
      param.push(permission_id); // Push permission_id into the param array
    }
    var order = " ORDER BY rp.role_id";
    var limit = " LIMIT " + limitItem + " OFFSET " + offset + "";
    var sql = select + where + order + limit;
    const list = await db.query(sql, param);

    var selectTotal = "SELECT COUNT(role_id) as total FROM role_permission";
    var sqlTotal = selectTotal + where;
    const totalRecord = await db.query(sqlTotal, param);
    const sqlRole = "SELECT * FROM role ";
    const sqlRoleName = await db.query(sqlRole, param);
    const sqlPermission = "SELECT * FROM permission GROUP BY code";
    const sqlPermissionName = await db.query(sqlPermission, param);
    res.json({
      list: list,
      totalRecord: totalRecord,
      roleName: sqlRoleName,
      permissionName: sqlPermissionName,
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
    [
      role_permissions.map((role_permission) => role_permission.permission_id),
      role_id,
    ]
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
  const { id, role_id, message } = req.body;
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
  const sqlRemove = await db.query("DELETE FROM role_permission WHERE permission_id = ?", [
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
