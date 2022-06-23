const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

// Setting up passport using LocalStrategy
module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    passport.use(new LocalStrategy(
        (username, password, done) => {
            User.findOne({
                where: {
                    'username': username
                }
            }).then((user) => {
                if (user == null) {
                    return done(null, false, {message: 'Incorrect credentials.'});
                }

                var hashedPassword = bcrypt.hashSync(password, user.salt);

                if (user.password === hashedPassword) {
                    return done(null, user);
                }

                return done(null, false, {message: 'Incorrect credentials.'});
            })
        }
    ))

    /* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 *
 * Since every request to the app needs the user ID and username, in order to
 * go to dashboard and render the user element in the navigation bar, that
 * information is stored in the session.
 */
    passport.serializeUser((user, done) => {
        done(null, user.id, user.username);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
            where: {
                'id': id
            }
        }).then((user) => {
            if (user == null) {
                done(new Error('Wrong user id.'));
            }

            done(null, user)
        });
    });
};