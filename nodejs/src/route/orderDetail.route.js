const controller = require("../controller/orderDetail.controller");
const { userGuard } = require("../controller/auth.controller");
const orderDetail = (app) => {
  app.get("/api/orderDetail", controller.getAll);
  app.get("/api/orderDetail/:order_id", controller.getOrderByCustomer);
  app.post("/api/orderDetail", controller.create);
  app.put("/api/orderDetail", controller.update);
  app.delete("/api/orderDetail", controller.remove);
};
module.exports = orderDetail;
