const controller = require("../controller/payment.controller");
const { userGuard } = require("../controller/auth.controller");
const { upload } = require("../util/helper");
const payment = (app) => {
  app.get("/api/payment",userGuard("payment_method.Read"), controller.getAll);
  app.post("/api/payment", upload.single("image_payment"),userGuard("payment_method.Create"), controller.create);
  app.put("/api/payment", upload.single("image_payment"),userGuard("payment_method.Update"), controller.update);
  app.delete("/api/payment",userGuard("payment_method.Delete"), controller.remove);
};
module.exports = payment;
