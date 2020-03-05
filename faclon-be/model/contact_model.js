const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ContactSchema = new mongoose.Schema({
  user: {
          type: Schema.Types.ObjectId,
          ref: "User"
      },

 work:{
   type: Number,
   required: true
 },

 home:{
   type: Number,
   required: true
 },

}, {timestamps: true})



module.exports = mongoose.model("Contact", ContactSchema);
