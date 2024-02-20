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
const customerAddress = require("./src/route/customerAddress.route");
const employee = require("./src/route/employee.route");
const brand = require("./src/route/brand.route");
const cart = require("./src/route/cart.route");
const category = require("./src/route/category.route");
const order = require("./src/route/order.route");
const orderDetail = require("./src/route/orderDetail.route");
const orderStatus = require("./src/route/orderStatus.route");
const payment = require("./src/route/payment.route");
const permission = require("./src/route/permission.route");
const role = require("./src/route/role.route");
const rolePermission = require("./src/route/rolePermission.route");
const wishlist = require("./src/route/wishlist.route");

// call route
product(app);
customer(app);
customerAddress(app);
employee(app);
brand(app);
cart(app);
category(app);
order(app);
orderDetail(app);
orderStatus(app);
payment(app);
permission(app);
role(app);
rolePermission(app);
wishlist(app);

// defind port to server
const port = 8081;
app.listen(port, () => {
  console.log("http:localhost:" + port);
});
