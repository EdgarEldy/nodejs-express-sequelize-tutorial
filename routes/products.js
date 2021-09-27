var express = require("express");
var router = express.Router();
const db = require("../models");
const Product = db.Product;
const Category = db.Category;

//Get products/index page with products data
router.get("/products", async function (req, res, next) {
    const products = await Product.findAll({ include: Category });
    res.render("products/index", {
        products: products,
    });
});

// Get products/add view with categories
router.get("/products/add", async function (req, res, next) {

    // Get categories
    const categories = await Category.findAll();

    res.render("products/add", {
        categories: categories
    });
});

// Add a new product
router.post("/products", async function (req, res, next) {

    // Check errors

    // Validate category_id
    if (!req.body.category_id) {
        res.render("products/add", {
            type: "danger",
            message: "Please select the category name !",
        });
        return;
    }

    // Validate product name
    if (!req.body.product_name) {
        res.render("products/add", {
            type: "danger",
            message: "Please enter the product name!",
        });
        return;
    }

    // Validate unit price
    if (!req.body.unit_price) {
        res.render("products/add", {
            type: "danger",
            message: "Please enter the unit price!",
        });
        return;
    }

    // Get products data from input
    const product = {
        category_id: req.body.category_id,
        product_name: req.body.product_name,
        unit_price: req.body.unit_price,
    };

    // Save a product
    Product.create(product)
        .then((data) => {
            req.flash("success", "Product has been saved successfully !");
            res.redirect("products");
        })
        .catch((err) => {
            res.render("products/add", {
                type: "danger",
                message: err.message || "Error has been occured. Please try again.",
            });
        });
});

//Get products/edit view with products data to update
router.get('/products/edit/:id', async (req, res, next) => {

    // Load categories
    const categories = await Category.findAll();
    
    Product.findByPk(req.params.id)
      .then((data) => {
        res.render('products/edit', {
          data: data,
          categories: categories
        });
      })
      .catch((err) => {
        res.render('products/edit', {
          type: 'danger',
          message: 'Product doesn\'t exist'
        });
      });
  });

  //Update a product 
router.post('/products/:id', (req, res, next) => {

    // Check errors

    // Validate category_id
    if (!req.body.category_id) {
        res.render("products/add", {
            type: "danger",
            message: "Please select the category name !",
        });
        return;
    }

    // Validate product name
    if (!req.body.product_name) {
        res.render("products/add", {
            type: "danger",
            message: "Please enter the product name!",
        });
        return;
    }

    // Validate unit price
    if (!req.body.unit_price) {
        res.render("products/add", {
            type: "danger",
            message: "Please enter the unit price!",
        });
        return;
    }
  
    //Starting update product process
    Product.update(
      {
        category_id: req.body.category_id,
        product_name: req.body.product_name,
        unit_price: req.body.unit_price,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((product) => {
        if (product == 1) {
          req.flash("success", "Product has been updated successfully !")
          res.redirect('/products');
        } else {
          res.render('products/edit', {
            type: 'danger',
            message: 'Cannot update product with id=${id} !',
          });
        }
      })
      .catch((err) => {
        res.render('products/edit', {
          type: 'danger',
          message: 'Error updating product with id=${id} ',
        });
      });
  });
  

module.exports = router;