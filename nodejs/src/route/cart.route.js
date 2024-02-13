const controller = require("../controller/cart.controller");
// const { upload } = require("../util/helper");
const { userGuard } = require("../controller/auth.controller");
const cart = (app) => {
  // app.get("/api/cart",userGuard(),controller.getCartByCutomer)
  // app.post("/api/cart",userGuard(),controller.addCart)
  // app.delete("/api/cart",userGuard(),controller.removeCart)
  // app.put("/api/cart",userGuard(),controller.updateCart)

  app.get("/api/cart", controller.getCartByCutomer);
  app.post("/api/cart", controller.addCart);
  app.delete("/api/cart", controller.removeCart);
  app.put("/api/cart", controller.updateCart);
};
module.exports = cart;
