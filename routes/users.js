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

module.exports = router;
