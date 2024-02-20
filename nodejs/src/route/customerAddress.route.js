const controller = require("../controller/customerAddress.controller");
const { userGuard } = require("../controller/auth.controller");
const CustomerAddress = (app) => {
  app.get("/api/CustomerAddress", controller.getAll);
  app.post("/api/CustomerAddress", controller.create);
  app.put("/api/CustomerAddress", controller.update);
  app.delete("/api/CustomerAddress", controller.remove);
};
module.exports = CustomerAddress;
