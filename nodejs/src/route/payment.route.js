const controller = require("../controller/payment.controller");
const { userGuard } = require("../controller/auth.controller");
const { upload } = require("../util/helper");
const payment = (app) => {
  app.get("/api/payment", controller.getAll);
  app.post("/api/payment", upload.single("image_payment"), controller.create);
  app.put("/api/payment", upload.single("image_payment"), controller.update);
  app.delete("/api/payment", controller.remove);
};
module.exports = payment;
