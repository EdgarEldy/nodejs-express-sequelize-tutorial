var express = require('express');
var router = express.Router();

// Initialize database and User model
const db = require('../models');
const User = db.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
