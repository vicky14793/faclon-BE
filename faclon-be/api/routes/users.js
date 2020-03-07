const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const Contact = require("./../../model/contact_model");
const User = require("./../../model/user_model");
const mongoose = require('mongoose');

router.post('/', (req, res, next)=>{

User.findOne({email: req.body.email}, (err, email)=>{
  if(err) res.send(err);
  if(email){
    return res.status(500).send({error: "mail id already exists"})
  }

 bcrypt.hash(req.body.password, null, null, (err, hash)=>{
   if(err){
     return res.status(500).send({error: "Error in Registration"})
   }

    User.findOne({phone:req.body.phone}, (err, mob)=>{
     if(err) res.send(err)
     if(mob){
     return res.status(500).send({error: "mobile no exists"})
   }

let newuser = new User({
  fullname: req.body.fullname,
  email: req.body.email,
  password: hash,
  phone: req.body.phone,
  dob: req.body.dob
});
console.log(newuser)

newuser.save().then(result=> {
  return res.status(200).send("User Registered successfully");
}).catch(error=>{
  return res.status(500).send({error: "Error while saving data"})
     });

    });
   });
 });
});

router.delete("/:id", async(req, res) => {
  console.log("api hitting")
  const SESSION = await mongoose.startSession();
  SESSION.startTransaction();
  try{
    let cid = mongoose.Types.ObjectId(req.params.id)
    const opts = { SESSION };
    let result1 = await User.findByIdAndRemove(req.params.id, null, opts);
      let result2 = await Contact.remove({user: user_id}, null, opts);
      await SESSION.commitTransaction();
      SESSION.endSession();
      return res.status(200).send("User deleted successfully")
}
   catch (error) {
    await SESSION.abortTransaction();
    SESSION.endSession();
    return res.status(500).send(error)
          }

})



module.exports = router;




//
