const controller = require("../controller/permission.controller");
const { userGuard } = require("../controller/auth.controller");
const permission = (app) => {
  app.get("/api/permission", controller.getAll);
  app.post("/api/permission", controller.create);
  app.put("/api/permission", controller.update);
  app.delete("/api/permission", controller.remove);
};
module.exports = permission;
