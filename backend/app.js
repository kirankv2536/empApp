const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var passport = require('passport');
const userRoutes = require("./routes/user");
const app = express();

mongoose.connect("mongodb+srv://kiran:aPGVOFwVMJfntJQB@cluster0-wt1iu.mongodb.net/test?retryWrites=true").then(()=>{
    console.log("Connected to Database");

})
.catch(()=>{
    console.log("Connection Failed");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE"
  );
  if (req.method === "OPTIONS") 
        res.send(200);
    else 
        next();
});
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users",userRoutes);

module.exports = app;
