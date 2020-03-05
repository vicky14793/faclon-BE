const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const Contact = require("./../../model/contact_model");
const User = require("./../../model/user_model");
var ObjectId = require('mongoose').Types.ObjectId;

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

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) =>  {
    if (user){
      let cid = new ObjectId(user.contacts[0])
      Contact.findByIdAndRemove(cid, (err, cont) =>{
        if(err){
           return res.status(500).send(err)
        }
     return res.status(200).send(cont);
      });
    }

  });
});



module.exports = router;
