const multer = require("multer");
const fs = require("fs");

const Config = {
  image_path: "C:/wamp/www/img_node/ecommerce/",
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, Config.image_path);
    },
    filename: function (req, file, callback) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      callback(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
});

const removeFile = (filename) => {
  var filePath = Config.image_path + filename;
  try {
    return fs.unlinkSync(filePath);
  } catch (err) {
    return false;
  }
};

TOKEN_KEY = "LKJIJOPIEWRJ@#IU)(@U#)*@)#*$)LKJDSFSL:KJ12309802934908"
REFRESH_KEY = "342080!@DCFS23;ksdfkq23po9[f323@$@#$@#$@$#@#$@#$sjdflajlkjsaf"

const isEmptyOrNull = (value) => {
  if(value == "" || value == null || value == "null" || value == undefined ){
      return true
  }
  return false
}

// // https://stackoverflow.com/questions/5366849/convert-1-to-0001-in-javascript
// const invoiceNumber = (number) => {
//     var str = "" + (number+1);
//     var pad = "0000"
//     var invoice = pad.substring(0, pad.length - str.length) + str;
//     return "INV"+invoice; // INV0001, INV0002, INV19999
// }

// const productBarcode = (number) => {
//     var str = "" + (number+1);
//     var pad = "P0000"
//     var barcode = pad.substring(0, pad.length - str.length) + str;
//     return barcode;
// }

module.exports = {
  upload,
  removeFile,
  TOKEN_KEY,
  REFRESH_KEY,
  isEmptyOrNull,
  // invoiceNumber,
  // productBarcode
};
