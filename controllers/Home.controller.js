const express = require("express");
const Router = express.Router();

const ContactModel = require("../models/Contact.model");
const ESPModel = require("../models/ESP.model");
const CourseModel = require("../models/Course.model");
const ReviewModel = require("../models/Review.model");
const EventModel = require("../models/Event.model");
const EventRegister = require("../models/EventRegister.model");
const SchoolTrialModel = require('../models/SchoolTrial.model');
const CollegeTrialModel = require('../models/CollegeTrial.model');
const CareerModel = require('../models/Career.model');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { escapeRegex } = require('../helper/service')

Router.get("/", async (req, res, next) => {
    const doc = await CourseModel.find({ CourseType: 'Course' }).limit(10).exec()
    const rev = await ReviewModel.find({}).limit(10).exec()
    res.render("Home/Home", { doc, rev })
});

Router.get("/programs/schools", (req, res, next) => {
    CourseModel.find({ SuitedFor: { $ne: "Colleges" }, CourseType: 'Course' }, (err, doc) => {
        res.render("Home/Schools", { doc });
    })
});

Router.get("/programs/colleges", (req, res, next) => {
    CourseModel.find({ SuitedFor: { $ne: "Schools" }, CourseType: 'Course' }, (err, doc) => {
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

Router.get('/careers', (req, res, next) => {
    res.render('Home/Career Form')
})

Router.post('/careers/submit', (req, res, next) => {
    new CareerModel(req.body).save().then(() => {
        res.render('Home/Career Success')
    })
})

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

Router.post("/event-register/:Key", (req, res, next) => {
    const { Key } = req.params;
    const { CollegeName, Email, FirstName, LastName, Phone, Role } = req.body
    EventModel.findOne({ Key }, (err, doc) => {
        const EventName = doc.EventName
        new EventRegister({ CollegeName, Email, FirstName, LastName, Phone, Role, Key, EventName })
            .save(err => {
                if (err) {
                    res.status(400).json({ 'Error': 'Cannot submit application' })
                } else {
                    res.send("DONE");
                }
            })
    })
})

Router.get("/course/:Key/:Name", (req, res, next) => {
    const { Key } = req.params;
    const stripe_key = process.env.STRIPE_PUBLIC_KEY;
    CourseModel.findOne({ Key, CourseType: 'Course' }, (err, doc) => {
        if (!doc) {
            res.json({ 'Error': 'Not Found' })
        }
        ReviewModel.find({ CourseKey: Key }, (err, Reviews) => {
            res.render("Home/CoursePage", { doc, Reviews, stripe_key });
        })
    });
});

Router.post("/purchase-course", (req, res, next) => {
    CourseModel.findOne({ Key: req.body.CourseKey, CourseType: 'Course' }, (err, doc) => {
        if (!doc) {
            res.status(400).josn({ message: 'Course Not Found' })
        } else {
            if (req.body.AMU != (doc.Price - (doc.Price * doc.Discount) / 100) * 100) {
                res.status(400).send({ message: 'Price Modified' })
            } else {
                stripe.charges.create({
                    amount: req.body.AMU,
                    source: req.body.stripeTokenId,
                    currency: 'inr'
                }).then(() => {
                    res.status(200).json({ message: 'Successfully purchased items' })
                    //Add course herre fore profile
                }).catch((err) => {
                    res.status(500).josn({ message: 'Failed' })
                })
            }
        }
    })
});

Router.get("/search-courses", (req, res, next) => {

    if (req.query.enquiry) {
        const regex = new RegExp(escapeRegex(req.query.enquiry), "gi");
        filterParam = {
            $or: [{ Title: regex }, { Category: regex }, { SuitedFor: regex }],
            CourseType: 'Course'
        };
        CourseModel.find(filterParam, (err, doc) => {
            res.render('Home/AllCourse', { doc, course: true })
        })
    } else {
        CourseModel.find({ CourseType: 'Course' }, (err, doc) => {
            res.render('Home/AllCourse', { doc, course: true })
        })
    }

})

Router.get("/workshops", (req, res, next) => {

    if (req.query.enquiry) {
        const regex = new RegExp(escapeRegex(req.query.enquiry), "gi");
        filterParam = {
            $or: [{ Title: regex }, { Category: regex }, { SuitedFor: regex }],
            CourseType: 'Workshop'
        };
        CourseModel.find(filterParam, (err, doc) => {
            res.render('Home/AllCourse', { doc, course: false })
        })
    } else {
        CourseModel.find({ CourseType: 'Workshop' }, (err, doc) => {
            res.render('Home/AllCourse', { doc, course: false })
        })
    }

})

Router.get('/api/course-filter', async (req, res, next) => {
    const filterParam = { class: req.query.enquiry }

    if (filterParam.class == '') {
        const record = await CourseModel
            .find({ $and: [{ class: { $ne: "college" } }, { CourseType: 'Course' }] })
            .sort({ $natural: -1 });
        return res.json(record)
    } else {
        const record = await CourseModel
            .find({ $and: [filterParam, { CourseType: 'Course' }] })
            .sort({ $natural: -1 });
        return res.json(record)
    }
})

Router.get('/api/workshop-filter', async (req, res, next) => {
    const filterParam = { class: req.query.enquiry }

    if (filterParam.class == '') {
        const record = await CourseModel
            .find({ $and: [{ class: { $ne: "college" } }, { CourseType: 'Workshop' }] })
            .sort({ $natural: -1 });
        return res.json(record)
    } else {
        const record = await CourseModel
            .find({ $and: [{ filterParam }, { CourseType: 'Workshop' }] })
            .sort({ $natural: -1 });
        return res.json(record)
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

Router.get('/book-free-trial/school', (req, res, next) => {
    res.render('Home/Trial-School')
})

Router.post('/book-free-trial/school', (req, res, next) => {
    new SchoolTrialModel(req.body).save((err) => {
        if (err) {
            if (err) {
                console.log(err)
                res.status(400).json({ 'Error': 'Cannot submit application' })
            }
        } else {
            res.render("Home/TrialSuccess");
        }
    });
})

Router.get('/book-free-trial/college', (req, res, next) => {
    res.render('Home/Trial-College')
})

Router.post('/book-free-trial/college', (req, res, next) => {
    new CollegeTrialModel(req.body).save((err) => {
        if (err) {
            if (err) {
                res.status(400).json({ 'Error': 'Cannot submit application' })
            }
        } else {
            res.render("Home/TrialSuccess");
        }
    });
})

module.exports = Router;