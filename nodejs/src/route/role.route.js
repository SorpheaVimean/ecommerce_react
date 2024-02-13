const controller = require("../controller/role.controller");
const { userGuard } = require("../controller/auth.controller");
const role = (app) => {
  app.get("/api/role", controller.getAll);
  app.post("/api/role", controller.create);
  app.put("/api/role", controller.update);
  app.delete("/api/role", controller.remove);
};
module.exports = role;
