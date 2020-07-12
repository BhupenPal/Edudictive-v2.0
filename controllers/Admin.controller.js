const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const mongoose = require('mongoose')
require('../models/Course.model')
require('../models/CourseRegister')
require('../models/Event.model')
require('../models/EventRegister.model')
require('../models/ESP.model')
require('../models/User.model')
require('../models/Contact.model')

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  branding: {
    companyName: "Edudictive"
  }
})

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@edudictive',
  password: process.env.ADMIN_PASSWORD || 'testpassword86'
}

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