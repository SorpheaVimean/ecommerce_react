const db = require("../util/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  TOKEN_KEY,
  REFRESH_KEY,
  removeFile,
  isEmptyOrNull,
  getParam,
} = require("../util/helper");
const { getPermissionUser } = require("./auth.controller");

//getAll
// const getAll = async (req, res) => {
//   try {
//     const { textSearch, page } = req.query;
//     const pageSize = 5; // Define pageSize here
//     var offset = ((page - 1) * pageSize); // find offset
//     var select = "SELECT * FROM employee ";
//     // SELECT * FROM employee LIMIT 3 OFFSET 1;
//     var where = ""; // Initialize where variable
//     if (textSearch != null && textSearch != "") {
//       where = " WHERE firstname LIKE '%" + textSearch + "%' OR lastname LIKE '%" + textSearch + "%' OR id LIKE '%" + textSearch + "%' ";
//     }
//     var orderBy = " ORDER BY Id DESC"; // Define orderBy variable
//     var limit = " LIMIT " + pageSize + " OFFSET " + offset; //2
//     var sqlSelect = select + where + orderBy + limit;
//     const sqlEmployee = await db.query(sqlSelect);
//     const sqlRole = await db.query("SELECT * FROM role");
//     // var total = 0;
//     // if (page == 1) {
//     //   var sqlCount = "SELECT COUNT(id) AS total FROM employee";
//     //   var sql = sqlCount + where;
//     //   var total = await db.query(sql);

//     // }
//     var total = 0;
//     if(page == 1){
//         var sqlCount = "SELECT COUNT(id) as Total FROM employee"
//         sql = sqlCount + where
//         var total = await db.query(sql)
//     }
//     res.json({
//       total: total,
//       list: sqlEmployee,
//       role: sqlRole,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
const getAll = async (req, res) => {
  try {
    const { page, txtSearch, roleId } = req.query;

    var param = [getParam(roleId)];
    var limitItem = 7;
    var offset = (page - 1) * limitItem;

    var select = "SELECT e.*, r.name as role_name ";
    var join =
      " FROM employee e " + " INNER JOIN role r ON (e.role_id = r.id) ";
    var where = " WHERE e.role_id = IFNULL(?,e.role_id) ";

    if (!isEmptyOrNull(txtSearch)) {
      where += " AND (e.id = ? OR e.firstname LIKE ? OR e.lastname LIKE ?) "; // Make sure to add parentheses for OR conditions
      param.push(txtSearch);
      param.push("%" + txtSearch + "%");
      param.push("%" + txtSearch + "%");
    }

    var order = " ORDER BY e.id DESC ";
    var limit = " LIMIT " + limitItem + " OFFSET " + offset + "";

    var sql = select + join + where + order + limit;
    const list = await db.query(sql, param);

    var selectTotal = " SELECT COUNT(e.id) as total ";
    var sqlTotal = selectTotal + join + where;
    const totalRecord = await db.query(sqlTotal, param);

    var sqlRole = "SELECT * FROM role";
    const role = await db.query(sqlRole);

    res.json({
      list: list,
      totalRecord: totalRecord, // Access the total count from the first row
      listRole: role,
      bodyData: req.body,
      queryData: req.query,
    });
  } catch (error) {
    console.log(e);
    res.status(500).send({
      message: error.message,
    });
  }
};

// update password
const updatePassword = async (req, res) => {
  try {
    const { id, email, oldPassword, newPassword, confirmPassword } = req.body;

    // Validate request parameters
    const message = {};

    if (isEmptyOrNull(id)) {
      message.id = "ID is required";
    }

    if (isEmptyOrNull(email)) {
      message.email = "Email is required";
    }

    if (isEmptyOrNull(oldPassword)) {
      message.oldPassword = "Old password is required";
    }

    if (isEmptyOrNull(newPassword)) {
      message.newPassword = "New password is required";
    } else if (newPassword !== confirmPassword) {
      message.newPassword = "Passwords do not match";
    }

    // Check if there are validation errors
    if (Object.keys(message).length > 0) {
      res.status(400).json({ message: message });
      return false;
    }

    // Check if user exists
    const user = await isUserExist(email);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    } else {
      // Verify old password
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Incorrect old password" });
      } else {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in the database
        // try {
        const sqlUpdate = "UPDATE employee SET password = ? WHERE email = ?";
        const result = await db.query(sqlUpdate, [hashedPassword, email]);
        delete user.password;
        if (result) {
          res.json({
            message: "Password updated successfully",
            profile: user,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// checke if user have or not
const isUserExist = async (email) => {
  const user = await db.query("SELECT * FROM employee WHERE email = ?", [
    email,
  ]);
  if (user) {
    return user[0];
  } else {
    return null;
  }
};

// login
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   //validate param request
//   var message = {};
//   if (email == null || email == "") {
//     message.email = "Please enter a valid email";
//   }
//   if (password == null || password == "") {
//     message.password = "Please enter a valid password";
//   }
//   if (Object.keys(message).length > 0) {
//     res.json({
//       message: message,
//     });
//   }

//   const user = await isUserExist(email);
//   if (!user) {
//     res.json({
//       message: "User or password are incorrect!",
//     });
//   } else {
//     // verify password (password_front_client, password_in_db)
//     const isCorrectPassword = await bcrypt.compareSync(password, user.password);
//     if (!isCorrectPassword) {
//       return res.json({ message: "User or password are incorrect!" });
//     } else {
//       delete user.password;
//       var permission = await getPermissionUser(user.id);

//       var obj = {
//         user: user,
//         permission: permission,
//         token: "", // generate token JWT
//       };

//       const access_token = jwt.sign({ data: { ...obj } }, TOKEN_KEY);
//       var refresh_token = jwt.sign({ data: { ...obj } }, REFRESH_KEY);
//       res.json({
//         message: isCorrectPassword
//           ? "Login success!"
//           : "User or password are incorrect!",
//         ...obj,
//         access_token: access_token,
//         refresh_token: refresh_token,
//       });
//     }
//   }
// };
const login = async (req, res) => {
  const { email, password } = req.body;
  const message = {};

  if (!email) message.email = "Please enter a valid email";
  if (!password) message.password = "Please enter a valid password";

  if (Object.keys(message).length > 0) {
    return res.json({ message });
  }

  const user = await isUserExist(email);
  if (!user || !(await bcrypt.compareSync(password, user.password))) {
    return res.json({ message: "User or password are incorrect!" });
  }

  const permission = await getPermissionUser(user.id);
  delete user.password;

  const obj = {
    user,
    permission,
    token: "", // generate token JWT
  };

  const access_token = jwt.sign({ data: obj }, TOKEN_KEY, { expiresIn: "2h" });
  const refresh_token = jwt.sign({ data: obj }, REFRESH_KEY);

  res.json({
    isSuccess: user ? true : false,
    message: "Login success!",
    ...obj,
    access_token,
    refresh_token,
  });
};

// upate customer
const update = async (req, res) => {
  try {
    const {
      id,
      role_id,
      firstname,
      lastname,
      gender,
      dob,
      email,
      tel,
      address,
      image,
      // is_remove_file,
    } = req.body;
    let filename = null;
    if (req.file) {
      filename = req.file.filename;
    } else {
      filename = image;
    }

    // Move the declaration outside of the callback function
    let sqlUpdate = `
    UPDATE employee 
    SET  role_id = ?, firstname = ?, lastname = ?, gender = ?, dob = ?, email = ?, tel = ?, address = ?, image = ? 
    WHERE id = ? 
  `;
    const params = [
      role_id,
      firstname,
      lastname,
      gender,
      dob,
      email,
      tel,
      address,
      filename,
      id,
    ];
    const result = await db.query(sqlUpdate, params);
    if (result) {
      res.json({
        message: "Update successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
  // Correct the SQL syntax
  // db.query("SELECT * FROM employee WHERE id = ?", [id], (error1, result1) => {
  //   if (error1) {
  //     return res.json({
  //       error: true,
  //       message: error1,
  //     });
  //   }

  //   db.query(sqlUpdate, params, (error, result) => {
  //     if (error) {
  //       return res.json({
  //         error: true,
  //         message: error,
  //       });
  //     } else {
  //       if (result.affectedRows !== 0) {
  //         if (req.file || image == null) {
  //           if (result1[0].image !== null && result1[0].image !== "") {
  //             removeFile(result1[0].image);
  //           }
  //         }
  //         return res.json({
  //           message:
  //             result.affectedRows !== 0
  //               ? "Employee updated successfully!"
  //               : "Employee not found!",
  //           data: result,
  //           is_remove_file: is_remove_file,
  //         });
  //       } else {
  //         return res.json({
  //           message: "Employee not found!",
  //           data: result,
  //         });
  //       }
  //     }
  //   });
  // });
};

// Update image
const updateImg = async (req, res) => {
  const { id } = req.body;

  var filename = null;
  if (req.file) {
    filename = req.file.filename;
  }

  var sqlUpdateImage = "UPDATE employee SET profile = ? WHERE id = ?"; // Adjust WHERE clause based on your schema
  const data = await db.query(sqlUpdateImage, [filename, id]); // Assuming req.userId contains the user ID

  res.json({
    message: "Image update successful!",
  });
};

// insert
const createEmployee = async (req, res) => {
  const {
    role_id,
    firstname,
    lastname,
    gender,
    dob,
    email,
    tel,
    password,
    address,
    salary,
  } = req.body;
  var filename = null;
  if (req.file) {
    filename = req.file.filename;
  }

  try {
    // Check if email is already in use
    const existingEmployee = await db.query(
      "SELECT * FROM employee WHERE email = ?",
      [email]
    );
    const existingTel = await db.query("SELECT * FROM employee WHERE tel = ?", [
      tel,
    ]);
    if (existingEmployee.length > 0) {
      // If email is already in use, return an error message
      return res.status(400).json({
        message: "Duplicate email. Please try another email.",
      });
    }
    if (existingTel.length > 0) {
      return res.status(400).json({
        message: "Duplicate Telphone. Please try another telephone.",
      });
    }

    //hash password
    const bcryptPassword = await bcrypt.hashSync(password, 10);
    const sqlInsertEmployee = await db.query(
      "INSERT INTO employee ( role_id, firstname, lastname, gender, dob, email, tel, password, address, salary, image) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        role_id,
        firstname,
        lastname,
        gender,
        dob,
        email,
        tel,
        bcryptPassword,
        address,
        salary,
        filename,
      ]
    );

    res.json({
      message: sqlInsertEmployee.affectedRows
        ? "Employee created successfully"
        : "Something wrong!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const remove = (req, res) => {
  const { id, image } = req.body;
  var sql = "DELETE FROM employee WHERE id = ?";
  var param = [id];
  db.query(sql, param, (error, rows) => {
    if (!error) {
      if (rows.affectedRows != 0) {
        removeFile(image);
      }
      res.json({
        message:
          rows.affectedRows != 0
            ? "Employee removed successfully!"
            : "Employee not found!",
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
  update,
  updatePassword,
  updateImg,
  createEmployee,
  remove,
  login,
};
