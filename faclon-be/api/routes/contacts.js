const express = require("express");
const router = express.Router();
const Contact = require("./../../model/contact_model");
const User = require("./../../model/user_model");
var ObjectId = require('mongoose').Types.ObjectId;
const db = require('mongoose');

router.post('/:id', async function(req, res, next) {
  const SESSION = await db.startSession();
  SESSION.startTransaction();

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
try{
  const opts = { SESSION, new: true };

  let userid = new ObjectId(req.params.id)
  var user1 = await User.findOne({ _id: userid })
  console.log(user1)
  if(user1){
    let newcontact = new Contact({
      user: userid,
      work: req.body.work,
      home: req.body.home,
    })
    await newcontact.save(opts)
    if(newcontact) {
               //console.log(newcontact)
                let updateUser = await user1.updateOne({ $push: { contacts: newcontact._id } }, opts)
                return res.status(200).send("Contacts updated to user account");
              }
            }

} catch(error) {
  await SESSION.abortTransaction();
  SESSION.endSession();
  return res.status(500).send({error: "Error while saving data"})
   }

});
});
});

module.exports = router;
