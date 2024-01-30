const controller = require("../controller/customer.controller");
const { upload } = require("../util/helper");

const category = (app) => {
  app.get("/api/customer", controller.getAll);
  app.put("/api/customer",upload.single("update_pic"), controller.update);
  app.post("/api/customer/setPassword", controller.updatePassword);
  app.post("/api/customer/login", controller.login);
  app.post(
    "/api/customer/updateImg",
    upload.single("img_update"),
    controller.updateImg
  );

  app.post(
    "/api/customer",
    upload.single("img_customer"),
    controller.createCustomer
  );
  // app.put("/api/customer", controller.login);
  app.delete("/api/customer/:id", controller.remove);
};
module.exports = category;
