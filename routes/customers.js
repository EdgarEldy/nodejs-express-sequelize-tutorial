var expres = require('express');
var router = expres.Router();

// Initialize database connection
const db = require('../models');

// Initialize Customer model
const Customer = db.Customer;

module.exports = router;