var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var flash = require("connect-flash");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");

// Initialize passport
var passport = require('passport');
var auth = require('./routes/auth');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//Call categories routes
var categoriesRouter = require('./routes/categories');

//Call products routes
var productsRouter = require('./routes/products');

//Call customers routes
var customerRouter = require('./routes/customers');

// Call orders routes
var ordersRouter = require('./routes/orders');

// Roles routes
var rolesRouter = require('./routes/roles');
var app = express();

// view engine setup
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "main",
    partialsDir: ["views/partials"],
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Setting up express session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Setting up auth middleware using passport-local
auth(app);

// Setting up user session middleware with passport
app.use(passport.authenticate('session'));

// Setting up connect flash middleware
app.use(flash());

// Add global variables
app.use(function (req, res, next) {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRouter);

//Users routes
app.get('/users', usersRouter);
app.get('/users/register', usersRouter);
app.post('/users', usersRouter);
app.get('/users/login', usersRouter);
app.post('/login', usersRouter);

// categories routes
app.get('/categories', categoriesRouter);
app.get('/categories/add', categoriesRouter);
app.post("/categories", categoriesRouter);
app.get('/categories/edit/:id', categoriesRouter);
app.post("/categories/:id", categoriesRouter);
app.post('/categories/delete/:id', categoriesRouter);

//Products routes
app.get('/products', productsRouter);
app.get('/products/add', productsRouter);
app.post('/products', productsRouter);
app.get('/products/edit/:id', productsRouter);
app.post('/products/:id', productsRouter);
app.post('/products/delete/:id', productsRouter);

//Customers routes
app.get("/customers", customerRouter);
app.get("/customers/add", customerRouter);
app.post("/customers", customerRouter);
app.get("/customers/edit/:id", customerRouter);
app.post("/customers/:id", customerRouter);
app.post("/customers/delete/:id", customerRouter);

// Orders endpoints
app.get("/orders", ordersRouter);
app.get("/orders/add", ordersRouter);
app.get('/orders/getProducts/:cat_id', ordersRouter);
app.get('/orders/getUnitPrice/:product_id', ordersRouter);
app.post('/orders', ordersRouter);
app.get('/orders/edit/:id', ordersRouter);
app.post('/orders/:id', ordersRouter);
app.post('/orders/delete/:id', ordersRouter);

// Roles
app.get('/roles', rolesRouter);
app.get('/roles/add', rolesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
