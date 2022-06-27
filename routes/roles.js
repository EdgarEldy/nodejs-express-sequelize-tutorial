const express = require('express');
const router = express.Router();

// Initialize database and Role model
const db = require('../models');
const Role = db.Role;

// Show roles
router.get('/roles', async (req, res, next) => {
    await Role.findAll()
        .then((data) => {
            res.render('roles/index', {
                roles: data
            });
        });
});

// Get roles/add view
router.get('/roles/add', (req, res, next) => {
    res.render('roles/add');
});

// Add a new role
router.post("/roles", async function (req, res, next) {
    // Check errors
    if (!req.body.name) {
        res.render("roles/add", {
            type: "danger",
            message: "Role name can not be empty !",
        });
        return;
    }

    // Get role name from input
    const role = {
        name: req.body.name,
    };

    // Save a role
    Role.create(role)
        .then((data) => {
            req.flash('success', 'Role name has been saved successfully !');
            res.redirect("roles");
        })
        .catch((err) => {
            res.render('roles/add', {
                type: 'danger',
                message: err.message || 'Error has been occured. Please try again.',
            });
        });
});

module.exports = router;