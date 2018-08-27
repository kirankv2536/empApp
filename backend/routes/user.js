var express = require('express');
var router = express.Router();

const passport = require('passport');

var user_controller = require('../controllers/userController');

// register API
router.post('/login',passport.authenticate('local'), user_controller.user_login);

// login API
router.post('/register',user_controller.user_register);

module.exports = router;