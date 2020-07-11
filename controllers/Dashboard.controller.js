const express = require('express')
const Router = express.Router()
const userModel = require("../models/User.model");
const bcrypt = require("bcryptjs");
let errors = [];

const { ensureAuthenticated, ensureAdmin } = require("../helper/service");

Router.get("/", ensureAuthenticated, (req, res, next) => {
  res.render("Dashboard/Profile");
});

Router.get("/add-course", ensureAdmin, (req, res, next) => {
  res.render("Dashboard/Admin/AddCourse");
})

module.exports = Router

// module.exports = {
//     getDashboard : (req,res,next) => {
//         res.redirect('/user/dashboard')
//     },

//     postProfile : (req,res,next) =>{
//         errors = [];
//         let {ufName, ulName, upNum, uRole, uAddr, uState, uPinCode, uInsti} = req.body;
//         let currentUser = await userModel.findOne({_id:req.user._id});

//         if(!ufName) {
//             ufName = currentUser.ufName;
//         }
//         if(!ulName) {
//             ulName = currentUser.ulName;
//         }
//         if(!upNum) {
//             upNum = currentUser.upNum;
//         }
//         if(!uRole) {
//             uRole = currentUser.uRole;
//         }
//         if(!uAddr) {
//             uAddr = currentUser.uAddr;
//         }
//         if(!uState) {
//             uState = currentUser.uState;
//         }
//         if(!uPinCode) {
//             uPinCode = currentUser.uPinCode; 
//         }
//         if(!uInsti) {
//             uInsti = currentUser.uInsti;
//         }

//         userModel.updateOne(
//             {_id: req.user._id},
//             {
//                 $set: {
//                    ufName : ufName, 
//                    ulName : ulName, 
//                    upNum : upNum, 
//                    uRole : uRole, 
//                    uAddr : uAddr, 
//                    uState : uState, 
//                    uPinCode : uPinCode, 
//                    uInsti : uInsti
//                 },
//             },
//             (err, doc) =>{
//                 res.redirect("/user/dashboard")
//             }
//         );
//     },

//     patchPassword: async (req, res, next) => {
//         errors = [];
//         const { originaluPass, uPass, ucPass } = req.body;

//         let currentUser = await userModel.findOne({ _id: req.user.id });

//         if (!originaluPass || !uPass || !ucPass) {
//           errors.push({ msg: "Please fill in all fields" });
//         }

//         if (errors.length == 0) {
//           PassCheck(uPass, ucPass, errors);
//         }

//         if (errors.length > 0) {
//           res.render("Dashboard", { errors });
//         } else {
//           bcrypt.compare(originaluPass, currentUser.uPass, (err, isMatch) => {
//             if (err) throw err;
//             if (isMatch) {
//               bcrypt.genSalt(12, (err, salt) =>
//                 bcrypt.hash(uPass, salt, (err, hash) => {
//                   if (err) throw err;
//                   userModel.updateOne(
//                     { uEmail: currentUser.uEmail },
//                     {
//                       $set: {
//                         uPass: hash,
//                       },
//                     },
//                     res.render("Dashboard", {
//                       success_msg: "Password Updated Successfully",
//                     })
//                   );
//                 })
//               );
//             } else {
//               errors.push({
//                 msg:
//                   "The password you entered does not match your current password",
//               });
//               res.render("Dashboard", { errors });
//             }
//           });
//         }
//       }
// }