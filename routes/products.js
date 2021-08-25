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

module.exports = router;