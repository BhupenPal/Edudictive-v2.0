const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User.controllers");

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../controllers/auth/auth");

//SERVICES
const {courseUpload} = require('../controllers/services/UploadManager');

//USER ROUTES HANDLE
router.get("/login", forwardAuthenticated, UserController.getLogin);
router.post("/login", UserController.postLogin);

router.get("/login/google", UserController.googleLogin);
router.get("/login/google/confirm", UserController.googleLoginConfirm);

router.get("/login/fb", UserController.facebookLogin);
router.get("/login/fb/confirm", UserController.facebookLoginConfirm);

router.get("/login/linkedin", UserController.linkedinLogin)
router.get("/login/linkedin/confirm", UserController.linkedinLoginConfirm)

router.get("/register", UserController.getRegister);
router.post("/register", UserController.postRegister);

router.get("/verify", UserController.getVerify);

router.get("/reset", UserController.getReset);
router.post("/reset", UserController.postReset);

router.get("/dashboard", ensureAuthenticated, UserController.getDashboard);

router.get('/logout', UserController.logout)
/* FOR ADMINS ONLY */
//ADD COURSES
router.get("/add-course", UserController.getAddCourse);
router.post("/add-course", courseUpload, UserController.postAddCourse);

module.exports = router;
