const controller = require("../controller/order.controller");
const { userGuard } = require("../controller/auth.controller");
const order = (app) => {
  app.get("/api/order", controller.getAll);
  // app.get("/api/order/:id", controller.getOne);
  app.get("/api/order/:customer_id", controller.getOderByCustomer);
  app.post("/api/order", controller.create);
  app.put("/api/order",userGuard("order.Update"), controller.update);
  app.delete("/api/order",userGuard("order.Delete"), controller.remove);
};
module.exports = order;
