const express = require("express");
const Router = express.Router();

const ContactModel = require("../models/Contact.model");
const ESPModel = require("../models/ESP.model");
const CourseModel = require("../models/Course.model");
const ReviewModel = require("../models/Review.model");
const EventModel = require("../models/Event.model");

Router.get("/", async (req, res, next) => {
    const doc = await CourseModel.find({}).limit(10).exec()
    const rev = await ReviewModel.find({}).limit(10).exec()
    res.render("Home/Home", { doc, rev })
});

Router.get("/programs/schools", (req, res, next) => {
    CourseModel.find({ SuitedFor: { $ne: "Colleges" } }, (err, doc) => {
        res.render("Home/Schools", { doc });
    })
});

Router.get("/programs/colleges", (req, res, next) => {
    CourseModel.find({ SuitedFor: { $ne: "Schools" } }, (err, doc) => {
        res.render("Home/Colleges", { doc });
    })
});

Router.get("/events", async (req, res, next) => {
    const sessions = await EventModel.find({ EventType: 'Session' })
    const webinars = await EventModel.find({ EventType: 'Webinar' })
    res.render("Home/Events", { webinars, sessions });
});

Router.get("/event-register", (req, res, next) => {
    res.render("Home/Event");
});
Router.get("/about-us", (req, res, next) => {
    res.render("Home/About");
});

Router.get("/contact-us", (req, res, next) => {
    res.render("Home/Contact");
});

Router.get("/privacy-policy", (req, res, next) => {
    res.render("Home/Privacy-Policy")
});

Router.post("/contact-us", (req, res, next) => {
    new ContactModel(req.body).save((err) => {
        if (err) {
            res.status(400).json({ 'Error': 'Cannot submit query' })
        }
        res.send("DONE");
    });
});

Router.post("/event-register", (req, res, next) => {
    new EventModel(req.body).save((err) => {
        if (err) {
            res.status(400).json({ 'Error': err })
        }
        res.send('works!')
    })
})

Router.get("/course/:Key/:Name", (req, res, next) => {
    const { Key } = req.params;
    CourseModel.findOne({ Key }, (err, doc) => {
        res.render("Home/Course", { doc });
    });
});

Router.get("/search-courses", (req, res, next) => {
    CourseModel.find({}, (err, doc) => {
        res.render('Home/AllCourse', { doc })
    })
})

Router.get("/edudictive-student-partner", (req, res, next) => {
    res.render("Home/StudentPartner");
});

Router.get("/edudictive-student-partner/apply", (req, res, next) => {
    res.render("Home/ESPForm");
});

Router.post("/edudictive-student-partner/apply", (req, res, next) => {
    new ESPModel(req.body).save((err) => {
        if (err) {
            if (err) {
                res.status(400).json({ 'Error': 'Cannot submit application' })
            }
        } else {
            res.render("ESPFormSuccess");
        }
    });
});

module.exports = Router;