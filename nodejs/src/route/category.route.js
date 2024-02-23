const controller = require("../controller/category.controller");
const { userGuard } = require("../controller/auth.controller");
const category = (app) => {
  app.get("/api/category", controller.getAll);
  app.post("/api/category",userGuard("category.Create"), controller.create);
  app.put("/api/category",userGuard("category.Update"), controller.update);
  app.delete("/api/category",userGuard("category.Delete"), controller.remove);
};
module.exports = category;
