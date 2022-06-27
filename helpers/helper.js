// Check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next()
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/users/login')
}

module.exports.isAuthenticated = isAuthenticated;
