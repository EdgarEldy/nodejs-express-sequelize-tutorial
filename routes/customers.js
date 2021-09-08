var expres = require('express');
var router = expres.Router();

// Initialize database connection
const db = require('../models');

// Get customers/index page with data
router.get("/customers", async function (req, res, next) {
  Customer.findAll().then((data) => {
    res.render("customers/index", {
      customers: data,
    });
  });
});


// Initialize Customer model
const Customer = db.Customer;

module.exports = router;