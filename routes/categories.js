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

//Get categories/add view
router.get("/categories/add", async function (req, res, next) {
  res.render("categories/add");
});

// Add a new category
router.post("/categories", async function (req, res, next) {
  // Check errors
  if (!req.body.category_name) {
    res.render("categories/add", {
      type: "danger",
      message: "Category name can not be empty !",
    });
    return;
  }

  // Get category name from input
  const category = {
    category_name: req.body.category_name,
  };

  // Save a category
  Category.create(category)
    .then((data) => {
      req.flash("success", "Product category has been saved successfully !");
      res.redirect("categories");
    })
    .catch((err) => {
      res.render("categories/add", {
        type: "danger",
        message: err.message || "Error has been occured. Please try again.",
      });
    });
});

//Get categories/edit view with category data to update
router.get('/categories/edit/:id', async (req, res, next) => {

  Category.findByPk(req.params.id)
    .then((data) => {
      res.render('categories/edit', {
        data: data
      });
    })
    .catch((err) => {
      res.render('categories/edit', {
        type: 'danger',
        message: 'Category doesn\'t exist'
      });
    });
});

//Update a product category
router.post('/categories/:id', (req, res, next) => {

  //Applying error validations
  if (!req.body.category_name) {
    res.render('categories/edit', {
      type: 'danger',
      message: 'Category name can\'t be empty !'
    });
    return;
  }

  //Starting update product category process
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((category) => {
      if (category == 1) {
        req.flash("success", "Product category has been updated successfully !")
        res.redirect('/categories');
      } else {
        res.render('categories/edit', {
          type: 'danger',
          message: 'Cannot update category with id=${id} !',
        });
      }
    })
    .catch((err) => {
      res.render('categories/edit', {
        type: 'danger',
        message: 'Error updating category with id=${id} ',
      });
    });
});

//Remove a product category
router.post('/categories/delete/:id', (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((category) => {
      res.redirect('/categories');
    });
});
//Export categories routes
module.exports = router;
