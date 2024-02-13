const controller = require("../controller/orderStatus.controller");
const { userGuard } = require("../controller/auth.controller");
const orderStatus = (app) => {
  app.get("/api/orderStatus", controller.getAll);
  app.post("/api/orderStatus", controller.create);
  app.put("/api/orderStatus", controller.update);
  app.delete("/api/orderStatus", controller.remove);
};
module.exports = orderStatus;
