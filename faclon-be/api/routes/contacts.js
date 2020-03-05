const express = require("express");
const router = express.Router();
const Contact = require("./../../model/contact_model");
const User = require("./../../model/user_model");
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/:id', async function(req, res, next) {

  Contact.findOne({work:req.body.work}, async function(err, work) {
   if(err) res.send(err)
   if(work){
   return res.status(500).send({error: "mobile no exists"})
  }

  Contact.findOne({home:req.body.home}, async function(err, home) {
   if(err) res.send(err)
   if(home){
   return res.status(500).send({error: "mobile no exists"})
  }

let userid = new ObjectId(req.params.id)
var user1 = await User.findOne({ _id: userid })
if(user1){
  let newcontact = new Contact({
    user: user1._id,
    work: req.body.work,
    home: req.body.home
  }).save().then(async function(result) {
    if (result) {
             console.log(result)
              let updateUser = await user1.updateOne({ $push: { contacts: result._id } })
              return res.status(200).send("Contacts updated to user account");
            }
    }).catch(error=>{
    return res.status(500).send({error: "Error while saving data"})
       });
}

});
});
});

module.exports = router;
