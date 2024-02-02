const controller = require("../controller/employee.controller");
const { upload } = require("../util/helper");
const { userGuard } = require("../controller/auth.controller");
const employee = (app) => {
  app.get("/api/employee", userGuard(), controller.getAll);
  app.put(
    "/api/employee",
    upload.single("img_employee"),
    userGuard("employee.Update"),
    controller.update
  );
  app.post("/api/employee/setPassword", userGuard(), controller.updatePassword);
  app.post("/api/employee/login", controller.login);
  app.post(
    "/api/employee/updateImg",
    upload.single("img_update"),
    userGuard("employee.Update"),
    controller.updateImg
  );

  app.post(
    "/api/employee",
    upload.single("img_employee"),
    userGuard("employee.Create"),
    controller.createEmployee
  );
  // app.put("/api/customer", controller.login);
  app.delete(
    "/api/employee/",
    userGuard("employee.Delete"),
    controller.remove
  );
};
module.exports = employee;
