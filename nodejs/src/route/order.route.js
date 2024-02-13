const controller = require("../controller/order.controller");
const { userGuard } = require("../controller/auth.controller");
const order = (app) => {
  app.get("/api/order", controller.getAll);
  app.get("/api/order/:id", controller.getOne);
  app.post("/api/order", controller.create);
  app.put("/api/order", controller.update);
  app.delete("/api/order", controller.remove);
};
module.exports = order;
