var User = require('../models/user');

var Joi = require('joi');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Register new user.
exports.user_register = function(req, res) {
        var name = req.body.name;
        var email= req.body.email;
        var password= req.body.password;
        var role= req.body.role;
    
        const schema = {
          name : Joi.string().alphanum().min(3).max(30).required(),
          email : Joi.string().email().required(),
          password : Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
          role : Joi.string().required()
    
        }
        const response = Joi.validate(req.body , schema);
        if(response.error){
            res.status(400).send(response.error.details[0].message);
            return;
        }
        var newUser = new User({
            name: name,
            email: email,
            password: password,
            role: role
        });
        
        User.createUser(newUser, function(err,user){
            if(err) throw err;
            console.log(user);
            res.send(user);
            
        });

        
    
};



passport.use(new LocalStrategy(
    function(username, password, done) {
     User.getUserByEmail(username, function(err, user){
         console.log(err);
         console.log(user);
        if(err) throw err;
        if(!user) {
           return done(null,false, {message : 'No user'});
        }
     
     User.comparePassword(password,user.password,function(err,isMatch){
         if(err) throw err;
         if(isMatch){
             return done(null,user);
         }else{
             return done(null,false,{message: 'invalid password'});
         }
     });
    });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        console.log(user);
      done(err, user);
    });
  });

// find user 
exports.user_login = function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  console.log(req.user);
  res.send(req.user);
};