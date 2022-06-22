var express = require('express');
var router = express.Router();

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

module.exports = router;
