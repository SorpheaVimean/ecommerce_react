const controller = require("../controller/rolePermission.controller");
const { userGuard } = require("../controller/auth.controller");
const rolePermission = (app) => {
  app.get("/api/rolePermission", controller.getAll);
  app.post("/api/rolePermission", controller.create);
  app.put("/api/rolePermission", controller.update);
  app.delete("/api/rolePermission", controller.remove);
};
module.exports = rolePermission;
