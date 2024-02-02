const controller = require("../controller/product.controller");
const { upload } = require("../util/helper");
const { userGuard } = require("../controller/auth.controller");

const product = (app) => {
  app.get("/api/product", userGuard(), controller.getAll);
  app.get("/api/product/latest", userGuard(), controller.getLatest);
  // app.get("/api/product", controller.getAllProductsAndImages);
  app.get("/api/product/:id", userGuard(), controller.getOne);
  app.post(
    "/api/product",
    upload.array("image_product", 5),
    userGuard("product.Create"),
    controller.create
  );
  app.put(
    "/api/product",
    upload.array("update_product", 5),
    userGuard("product.Update"),
    controller.update
  );
  app.delete(
    "/api/product/:id",
    userGuard("product.Delete"),
    controller.remove
  );
};
module.exports = product;
