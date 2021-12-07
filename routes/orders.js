var express = require("express");
var router = express.Router();
const db = require("../models");

// Initialize Order Model
const Order = db.Order;