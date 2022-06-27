var express = require('express');
var router = express.Router();
var isAuthenticated = require('../helpers/helper').isAuthenticated;

/* GET home page. */
router.get('/', isAuthenticated, function (req, res, next) {
    res.render('home/index');
});

module.exports = router;
