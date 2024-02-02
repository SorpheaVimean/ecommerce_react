const { TOKEN_KEY } = require("../util/helper");
const jwt = require("jsonwebtoken");
const db = require("../util/db");

// exports.userGuard = (parameter) => {
//   return (req, res, next) => {
//     var authorization = req.headers.authorization; // token from client
//     var token_from_client = null;
//     if (authorization != null && authorization != "") {
//       token_from_client = authorization.split(" "); // authorization : "Bearer lkjsljrl;kjsiejr;lqjl;ksjdfakljs;ljl;r"
//       token_from_client = token_from_client[1];
//     }
//     if (token_from_client == null) {
//       res.status(401).send({
//         message: "Unauthorized",
//       });
//     } else {
//       jwt.verify(token_from_client, TOKEN_KEY, (error, result) => {
//         if (error) {
//           res.status(401).send({
//             message: "Unauthorized",
//             error: error,
//           });
//         } else {
//           // check is has permission
//           var permission = result.data.permission; // get permmission array from verify token
//           req.user = result.data; // write user property
//           req.user_id = result.data.user.id;
//           if (parameter == null) {
//             next();
//           } else if (permission.includes(parameter)) {
//             next();
//           } else {
//             res.status(401).send({
//               message: "Unauthorized",
//             });
//           }
//           next();
//         }
//       });
//     }
//   };
// };
exports.userGuard = (parameter) => {
  return (req, res, next) => {
    var authorization = req.headers.authorization; // token from client
    var token_from_client = null;
    if (authorization != null && authorization != "") {
      token_from_client = authorization.split(" "); // authorization : "Bearer lkjsljrl;kjsiejr;lqjl;ksjdfakljs;ljl;r"
      token_from_client = token_from_client[1];
    }
    if (token_from_client == null) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    jwt.verify(token_from_client, TOKEN_KEY, (error, result) => {
      if (error) {
        return res.status(401).send({
          message: "Unauthorized",
          error: error,
        });
      }
      // check if user has permission
      var permission = result.data.permission; // get permission array from verified token
      req.user = result.data; // write user property
      req.user_id = result.data.user.id;
      if (parameter == null || permission.includes(parameter)) {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized",
        });
      }
    });
  };
};

// exports.userGuardV1 = (req, res, next) => {
//   // get access token from client
//   var authorization = req.headers.authorization; // token from client
//   var token_from_client = null;
//   if (authorization != null && authorization != "") {
//     token_from_client = authorization.split(" "); // authorization : "Bearer lkjsljrl;kjsiejr;lqjl;ksjdfakljs;ljl;r"
//     token_from_client = token_from_client[1];
//   }
//   if (token_from_client == null) {
//     res.status(401).send({
//       message: "Unauthorized",
//     });
//   } else {
//     jwt.verify(token_from_client, TOKEN_KEY, (error, result) => {
//       if (error) {
//         res.status(401).send({
//           message: "Unauthorized",
//           error: error,
//         });
//       } else {
//         // check is has permission
//         var permisson = result.data.permisson; // get permmission array from verify token

//         req.user = result.data; // write user property
//         req.user_id = result.data.user.customer_id;
//         next();
//       }
//     });
//   }
// };

exports.getPermissionUser = async (id) => {
    var sql =
    "SELECT" +
    " p.code" +
    " FROM employee e" +
    " INNER JOIN role r ON e.role_id = r.id" + 
    " INNER JOIN role_permission rp ON r.id = rp.role_id" +
    " INNER JOIN permission p ON rp.permission_id = p.id" +
    " WHERE e.id = ? "; 
  var list = await db.query(sql, [id]);
  
  // Extracting permission codes from the result
  var permissionCodes = list.map(item => item.code);
  
  return permissionCodes;
};

