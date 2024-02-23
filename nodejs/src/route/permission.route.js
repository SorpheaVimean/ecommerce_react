const controller = require("../controller/permission.controller");
const { userGuard } = require("../controller/auth.controller");
const permission = (app) => {
  app.get("/api/permission",userGuard("permission.Read"), controller.getAll);
  app.post("/api/permission",userGuard("permission.Create"), controller.create);
  app.put("/api/permission",userGuard("permission.Update"), controller.update);
  app.delete("/api/permission",userGuard("permission.Delete"), controller.remove);
};
module.exports = permission;
