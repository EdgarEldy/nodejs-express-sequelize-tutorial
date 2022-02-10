var express = require("express");
var router = express.Router();
const db = require("../models");

const Customer = db.Customer;
const Product = db.Product;
const Category = db.Category;

// Initialize Order Model
const Order = db.Order;

//Get orders/index page with customers and products data
router.get("/orders", async function (req, res, next) {
    const orders = await Order.findAll({
        include: [
            {
                model: Customer,
                required: true
            },
            {
                model: Product,
                required: true
            }]
    });
    res.render("orders/index", {
        orders: orders,
    });
});

module.exports = router;