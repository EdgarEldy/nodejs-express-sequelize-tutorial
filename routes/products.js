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

module.exports = router;