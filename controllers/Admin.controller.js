const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const mongoose = require("mongoose");
const CourseModel = require("../models/Course.model");
const CourseRegister = require("../models/CourseRegister");
const EventModel = require("../models/Event.model");
const EventRegister = require("../models/EventRegister.model");
const ESPModel = require("../models/ESP.model");
const UserModel = require("../models/User.model");
const ContactModel = require("../models/Contact.model");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  resources: [
    { resource: CourseModel, options: { parent: { name: "Courses" } } },
    { resource: CourseRegister,options: { parent: { name: "Courses" } } },
    { resource: EventModel, options: { parent: { name: "Events" } } },
    { resource: EventRegister, options: { parent: { name: "Events"} } },
    { resource: ESPModel, options: { parent: { name: "Student Partners" } } },
    { resource: UserModel, options: { parent: { name: "Users" } } },
    { resource: ContactModel, options: { parent: { name: "Contact" } } }
  ],
  rootPath: "/admin",
  branding: {
    logo: "../assets/img/icons/Logo.svg",
    companyName: "Edudictive",
    favicon: "../assets/img/icons/Logo.svg",
    softwareBrothers: false
  }
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@edudictive",
  password: process.env.ADMIN_PASSWORD || "testpassword86",
};

module.exports = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD || 'a-really-really-long-and-secure-password',
  authenticate: async (email, password) => {
    if(email === ADMIN.email && password === ADMIN.password) {
      return ADMIN
    }
    return null
  }
}, undefined, {
  resave: true,
  saveUninitialized: false
})