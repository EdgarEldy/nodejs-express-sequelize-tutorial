var express = require("express");
var router = express.Router();
const db = require("../models");
const Category = db.Category;

//Get categories/index page with data
router.get("/categories", async function (req, res, next) {
  Category.findAll().then((data) => {
    res.render("categories/index", {
      categories: data,
    });
  });
});

//Export categories routes
module.exports = router;