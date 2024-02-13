const controller = require("../controller/category.controller");
const { userGuard } = require("../controller/auth.controller");
const category = (app) => {
  app.get("/api/category", controller.getAll);
  app.post("/api/category", controller.create);
  app.put("/api/category", controller.update);
  app.delete("/api/category", controller.remove);
};
module.exports = category;
