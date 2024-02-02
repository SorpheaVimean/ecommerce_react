const db = require("../util/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_KEY, REFRESH_KEY, removeFile } = require("../util/helper");
const { getPermissionUser } = require("./auth.controller");
//getAll
const getAll = async (req, res) => {
  try {
    const sqlEmployee = await db.query("SELECT * FROM employee");
    const sqlRole = await db.query("SELECT * FROM role");
    const total = await db.query("SELECT COUNT(id) AS total FROM employee");
    if (sqlEmployee && sqlRole && total) {
      res.json({
        total: total,
        list: sqlEmployee,
        role: sqlRole,
      });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// update password
const updatePassword = async (req, res) => {
  const { id, email, oldPassword, newPassword, confirmPassword } = req.body;

  // Validate request parameters
  const errors = {};
  if (!id) errors.id = "ID is required";
  if (!email) errors.email = "Email is required";
  if (!oldPassword) errors.oldPassword = "Old password is required";
  if (!newPassword) errors.newPassword = "New password is required";
  if (newPassword !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // Check if user exists
  const user = await isUserExist(email);
  if (!user || user.id !== id) {
    return res.status(404).json({ message: "User does not exist" });
  }

  // Verify old password
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid old password" });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password in the database
  try {
    const sqlUpdate = "UPDATE employee SET password = ? WHERE id = ?";
    await db.query(sqlUpdate, [hashedPassword, id]);
    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
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
    is_remove_file,
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

  // Correct the SQL syntax
  db.query("SELECT * FROM employee WHERE id = ?", [id], (error1, result1) => {
    if (error1) {
      return res.json({
        error: true,
        message: error1,
      });
    }

    db.query(sqlUpdate, params, (error, result) => {
      if (error) {
        return res.json({
          error: true,
          message: error,
        });
      }

      if (result.affectedRows !== 0) {
        if (req.file || image == null) {
          if (result1[0].image !== null && result1[0].image !== "") {
            removeFile(result1[0].image);
          }
        }
        return res.json({
          message: result.affectedRows !== 0 ? "Update success!" : "Employee not found!",
          data: result,
          is_remove_file: is_remove_file,
        });
      } else {
        return res.json({
          message: "Employee not found!",
          data: result,
        });
      }
    });
  });
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
    if (existingEmployee.length > 0) {
      // If email is already in use, return an error message
      return res.status(400).json({
        message: "Duplicate email. Please try another email.",
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
      message: "Insert employee successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// const remove = async (req, res) => {
//   try {
//     const { id, image } = req.body;
//     var sqlDelete = "DELETE FROM employee WHERE id = ?";
//     var param = [id];
//     const results = await db.query(sqlDelete, param);
//     if (results.affectedRows !== 0) {
//       removeFile(image);
//     }
//     res.json({
//       message:
//         results.affectedRows != 0 ? "Remove sucess!" : "Employee not found!",
//       data: results,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };

const remove = (req,res) => {
  const { id,image } = req.body;
  var sql = "DELETE FROM employee WHERE id = ?";
  var param = [id];
  db.query(sql,param,(error,rows)=>{
      if(!error){
          if(rows.affectedRows != 0){
              removeFile(image)
          }
          res.json({
              message:rows.affectedRows != 0 ? "Remove success!" : "Employee not found!",
              data:rows
          })
      }else{
          res.json({
              error:true,
              message:error
          })
      }
  })
}

module.exports = {
  getAll,
  update,
  updatePassword,
  updateImg,
  createEmployee,
  remove,
  login,
};
