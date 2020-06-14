const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  uEmail: {
    type: String,
    unique: true,
    index: true,
    lowercase: true,
  },
  ufName: {
    type: String,
  },
  ulName: String,
  uPass: String,
  upNum: Number,
  uRole: {
    type: String,
    enum: ["Student", "Parent", "Institute"],
  },
  uAddr: String,
  uState: String,
  uPinCode: Number,
  uInsti: String,
  isAdmin: {
    type: Boolean,
    required: true,
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
    required: true,
    default: false,
  },
  google: {
    id: { type: String, default: null }
  },
  facebook: {
    id: { type: String, default: null }
  },
  linkedin: {
    id: { type: String, default: null }
  },
});

module.exports = mongoose.model("User_Profile", UserSchema);
