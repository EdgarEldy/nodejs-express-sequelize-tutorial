var expres = require('express');
var router = expres.Router();

// Initialize database connection
const db = require('../models');

// Initialize Customer model
const Customer = db.Customer;

// Get customers/index page with data
router.get("/customers", async function (req, res, next) {
  Customer.findAll().then((data) => {
    res.render("customers/index", {
      customers: data,
    });
  });
});

//Get customers/add view
router.get("/customers/add", async function (req, res, next) {
  res.render("customers/add");
});

// Add a new customer
router.post("/customers", async function (req, res, next) {

  // Check errors
  if (!req.body.first_name) {
    res.render("customers/add", {
      type: "danger",
      message: "First name can not be empty !",
    });
    return;
  }

  if (!req.body.last_name) {
    res.render("customers/add", {
      type: "danger",
      message: "Last name can not be empty !",
    });
    return;
  }

  if (!req.body.tel) {
    res.render("customers/add", {
      type: "danger",
      message: "Telephone can not be empty !",
    });
    return;
  }

  if (!req.body.email) {
    res.render("customers/add", {
      type: "danger",
      message: "Email can not be empty !",
    });
    return;
  }

  if (!req.body.address) {
    res.render("customers/add", {
      type: "danger",
      message: "Address can not be empty !",
    });
    return;
  }

  // Get customers data from input
  const customer = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    tel: req.body.tel,
    email: req.body.email,
    address: req.body.address,
  };

  // Save a customer
  Customer.create(customer)
    .then((data) => {
      req.flash("success", "Customer has been saved successfully !");
      res.redirect("customers");
    })
    .catch((err) => {
      res.render("customers/add", {
        type: "danger",
        message: err.message || "Error has been occured. Please try again.",
      });
    });
});

//Get customers/edit view with customer data to update
router.get('/customers/edit/:id', async (req, res, next) => {

  Customer.findByPk(req.params.id)
    .then((data) => {
      res.render('customers/edit', {
        data: data
      });
    })
    .catch((err) => {
      res.render('customers/edit', {
        type: 'danger',
        message: 'Customer doesn\'t exist'
      });
    });
});

module.exports = router;