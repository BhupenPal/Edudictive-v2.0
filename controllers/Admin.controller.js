const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const options = require('../helper/AdminBro/options/admin.options');

const adminBro = new AdminBro(options);

const ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@edudictive",
  password: process.env.ADMIN_PASSWORD || "testpassword86",
};

// module.exports = AdminBroExpress.buildAuthenticatedRouter(
//   adminBro,
//   {
//     cookieName: process.env.ADMIN_COOKIE_NAME || "admin-bro",
//     cookiePassword:
//       process.env.ADMIN_COOKIE_PASSWORD ||
//       "a-really-really-long-and-secure-password",
//     authenticate: async (email, password) => {
//       if (email === ADMIN.email && password === ADMIN.password) {
//         return ADMIN;
//       }
//       return null;
//     },
//   },
//   undefined,
//   {
//     resave: true,
//     saveUninitialized: false,
//   }
// );

module.exports = AdminBroExpress.buildRouter(adminBro);