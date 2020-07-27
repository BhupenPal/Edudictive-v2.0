const express = require("express");
const Router = express.Router();

const ContactModel = require("../models/Contact.model");
const ESPModel = require("../models/ESP.model");
const CourseModel = require("../models/Course.model");
const ReviewModel = require("../models/Review.model");
const EventModel = require("../models/Event.model");

const { escapeRegex } = require('../helper/service')

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
    const LiveWeb = await EventModel.find({ $and: [{ EventType: 'Webinar' }, { Live: true }] })
    const Archive = await EventModel.find({ $and: [{ EventType: 'Webinar' }, { Archive: true }] })
    res.render("Home/Events", { webinars, LiveWeb, Archive, sessions });
});

Router.get("/event/:Key/:Name", (req, res, next) => {
    const { Key } = req.params
    EventModel.findOne({ Key }, (err, doc) => {
        res.render("Home/EventPage", { doc });
    })
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
        res.send('Registered')
    })
})

Router.get("/course/:Key/:Name", (req, res, next) => {
    const { Key } = req.params;
    CourseModel.findOne({ Key }, (err, doc) => {
        if (!doc) {
            res.json({ 'Error': 'Not Found' })
        }
        ReviewModel.find({ CourseKey: Key }, (err, Reviews) => {
            res.render("Home/CoursePage", { doc, Reviews });
        })
    });
});

Router.get("/search-courses", (req, res, next) => {

    if (req.query.enquiry) {
        const regex = new RegExp(escapeRegex(req.query.enquiry), "gi");
        filterParam = {
            $or: [{ Title: regex }, { Category: regex }],
        };
        CourseModel.find(filterParam, (err, doc) => {
            res.render('Home/AllCourse', { doc })
        })
    } else {
        CourseModel.find({}, (err, doc) => {
            res.render('Home/AllCourse', { doc })
        })
    }

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
            res.render("Home/ESPFormSuccess");
        }
    });
});

module.exports = Router;