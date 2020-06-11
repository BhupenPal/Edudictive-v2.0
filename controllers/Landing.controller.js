const Cart = require("../models/Cart.model");
const Contact = require("../models/Contact.model");
const Course = require("../models/Course.model");

/* Home Routes */
module.exports = {
  getIndex: (req, res, next) => {
    res.render("Home");
  },

  getSchools: (req, res, next) => {
    res.render("Schools");
  },

  getColleges: (req, res, next) => {
    res.render("Colleges");
  },

  getEntrepreneurs: (req, res, next) => {
    res.render("Entrepreneurs");
  },

  getEvents: (req, res, next) => {
    res.render("Events");
  },

  getAbout: (req, res, next) => {
    res.render("About");
  },

  getTeam: (req, res, next) => {
    res.render("Team");
  },

  getContact: (req, res, next) => {
    res.render("Contact");
  },

  getAddToCart: (req, res, next) => {
    res.render("add-to-cart");
  },

  addToCart: (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    // Product.findById(productId, (err, doc) => {
    //   if (err) {
    //     console.log(err);
    //     return res.send("ERROR ADDING TO CART");
    //   }

      cart.add(productId, productId);
      req.session.cart = cart;
      console.log(req.session.cart);

      res.send('Hello')
    //});
  },

  contactUs: (req, res, next) =>{
    const NewContact = new Contact(req.body);
    NewContact.save((err)=>{
      if(err){
        res.send('error');         
        return
      }
      res.send('DONE');
    })
  },
  getCourse: (req,res,next)=>{
    const { cID } = req.params;

    Course.findOne({ Key : cID }, (err, doc) => {
      res.render('Course', { doc })
    })
  },

  campusAmbassador :(req,res,next)=>{
      res.render('Campus')
  },
}
