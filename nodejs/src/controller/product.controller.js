const db = require("../util/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  TOKEN_KEY,
  REFRESH_KEY,
  removeFile,
  isEmptyOrNull,
  getParam,
} = require("../util/helper");
const { getPermissionUser } = require("./auth.controller");

// get all products

const getAll = async (req, res) => {
  try {
    const { page, txtSearch, categoryId, productStatus } = req.query;

    var param = [getParam(categoryId)];
    var limitItem = 2;
    var offset = (page - 1) * limitItem;
    if (isNaN(offset)) {
      offset = 0;
    }
    var select = "SELECT p.*, c.name as category_name ";
    var join =
      " FROM product p " + " INNER JOIN category c ON (p.category_id = c.id) ";
    var where = " WHERE p.category_id = IFNULL(?,p.category_id) ";

    if (!isEmptyOrNull(txtSearch)) {
      where += " AND p.id = ? OR p.name LIKE ? "; //"' + txtSearch + '"
      param.push(txtSearch);
      param.push("%" + txtSearch + "%");
    }
    if (!isEmptyOrNull(productStatus)) {
      where += " AND p.status = ?"; ///productStatus
      param.push(productStatus);
    }
    var order = " ORDER BY p.id DESC ";
    var limit = " LIMIT " + limitItem + " OFFSET " + offset + "";

    var sql = select + join + where + order + limit;
    const list = await db.query(sql, param);

    var selectTotal =
      " SELECT COUNT(p.id) as total, SUM(quantity) as totalQty ";
    var sqlTotal = selectTotal + join + where;
    const totalRecord = await db.query(sqlTotal, param);
    var sqlCategory = "SELECT * FROM category";
    const category = await db.query(sqlCategory);
    const pStock = await db.query(
      "SELECT SUM(quantity) as quantity FROM product"
    );

    res.json({
      list: list,
      totalRecord: totalRecord,
      list_category: category,
      pStock: pStock,
      bodyData: req.body,
      queryData: req.query,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal Error!",
      error: e,
    });
  }
};
const getProductById = async (req, res) => {
  const { id } = req.params;
  const productQuery = `
    SELECT p.*, c.name AS CName
    FROM product p
    INNER JOIN category c ON p.category_id = c.id
    WHERE p.id = ?
  `;

  try {
    const [product] = await db.query(productQuery, [id]);
    if (product) {
      res.json({ list: [product] });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const getAll = async (req, res) => {
//   const pageSize = 3;
//   try {
//     var {
//       txtSearch,
//       page, // from client 1,2,3
//     } = req.query;
//     var offset = (page - 1) * pageSize; // find offet
//     // page = 1 => offset = 0
//     // page = 2 => offset = 2
//     // page = 3=> offset = 4
//     var param = [];
//     var sqlSelect = "SELECT * FROM product";
//     var sqlWhere = "";
//     if (txtSearch != null && txtSearch != "") {
//       sqlWhere = " WHERE name LIKE ?";
//       param.push("%" + txtSearch + "%");
//     }
//     var limit = " LIMIT " + pageSize + " OFFSET " + offset; //2
//     var orderBy = " ORDER BY Id DESC";
//     var sql = sqlSelect + sqlWhere + orderBy + limit;
//     const list = await db.query(sql, param);
//     var total = 0;
//     if (page == 1) {
//       var sqlCount = "SELECT COUNT (id) as Total FROM product";
//       sql = sqlCount + sqlWhere;
//       var total = await db.query(sql, param);
//     }
//     res.json({
//       list: list,
//       total: total,
//     });
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };
// const getAll = async (req, res) => {
//   const pageSize = 3;
//   try {
//     var {
//       txtSearch,
//       page, // from client 1,2,3
//     } = req.query;
//     var offset = (page - 1) * pageSize; // find offet
//     // page = 1 => offset = 0
//     // page = 2 => offset = 2
//     // page = 3=> offset = 4
//     var param = [];
//     var sqlSelect = "SELECT * FROM product";
//     var sqlWhere = "";
//     if (txtSearch != null && txtSearch != "") {
//       sqlWhere = " WHERE name LIKE ?";
//       param.push("%" + txtSearch + "%");
//     }
//     var limit = " LIMIT " + pageSize + " OFFSET " + offset; //2
//     var orderBy = " ORDER BY Id DESC";
//     var sql = sqlSelect + sqlWhere + orderBy + limit;
//     const list = await db.query(sql, param);
//     var total = 0;
//     if (page == 1) {
//       var sqlCount = "SELECT COUNT (id) as Total FROM product";
//       sql = sqlCount + sqlWhere;
//       var totalResult = await db.query(sql, param);
//       total = totalResult[0].Total;
//     }
//     res.json({
//       list: list,
//       total: total,
//     });
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };

// get all
// const getAll = async (req, res) => {
//   const product = await db.query("SELECT * FROM product");
//   // const sqlCustomer = await db.query("SELECT * FROM customers");
//   res.json({
//     list: product,
//     // list: sqlCustomer,
//   });
// };
const getOne = async (req, res) => {
  const { id } = req.params;
  var sqlSelect = "SELECT * FROM product WHERE id = ?";
  var param = [id];
  const list = await db.query(sqlSelect, param);
  res.json({
    list: list,
  });
};

// get latest product
const getLatest = async (req, res) => {
  try {
    const sqllastest = `
      SELECT * FROM product ORDER BY id DESC LIMIT 8
    `;

    const result = await db.query(sqllastest);

    // Assuming the result is an array of rows from the database
    res.json(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  const { category_id, name, description, quantity, price, status } = req.body;
  const images = req.files.map((file) => file.filename); // Assuming that your form sends an array of files with the name 'images'

  // Insert the product into the product table
  const sqlInsert =
    "INSERT INTO product (category_id, name, description, price, quantity, image_1, image_2, image_3, image_4, image_5, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

  const params = [
    category_id,
    name,
    description,
    price,
    quantity,
    ...images.slice(0, 5), // Use the first 5 images; assuming you have a limit of 5 images
    ...Array(5 - images.length).fill(null), // Pad the array with null if fewer than 5 images
    status,
  ];

  try {
    const data = await db.query(sqlInsert, params);
    res.json({
      message: "Insert success!",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// const create = async (req, res) => {
//   try {
//     const { name, description, category_id, status, price } = req.body;

//     // Assuming that your form sends an array of files with the name 'images'
//     const images = req.files.map((file) => file.filename);

//     // Insert the product into the product table
//     const sqlInsertProduct =
//       "INSERT INTO product (category_id, name, description, price, status) VALUES (?,?,?,?,?)";

//     const productParams = [category_id, name, description, price, status];
//     // SELECT p.id, p.name, p.category_id, p.price, p.status, pi.image FROM product p JOIN product_image pi ON p.id=pi.product_id;
//     const productResult = await db.query(sqlInsertProduct, productParams);

//     // Insert the product images into the product_image table
//     const productId = productResult.insertId;
//     const imageInsertSql =
//       "INSERT INTO product_image (product_id, image) VALUES " +
//       images.map(() => "(?, ?)").join(", ");

//     const imageParams = images.flatMap((image) => [productId, image]);
//     const imageResult = await db.query(imageInsertSql, imageParams);

//     res.json({
//       message: "Insert success!",
//       product: productResult,
//       images: imageResult,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };

// const update = async (req, res) => {
//   const { Name, Description, Parent, Status, Id } = req.body;
//   var sqlUpdate =
//     "UPDATE category SET Name = ?, Description=?, Parent=?, Status=? WHERE Id = ?";
//   var param = [Name, Description, Parent, Status, Id];
//   const data = await db.query(sqlUpdate, param);
//   res.json({
//     message: "Update success!",
//     data: data,
//   });
// };
const update = async (req, res) => {
  const { id, category_id, name, description, quantity, price, status } =
    req.body;
  const images = req.files.map((file) => file.filename);
  // let images = [];

  // // / Check each image field individually
  // const imageFields = ['image_1', 'image_2', 'image_3', 'image_4', 'image_5'];
  // for (const field of imageFields) {
  //   if (req.files && req.files.length > 0 && req.files[0].fieldname === field) {
  //     // New image provided, add it to the images array
  //     images.push(req.files[0].filename);
  //   } else if (req.body[field]) {
  //     // Existing image URL provided, add it to the images array
  //     images.push(req.body[field]);
  //   } else {
  //     // No new image provided, retain the existing image URL (if available)
  //     images.push(null);
  //   }
  // }
  // Update the product in the product table
  const sqlUpdate =
    "UPDATE product SET category_id=?, name=?, description=?, price=?, quantity=?, image_1=?, image_2=?, image_3=?, image_4=?, image_5=?, status=? WHERE id=?";

  const params = [
    category_id,
    name,
    description,
    price,
    quantity,
    ...images.slice(0, 5),
    ...Array(5 - images.length).fill(null),
    status,
    id, // Add the id of the product to update
  ];

  try {
    const data = await db.query(sqlUpdate, params);
    res.json({
      message:
        data.affectedRows != 0
          ? "product removed successfully!"
          : "product not found!",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// const update = (req, res) => {
//   try {
//     const {
//       category_id,
//       name,
//       description,
//       quantity,
//       price,
//       status,
//       image_1, image_2, image_3, image_4, image_5,
//       is_remove_file,
//       id,
//     } = req.body;

//     db.query(
//       "SELECT * FROM product WHERE id = ?",
//       [id],
//       async (error1, row1) => {
//         if (!error1) {
//           // const images = req.files.map((file) => file.filename);
//           let images = [];
//           if (req.files) {
//             images = req.files.map((file) => file.filename);
//           }
//           if (image_1 || image_2 || image_3 || image_4 || image_5) {
//             images = [image_1, image_2, image_3, image_4, image_5];
//           }
//           const sql =
//             "UPDATE product SET category_id= ?, name= ?, description= ?, quantity= ?, price= ?, image_1= ?, image_2= ?, image_3= ?, image_4= ?, image_5= ?, status=? WHERE id= ?";
//           const param = [
//             category_id,
//             name,
//             description,
//             quantity,
//             price,
//             ...images,
//             status,
//             id,
//           ];
//           db.query(sql, param, async (error, rows) => {
//             if (!error) {
//               if (rows.affectedRows !== 0) {
//                 // Remove old images if requested
//                 if (is_remove_file) {
//                   const oldImages = [
//                     row1[0].image_1,
//                     row1[0].image_2,
//                     row1[0].image_3,
//                     row1[0].image_4,
//                     row1[0].image_5,
//                   ];
//                   for (let i = 0; i < oldImages.length; i++) {
//                     if (
//                       oldImages[i] !== null &&
//                       !images.includes(oldImages[i])
//                     ) {
//                       removeFile(oldImages[i]);
//                     }
//                   }
//                 }
//               }
//               res.json({
//                 message:
//                   rows.affectedRows !== 0
//                     ? "Update success!"
//                     : "Product not found!",
//                 data: rows,
//                 is_remove_file: is_remove_file,
//               });
//             } else {
//               res.json({
//                 error: true,
//                 message: error,
//               });
//             }
//           });
//         } else {
//           res.json({
//             error: true,
//             message: error1,
//           });
//         }
//       }
//     );
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };

// const update = (req, res) => {
//   try {
//     const {
//       category_id,
//       name,
//       description,
//       quantity,
//       price,
//       status,
//       is_remove_file,
//       id,
//     } = req.body;

//     db.query(
//       "SELECT * FROM product WHERE id = ?",
//       [id],
//       async (error1, row1) => {
//         if (!error1) {
//           const images = req.files.map((file) => file.filename);

//           const sql =
//             "UPDATE product SET category_id= ?, name= ?, description= ?, quantity= ?, price= ?, image_1= ?, image_2= ?, image_3= ?, image_4= ?, image_5= ?, status=? WHERE id= ?";

//           const param = [
//             category_id,
//             name,
//             description,
//             quantity,
//             price,
//             ...images,
//             status,
//             id,
//           ];

//           if (is_remove_file) {
//             const oldImages = [
//               row1[0].image_1,
//               row1[0].image_2,
//               row1[0].image_3,
//               row1[0].image_4,
//               row1[0].image_5,
//             ];

//             for (let i = 0; i < oldImages.length; i++) {
//               if (oldImages[i] !== null && !images.includes(oldImages[i])) {
//                 fs.unlinkSync(`./public/images/${oldImages[i]}`);
//               }
//             }
//           }

//           db.query(sql, param, async (error, rows) => {
//             if (!error) {
//               res.json({
//                 message:
//                   rows.affectedRows !== 0
//                     ? "Update success!"
//                     : "Product not found!",
//                 data: rows,
//               });
//             } else {
//               res.json({
//                 error: true,
//                 message: error,
//               });
//             }
//           });
//         } else {
//           res.json({
//             error: true,
//             message: error1,
//           });
//         }
//       }
//     );
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };

// const remove = async (req, res) => {
//   try {
//     const { id } = req.params;
//     var sqlDelete = "DELETE FROM product WHERE id = ?";
//     var param = [id];
//     const data = await db.query(sqlDelete, param);
//     res.json({
//       message: data.affectedRows != 0 ? "Remove sucess!" : "Not found!",
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//     });
//   }
// };
const remove = (req, res) => {
  const { id, image_1, image_2, image_3, image_4, image_5 } = req.body;
  var sql = "DELETE FROM product WHERE id = ?";
  var param = [id];
  db.query(sql, param, (error, rows) => {
    if (!error) {
      if (rows.affectedRows != 0) {
        removeFile(image_1, image_2, image_3, image_4, image_5);
      }
      res.json({
        message:
          rows.affectedRows != 0
            ? "product removed successfully!"
            : "Employee not found!",
        data: rows,
      });
    } else {
      res.json({
        error: true,
        message: error,
      });
    }
  });
};

module.exports = {
  getAll,
  getOne,
  getProductById,
  getLatest,
  create,
  update,
  remove,
};
