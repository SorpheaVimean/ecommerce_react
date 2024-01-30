const db = require("../util/db");

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
// get all products
const getAll = async (req, res) => {
  try {
    const sql = `
     SELECT * FROM product
    `;

    const result = await db.query(sql);

    // Assuming the result is an array of rows from the database
    res.json(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
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
    "INSERT INTO product (category_id,name ,description,price ,quantity ,status ,image_1,image_2,image_3,image_4,image_5) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  
  const params = [
    category_id,
    name,
    description,
    price,
    quantity,
    status,
    ...images.slice(0, 5), // Use the first 5 images; assuming you have a limit of 5 images
    ...Array(5 - images.length).fill(null), // Pad the array with null if fewer than 5 images
  ];

  try {
    const data = await db.query(sqlInsert,params);
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

const update = (req, res) => {
  try {
    const {
      category_id,
      name,
      description,
      quantity,
      price,
      status,
      is_remove_file,
      id,
    } = req.body;

    db.query(
      "SELECT * FROM product WHERE id = ?",
      [id],
      async (error1, row1) => {
        if (!error1) {
          const images = req.files.map((file) => file.filename);

          const sql =
            "UPDATE product SET category_id= ?, name= ?, description= ?, quantity= ?, price= ?, image_1= ?, image_2= ?, image_3= ?, image_4= ?, image_5= ?, status=? WHERE id= ?";
          const param = [
            category_id,
            name,
            description,
            quantity,
            price,
            ...images,
            status,
            id,
          ];
          db.query(sql, param, async (error, rows) => {
            if (!error) {
              if (rows.affectedRows !== 0) {
                // Remove old images if requested
                if (is_remove_file) {
                  const oldImages = [
                    row1[0].image_1,
                    row1[0].image_2,
                    row1[0].image_3,
                    row1[0].image_4,
                    row1[0].image_5,
                  ];
                  for (let i = 0; i < oldImages.length; i++) {
                    if (
                      oldImages[i] !== null &&
                      !images.includes(oldImages[i])
                    ) {
                      removeFile(oldImages[i]);
                    }
                  }
                }
              }
              res.json({
                message:
                  rows.affectedRows !== 0
                    ? "Update success!"
                    : "Product not found!",
                data: rows,
                is_remove_file: is_remove_file,
              });
            } else {
              res.json({
                error: true,
                message: error,
              });
            }
          });
        } else {
          res.json({
            error: true,
            message: error1,
          });
        }
      }
    );
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

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    var sqlDelete = "DELETE FROM product WHERE id = ?";
    var param = [id];
    const data = await db.query(sqlDelete, param);
    res.json({
      message: data.affectedRows != 0 ? "Remove sucess!" : "Not found!",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
  getOne,
  getLatest,
  create,
  update,
  remove,
};
