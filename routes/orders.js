var express = require("express");
var router = express.Router();
const db = require("../models");

const Customer = db.Customer;
const Product = db.Product;

// Initialize Order Model
const Order = db.Order;
