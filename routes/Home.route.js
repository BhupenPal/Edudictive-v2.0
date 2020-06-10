const express = require("express");
const router = express.Router();

const LandingController = require("../controllers/Landing.controller");

// HEADER LINKS
router.get("/", LandingController.getIndex);
router.get("/programs/schools", LandingController.getSchools);
router.get("/programs/colleges", LandingController.getColleges);
router.get("/events", LandingController.getEvents);
router.get("/about-us", LandingController.getAbout);
router.get("/contact-us", LandingController.getContact);

//CONTACT US SUBMIT
router.post("/contact-us", LandingController.contactUs);

//CART HANDLE
router.get("/to-cart/:id", LandingController.getAddToCart);
router.post("/to-cart/:id", LandingController.addToCart);

//COURSE HANDLE
router.get("/course/:cID", LandingController.getCourse);
//router.get("/learn-more", LandingController.getwebDev);
//Campus Ambassador
router.get("/campus-ambassador", LandingController.campusAmbassador);



module.exports = router;
