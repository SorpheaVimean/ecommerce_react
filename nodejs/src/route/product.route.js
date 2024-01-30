const controller = require("../controller/product.controller");
const { upload } = require("../util/helper");

const product = (app) => {
  app.get("/api/product", controller.getAll);
  app.get("/api/product/latest", controller.getLatest);
  // app.get("/api/product", controller.getAllProductsAndImages);
  app.get("/api/product/:id", controller.getOne);
  app.post("/api/product", upload.array("image_product", 5), controller.create);
  app.put("/api/product", upload.array("update_product", 5), controller.update);
  app.delete("/api/product/:id", controller.remove);
};
module.exports = product;
