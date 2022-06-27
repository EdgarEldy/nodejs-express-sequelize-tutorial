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

//Get roles/edit view with role data to update
router.get('/roles/edit/:id', async (req, res, next) => {

    Role.findByPk(req.params.id)
        .then((data) => {
            res.render('roles/edit', {
                data: data
            });
        })
        .catch((err) => {
            res.render('roles/edit', {
                type: 'danger',
                message: 'Role doesn\'t exist'
            });
        });
});

//Update a role
router.post('/roles/:id', (req, res, next) => {

    //Applying error validations
    if (!req.body.name) {
        res.render('roles/edit', {
            type: 'danger',
            message: 'Role name can\'t be empty !'
        });
        return;
    }

    //Starting update role process
    Role.update(
        {
            name: req.body.name,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((role) => {
            if (role == 1) {
                req.flash('success', 'Role has been updated successfully !')
                res.redirect('/roles');
            } else {
                res.render('roles/edit', {
                    type: 'danger',
                    message: 'Cannot update role with id=${id} !',
                });
            }
        })
        .catch((err) => {
            res.render('roles/edit', {
                type: 'danger',
                message: 'Error updating role with id=${id} ',
            });
        });
});

//Remove a role
router.post('/roles/delete/:id', (req, res, next) => {
    Role.destroy({
        where: {
            id: req.params.id
        }
    })
        .then((role) => {
            req.flash('success', 'Role has been removed successfully !');
            res.redirect('/roles');
        });
});

module.exports = router;