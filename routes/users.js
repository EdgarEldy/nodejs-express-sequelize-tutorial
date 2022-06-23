var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

// Initialize database and User model
const db = require('../models');
const User = db.User;
const Role = db.Role;

/* GET users listing. */
router.get('/users', async (req, res, next) => {
    const users = await User.findAll({
        include: [
            {
                model: Role,
                required: true
            }
        ]
    });

    res.render('users/index', {
        users: users
    });
});

// GET users/register view
router.get('/users/register', async (req, res, next) => {

    // Get roles
    const roles = await Role.findAll();

    res.render('users/register', {
        roles: roles
    });
});

// Add a new user
router.post('/users', (req, res, next) => {

    if (!req.body.role_id || !req.body.first_name || !req.body.last_name || !req.body.tel || !req.body.email || !req.body.address || !req.body.username || !req.body.password || !req.body.password2) {
        req.flash('error', 'Please, fill in all the fields.');
        res.render("users/register");
        return;
    }

    if (req.body.password !== req.body.password2) {
        req.flash('error', 'Please, enter the same password twice.')
        res.render('users/register');
    }

    var hashedPassword = bcrypt.hashSync(req.body.password, 10);

    var user = {
        role_id: req.body.role_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        tel: req.body.tel,
        email: req.body.email,
        address: req.body.address,
        username: req.body.username,
        password: hashedPassword,
    }

    // Save a new user
    User.create(user)
        .then((data) => {
            req.flash('success', 'User has been saved successfully !');
            res.redirect('users');
        })
        .catch((err) => {
            res.render('users/register', {
                type: "danger",
                message: err.message || 'Error has been occured. Please try again.',
            });
        });
});

// Get users/login view
router.get('/users/login', (req, res, next) => {
    res.render('users/login', {
        layout: false
    });
});

module.exports = router;
