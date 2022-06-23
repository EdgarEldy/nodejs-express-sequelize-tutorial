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

module.exports = router;