const express = require("express");
const app = express();
const mongoose = require('mongoose');
var cors = require('cors')
var bodyParser = require('body-parser')
var primeRouter = require('./api/routes/prime');
const User = require('./api/routes/users');
const Contact = require('./api/routes/contacts');

mongoose.connect('mongodb://localhost:27017/faclon', {useNewUrlParser: true}).then(
   db =>  {
     console.log('Connected to server');
   }, err =>  {
     console.log('Could not connect to db');
   }
 );

app.use(cors());
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())

app.listen(5011, () => {
  console.log("Server is running on port 5011");
});

app.use('/prime', primeRouter)
app.use('/user', User)
app.use('/contacts', Contact)

module.exports = app;
