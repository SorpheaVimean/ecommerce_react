const controller = require("../controller/brand.controller");
const { userGuard } = require("../controller/auth.controller");
const brand = (app) => {
  app.get("/api/brand",userGuard("brand.Read"), controller.getAll);
  app.post("/api/brand",userGuard("brand.Create"), controller.create);
  app.put("/api/brand",userGuard("brand.Update"), controller.update);
  app.delete("/api/brand",userGuard("brand.Delete"), controller.remove);
};
module.exports = brand;
