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

// Get orders/add view with customers and categories
router.get("/orders/add", async function (req, res, next) {

    // Get categories
    const customers = await Customer.findAll();

    // Get categories
    const categories = await Category.findAll();

    res.render("orders/add", {
        customers: customers,
        categories: categories
    });
});

// Get products related to a category
router.get('/orders/getProducts/:cat_id', async (req, res, next) => {
    const cat_id = req.params.cat_id;
    const products = await Product.findAll({
        include: [{
            model: Category,
            required: true
        }],
        where: {
            category_id: cat_id
        }
    });
    res.send(products);
});

// Get unit price by product id
router.get('/orders/getUnitPrice/:product_id', async (req, res, next) => {
    const product_id = req.params.product_id;
    const unit_price = await Product.findByPk(product_id);
    res.send(unit_price);
});

// Save a new order with validations
router.post("/orders", async (req, res, next) => {

    // Check errors

    // Validate customer
    if (!req.body.customer_id) {
        res.render("orders/add", {
            type: "danger",
            message: "Please select the customer name !",
        });
        return;
    }

    // Validate category
    if (!req.body.category_id) {
        res.render("orders/add", {
            type: "danger",
            message: "Please select the category name !",
        });
        return;
    }

    // Validate product
    if (!req.body.product_id) {
        res.render("orders/add", {
            type: "danger",
            message: "Please enter the product name!",
        });
        return;
    }

    // Validate the unit price
    if (!req.body.unit_price) {
        res.render("orders/add", {
            type: "danger",
            message: "Please enter the unit price!",
        });
        return;
    }

    // Validate the quantity
    if (!req.body.qty) {
        res.render("orders/add", {
            type: "danger",
            message: "Please enter the quantity!",
        });
        return;
    }


    // Validate the total
    if (!req.body.total) {
        res.render("orders/add", {
            type: "danger",
            message: "Please enter the total!",
        });
        return;
    }

    // Get orders data from input
    const order = {
        customer_id: req.body.customer_id,
        product_id: req.body.product_id,
        qty: req.body.qty,
        total: req.body.total
    };

    // Save an order
    Order.create(order)
        .then((data) => {
            req.flash("success", "Order has been saved successfully !");
            res.redirect("orders");
        })
        .catch((err) => {
            res.render("orders/add", {
                type: "danger",
                message: err.message || "Error has been occured. Please try again.",
            });
        });
});

// Get orders/edit/id view to update
router.get('/orders/edit/:id', async (req, res, next) => {

    // Load customers
    const customers = await Customer.findAll();

    // Load categories
    const categories = await Category.findAll();

    Order.findByPk(req.params.id)
        .then((data) => {
            res.render('orders/edit', {
                data: data,
                customers: customers,
                categories: categories
            })
        })
        .catch((err) => {
            res.render('orders/edit', {
                type: 'danger',
                message: 'Order doesn\'t exist'
            });
        });
});

module.exports = router;