const controller = require("../controller/brand.controller");
const { userGuard } = require("../controller/auth.controller");
const brand = (app) => {
  app.get("/api/brand", controller.getAll);
  app.post("/api/brand", controller.create);
  app.put("/api/brand", controller.update);
  app.delete("/api/brand", controller.remove);
};
module.exports = brand;
