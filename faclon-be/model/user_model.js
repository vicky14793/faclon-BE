const mongoose = require("mongoose");
const Schema = mongoose.Schema
const UserSchema = new mongoose.Schema({

fullname:{
  type: String,
  required: true
},

email:{
  type: String,
  required: true,
  unique : true,
  match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},

 password:{
   type: String,
   required: true
 },

 phone:{
   type: Number,
   required: true
 },

 dob:{
   type: Date,
   required: true
 },

 contacts:[{
    type: Schema.Types.ObjectId,
    ref: "Contact"
  }]

}, {timestamps: true})



module.exports = mongoose.model("User", UserSchema);
