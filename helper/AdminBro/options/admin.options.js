const AdminBro = require('admin-bro')

//Course Options
const CourseOptions = require("../resources/admin.courses");
const CourseRegOptions = require("../resources/admin.courseReg");
const ReviewOptions = require("../resources/admin.Reviews");

//Events Options
const EventOptions = require("../resources/admin.events");
const EventRegOptions = require("../resources/admin.eventReg");

//ESP Options
const ESPRegOptions = require("../resources/admin.ESPReg");

//Users Options
const UsersOptions = require("../resources/admin.users");

//Demo Classes
const SchoolDemos = require("../resources/admin.SchoolTrials");
const CollegeDemos = require("../resources/admin.CollegeTrial");

//Contact Options
const ContactOptions = require("../resources/admin.contact");

const AdminBroMongoose = require("admin-bro-mongoose");
const mongoose = require("mongoose");
AdminBro.registerAdapter(AdminBroMongoose);

const options = {
    databases: [mongoose],
    resources: [
        CourseOptions,
        CourseRegOptions,
        ReviewOptions,
        EventOptions,
        EventRegOptions,
        ESPRegOptions,
        UsersOptions,
        SchoolDemos,
        CollegeDemos,
        ContactOptions
    ],
    rootPath: "/admin",
    branding: {
        logo: "../assets/img/icons/Logo.svg",
        companyName: "Edudictive",
        favicon: "../assets/img/icons/Logo.svg",
        softwareBrothers: false,
    },
    dashboard: {
        component: AdminBro.bundle('../components/Dashboard.tsx')
    }
}

module.exports = options