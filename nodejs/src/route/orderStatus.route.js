const controller = require("../controller/orderStatus.controller");
const { userGuard } = require("../controller/auth.controller");
const orderStatus = (app) => {
  app.get("/api/orderStatus",userGuard("orderstatus.Read"), controller.getAll);
  app.post("/api/orderStatus",userGuard("orderstatus.Create"), controller.create);
  app.put("/api/orderStatus",userGuard("orderstatus.Update"), controller.update);
  app.delete("/api/orderStatus",userGuard("orderstatus.Delete"), controller.remove);
};
module.exports = orderStatus;
