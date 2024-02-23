const controller = require("../controller/rolePermission.controller");
const { userGuard } = require("../controller/auth.controller");
const rolePermission = (app) => {
  app.get("/api/rolePermission",userGuard("role_permission.Read"), controller.getAll);
  app.post("/api/rolePermission",userGuard("role_permission.Create"), controller.create);
  app.put("/api/rolePermission",userGuard("role_permission.Update"), controller.update);
  app.delete("/api/rolePermission",userGuard("role_permission.Delete"), controller.remove);
};
module.exports = rolePermission;
