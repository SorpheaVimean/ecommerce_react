// http
const express = require("express");
const cors = require("cors");

// extend from express
const app = express();

// need to allow cors origins
app.use(cors({ origin: "*" }));

// req.body ( get params json body)
app.use(express.json());

// only import
const product = require("./src/route/product.route");
const customer = require("./src/route/customer.route");
const employee = require("./src/route/employee.route");

// call route
product(app);
customer(app);
employee(app);

// defind port to server
const port = 8081;
app.listen(port, () => {
  console.log("http:localhost:" + port);
});