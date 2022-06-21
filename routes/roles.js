const express = require('express');
const router = express.Router();

// Initialize database and Role model
const db = require('../models');
const Role = db.Role;

module.exports = router;