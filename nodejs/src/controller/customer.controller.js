const db = require("../util/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../util/helper");
const { getPermissionUser } = require("./auth.controller");
//getAll
const getAll = async (req, res) => {
  try {
    const sql = `
     SELECT * FROM customer
    `;

    const result = await db.query(sql);

    // Assuming the result is an array of rows from the database
    res.json(result);
  } catch (error) {
    res.status(500).send({
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
    const sqlUpdate = "UPDATE customer SET password = ? WHERE id = ?";
    await db.query(sqlUpdate, [hashedPassword, id]);
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

 
  delete user.password;

  const obj = {
    user,
    permission:[],
    token: "", // generate token JWT
  };

  const access_token = jwt.sign({ data: obj }, TOKEN_KEY);
  const refresh_token = jwt.sign({ data: obj }, REFRESH_KEY);

  res.json({
    message: "Login success!",
    ...obj,
    access_token,
    refresh_token,
  });
};

// upate customer
const update = async (req, res) => {
  const { id, firstName, lastName, gender, dob, email, tel } = req.body;
  var filename = null;
  if (req.file) {
    filename = req.file.filename;
  }
  var slqUpdate = `
  UPDATE customer 
  SET  firstName = ?, lastName = ?, gender = ?, dob = ?, email = ?, tel = ?, profile = ? WHERE id = ? 
  `;
  const params = [firstName, lastName, gender, dob, email, tel, filename, id];
  const data = await db.query(slqUpdate, params, (err, result) => {
    if (!err) {
      res.json({
        message: result.affectedRows
          ? "Update successfully!"
          : "Data not in system!",
        data: result,
      });
    } else {
      res.json({
        error: true,
        message: err,
      });
    }
  });
};
// Update image
const updateImg = async (req, res) => {
  const { id } = req.body;

  var filename = null;
  if (req.file) {
    filename = req.file.filename;
  }

  var sqlUpdateImage = "UPDATE customer SET profile = ? WHERE id = ?"; // Adjust WHERE clause based on your schema
  const data = await db.query(sqlUpdateImage, [filename, id]); // Assuming req.userId contains the user ID

  res.json({
    message: "Image update successful!",
  });
};

// insert
const createCustomer = async (req, res) => {
  const {  firstName, lastName, gender, dob, email, tel, password } =
    req.body;
  var filename = null;
  if (req.file) {
    filename = req.file.filename;
  }

  try {
    // Check if email is already in use
    const existingCustomer = await db.query(
      "SELECT * FROM customer WHERE email = ?",
      [email]
    );

    if (existingCustomer.length > 0) {
      // If email is already in use, return an error message
      return res.status(400).json({
        message: "Duplicate email. Please try another email.",
      });
    }

    //hash password
    const bcryptPassword = await bcrypt.hashSync(password, 10);
    const sqlInsertCustomer = await db.query(
      "INSERT INTO customer ( firstName, lastName, gender, dob, email, tel, password, profile) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)",
      [
       
        firstName,
        lastName,
        gender,
        dob,
        email,
        tel,
        bcryptPassword,
        filename,
      ]
    );
    res.json({
      message: "Insert customer successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    var sqlDelete = "DELETE FROM customer WHERE id = ?";
    var param = [id];
    const data = await db.query(sqlDelete, param);
    res.json({
      message: data.affectedRows != 0 ? "Remove sucess!" : "Not found!",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
module.exports = {
  getAll,
  update,
  updatePassword,
  updateImg,
  createCustomer,
  remove,
  login,
};
