const controller = require("../controller/wishlist.controller");
const { userGuard } = require("../controller/auth.controller");
const wishlist = (app) => {
  app.get("/api/wishlist", controller.getAll);
  app.post("/api/wishlist", controller.create);
  app.delete("/api/wishlist", controller.remove);
};
module.exports = wishlist;
