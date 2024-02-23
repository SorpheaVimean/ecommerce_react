const controller = require("../controller/role.controller");
const { userGuard } = require("../controller/auth.controller");
const role = (app) => {
  app.get("/api/role",userGuard("role.Read"), controller.getAll);
  app.post("/api/role",userGuard("role.Create"), controller.create);
  app.put("/api/role",userGuard("role.Update"), controller.update);
  app.delete("/api/role",userGuard("role.Delete"), controller.remove);
};
module.exports = role;
