const controller = require("../controller/wishlist.controller");
const wishlist = (app) => {
  app.get("/api/wishlist", controller.getAll);
  app.get("/api/wishlist/:customer_id", controller.getCartByCutomer);
  app.post("/api/wishlist", controller.create);
  app.delete("/api/wishlist", controller.remove);
};
module.exports = wishlist;
