const { userGuard } = require("../controller/auth.controller");
const controller = require("../controller/customer.controller");
const { upload } = require("../util/helper");

const customer = (app) => {
  app.get("/api/customer", userGuard(), controller.getAll);
  app.put("/api/customer", upload.single("update_pic"), userGuard(), controller.update);
  app.post("/api/customer/setPassword", userGuard(), controller.updatePassword);
  app.post("/api/customer/login", controller.login);
  app.post(
    "/api/customer/updateImg",
    upload.single("img_update"), userGuard(),
    controller.updateImg
  );

  app.post(
    "/api/customer",
    upload.single("img_customer"), userGuard(),
    controller.createCustomer
  );
  // app.put("/api/customer", controller.login);
  app.delete("/api/customer/:id", userGuard(), controller.remove);
};
module.exports = customer;
