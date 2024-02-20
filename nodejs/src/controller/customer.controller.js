const db = require("../util/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  TOKEN_KEY,
  REFRESH_KEY,
  removeFile,
  isEmptyOrNull,
} = require("../util/helper");
const { getPermissionUser } = require("./auth.controller");
//getAll
// const getAll = async (req, res) => {
//   try {
//     const sql = `
//      SELECT * FROM customer
//     `;

//     const result = await db.query(sql);

//     // Assuming the result is an array of rows from the database
//     res.json(result);
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
// const getParam = (value) => {
//   if (value == "" || value == "null" || value == "undefined") {
//     return null;
//   }
//   return value;
// };
const getAll = async (req, res) => {
  try {
    const { page, txtSearch,} = req.query;

    var param = []; 
    var limitItem = 7;
    var offset = (page - 1) * limitItem;
    if (isNaN(offset)) {
      offset = 0; // Set a default value of 0 if the offset is not a valid number
    }
    var select = "SELECT c.*, r.name as role_name ";
    var join =
      " FROM customer c " + " INNER JOIN role r ON (c.role_id = r.id) ";
      var where = "  ";

      if (!isEmptyOrNull(txtSearch)) {
        where += " AND (c.id = ? OR c.firstname LIKE ? OR c.lastname LIKE ?) "; // Parentheses added for OR conditions
        param.push(txtSearch);
         param.push(txtSearch); 
        param.push("%" + txtSearch + "%");
        param.push("%" + txtSearch + "%");
      }
      
      // if (!isEmptyOrNull(customerStatus)) {
      //   where += " AND c.is_active = ? "; 
      //   param.push(customerStatus);
      // }
      
    var order = " ORDER BY c.id DESC ";
    var limit = " LIMIT " + limitItem + " OFFSET " + offset + "";

    var sql = select + join + where + order + limit;
    const list = await db.query(sql, param);

    var selectTotal = " SELECT COUNT(c.id) as total";
    var sqlTotal = selectTotal + join + where;
    const totalRecord = await db.query(sqlTotal, param);


    res.json({
      list: list,
      totalRecord: totalRecord, // Access the total count from the first row
      bodyData: req.body,
      queryData: req.query,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
};
// update password
const updatePassword = async (req, res) => {
  const { id, email, oldPassword, newPassword, confirmPassword } = req.body;

  // Validate request parameters
  const message = {};
  if (!id) message.id = "ID is required";
  if (!email) message.email = "Email is required";
  if (!oldPassword) message.oldPassword = "Old password is required";
  if (!newPassword) message.newPassword = "New password is required";
  if (newPassword !== confirmPassword) {
    message.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(message).length > 0) {
    return res.status(400).json({ message });
  }

     // Check if user exists
     const user = await isUserExist(email);
     if (!user) {
       return res.status(404).json({ message: "User does not exist" });
     }
 
     // Verify old password
     const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
     if (!isPasswordValid) {
       return res.status(400).json({ message: "Incorrect old password" });
     }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password in the database
  try {
    const sqlUpdate = "UPDATE customer SET password = ? WHERE id = ? AND email = ?";
    await db.query(sqlUpdate, [hashedPassword, id, email]);
    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// checke if user have or not
const isUserExist = async (email) => {
  const user = await db.query("SELECT * FROM customer WHERE email = ?", [
    email,
  ]);
  if (user) {
    return user[0];
  } else {
    return null;
  }
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const message = {};

//   if (!email) message.email = "Please enter a valid email";
//   if (!password) message.password = "Please enter a valid password";

//   if (Object.keys(message).length > 0) {
//     return res.status(400).json({ message });
//   }

//   const user = await isUserExist(email);
//   if (!user || !(await bcrypt.compareSync(password, user.password))) {
//     return res.status(400).json({ message: "User or password are incorrect!" });
//   }

//   delete user.password;

//   const obj = {
//     user,
//     permission: [],
//     token: "", // generate token JWT
//   };

//   const access_token = jwt.sign({ data: obj }, TOKEN_KEY);
//   const refresh_token = jwt.sign({ data: obj }, REFRESH_KEY);

//   res.json({
//     message: "Login success!",
//     ...obj,
//     access_token,
//     refresh_token,
//   });
// };
const login = async (req, res) => {
  try{
  const { email, password } = req.body;
  const message = {};

  if (!email) message.email = "Please enter a valid email";
  if (!password) message.password = "Please enter a valid password";

  if (Object.keys(message).length > 0) {
    return res.status(400).json({ message });
  }

  const user = await isUserExist(email);
  if (!user || !(await bcrypt.compareSync(password, user.password))) {
    return res.status(400).json({ message: "User or password are incorrect!" });
  }

  const permission = await getPermissionUser(user.id);
  delete user.password;

  const obj = {
    user,
    permission,
    // token: "", // generate token JWT
  };

  const access_token = jwt.sign({ data: obj }, TOKEN_KEY);
  const refresh_token = jwt.sign({ data: obj }, REFRESH_KEY);

  res.json({
    isSuccess: user ? true : false,
    // user: user,
    message: "Login success!",
    ...obj,
    access_token,
    refresh_token,
  });
} catch (error) {
  res.status(500).json({
    message: error.message,
  });
}
};
// upate customer
const update = async (req, res) => {
  try {
  const { id, firstname, lastname, gender, dob, email, tel, address, is_active, image } = req.body;
  var filename = null;
  if (req.file) {
    filename = req.file.filename;
  } else {
    filename = image;
  }
  var slqUpdate = `
  UPDATE customer 
  SET  firstname = ?, lastname = ?, gender = ?, dob = ?, email = ?, tel = ?, address = ?, is_active = ?, image = ? WHERE id = ? 
  `;
  const params = [firstname, lastname, gender, dob, email, tel, address, is_active, filename, id];
  const data = await db.query(slqUpdate, params);
    if (data) {
      res.json({
        message:  "Customer updated successfully!",
        data: data,
      });
    } 
  
} catch (error) {
  res.status(500).send({ message: error.message });
}
};


// insert
const createCustomer = async (req, res) => {
  const {
    firstname,
    lastname,
    gender,
    dob,
    email,
    tel,
    address,
    password,
    is_active,
  } = req.body;
  var filename = null;
  if (req.file) {
    filename = req.file.filename;
  }

  try {
    // Check if email is already in use
    const existingEmployee = await db.query(
      "SELECT * FROM customer WHERE email = ?",
      [email]
    );
    const existingTel = await db.query("SELECT * FROM customer WHERE tel = ?", [
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
    const sqlInsertCustomer = await db.query(
      "INSERT INTO customer (  firstname, lastname, gender, dob, email, tel, address, password, is_active, image) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        firstname,
        lastname,
        gender,
        dob,
        email,
        tel,
        address,
        bcryptPassword,
        is_active,
        filename,
      ]
    );
    res.json({
      message: "Customer Created successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// const remove = async (req, res) => {
//   try {
//     const { id } = req.params;
//     var sqlDelete = "DELETE FROM customer WHERE id = ?";
//     var param = [id];
//     const data = await db.query(sqlDelete, param);
//     res.json({
//       message: data.affectedRows != 0 ? "Remove sucess!" : "Not found!",
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
const remove = (req, res) => {
  const { id, image } = req.body;
  var sql = "DELETE FROM customer WHERE id = ?";
  var param = [id];
  db.query(sql, param, (error, rows) => {
    if (!error) {
      if (rows.affectedRows != 0) {
        removeFile(image);
      }
      res.json({
        message:
          rows.affectedRows != 0
            ? "custoomer removed successfully!"
            : "customer not found!",
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
  createCustomer,
  remove,
  login,
};
