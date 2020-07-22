const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    default: null
  },
  Phone: {
    type: String
  },
  Role: {
    type: String,
    enum: ["Student", "Parent", "Institute"],
  },
  Gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  Address: {
    type: String
  },
  State: {
    type: String
  },
  PinCode: {
    type: Number
  },
  Institute: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  SecretToken: {
    type: String,
    default: null,
  },
  ResetToken: {
    type: String,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  GoogleID: {
    type: String, default: null
  },
  FacebookID: {
    type: String, default: null
  },
  LinkedinID: {
    type: String, default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("User Profile", UserSchema);
