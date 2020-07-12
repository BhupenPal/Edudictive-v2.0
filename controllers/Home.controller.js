const express = require("express");
const Router = express.Router();

const ContactModel = require("../models/Contact.model");
const ESPModel = require("../models/ESP.model");
const EventModel=require("../models/Event.model")

Router.get("/", (req, res, next) => {
    res.render("Home/Home");
});

Router.get("/programs/schools", (req, res, next) => {
    res.render("Home/Schools");
});

Router.get("/programs/colleges", (req, res, next) => {
    res.render("Home/Colleges");
});

Router.get("/events", (req, res, next) => {
    res.render("Home/Events");
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

Router.post("/contact-us", (req, res, next) => {
    new ContactModel(req.body).save((err) => {
        if (err) {
            res.status(400).json({ 'Error': 'Cannot submit query' })
        }
        res.send("DONE");
    });
});

Router.post("/event-register",(req,res,next)=>{
    console.log(req.body);
    new EventModel(req.body).save((err)=>{
        if(err){            
            res.status(400).json({'Error':err})
        }
        res.send('works!')
    })
})

Router.get("/course/:Key", (req, res, next) => {
    const { Key } = req.params;
    Course.findOne({ Key }, (err, doc) => {
        res.render("Home/Course", { doc });
    });
});

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
