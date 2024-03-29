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

    // Get order id
    let order_id = req.params.id;
    // Load customers
    const customers = await Customer.findAll();

    // Get customer data by order id
    const customer = await Order.findAll({
        include: [
            {
                model: Customer,
                required: true
            },
            {
                model: Product,
                required: true
            }
        ],
        where: {
            id: req.params.id
        }
    });

    // Get product data by order id
    const product = await Order.findAll({
        include: [
            {
                model: Customer,
                required: true
            },
            {
                model: Product,
                required: true
            }
        ],
        where: {
            id: req.params.id
        }
    })

    // Load categories
    const categories = await Category.findAll();

    Order.findByPk(order_id)
        .then((data) => {
            res.render('orders/edit', {
                data: data,
                customers: customers,
                customer: customer,
                categories: categories,
                product: product
            })
        })
        .catch((err) => {
            res.render('orders/edit', {
                type: 'danger',
                message: 'Order doesn\'t exist'
            });
        });
});

//Update an order
router.post('/orders/:id', (req, res, next) => {

    // Check errors

    // Validate customer_id
    if (!req.body.category_id) {
        res.render("orders/add", {
            type: "danger",
            message: "Please select the customer name !",
        });
        return;
    }

    // Validate product name
    if (!req.body.product_id) {
        res.render("orders/add", {
            type: "danger",
            message: "Please enter the product name!",
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
    if (!req.body.qty) {
        res.render("orders/add", {
            type: "danger",
            message: "Please enter the total!",
        });
        return;
    }

    //Starting update order process
    Order.update(
        {
            customer_id: req.body.customer_id,
            poduct_id: req.body.poduct_id,
            qty: req.body.qty,
            total: req.body.total,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((order) => {
            if (order == 1) {
                req.flash("success", "Order has been updated successfully !")
                res.redirect('/orders');
            } else {
                res.render('orders/edit', {
                    type: 'danger',
                    message: 'Cannot update order with id=${id} !',
                });
            }
        })
        .catch((err) => {
            res.render('orders/edit', {
                type: 'danger',
                message: 'Error updating order with id=${id} ',
            });
        });
});

// Remove an order
router.post('/orders/delete/:id', async (req, res, next) => {
    await Order.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((order) => {
            req.flash('success', 'Order has been removed successfully !');
            res.redirect('/orders');
        });
});

module.exports = router;