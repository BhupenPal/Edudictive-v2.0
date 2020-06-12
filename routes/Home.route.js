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

//Campus Ambassador
router.get("/campus-ambassador", LandingController.campusAmbassador);

router.get('/espform', LandingController.getEspForm);
router.get('/espformsuccess', LandingController.getEspFormSuccess);
router.post('/espform', LandingController.postEspForm);
module.exports = router;