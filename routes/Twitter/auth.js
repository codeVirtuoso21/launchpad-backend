// routes/Twitter/Auth.js
const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const router = express.Router();

// Configure Passport to use Twitter strategy
passport.use(new TwitterStrategy({
    consumerKey: 'hs05K7hnxGhlmRAUohkLHISKj',
    consumerSecret: 'IyPIXaApwIKT2lKGbN3jlSOsbvVPbPx6IqifeY3ycJAgyD16cr',
    callbackURL: 'http://localhost:4000/auth/twitter/callback'
},
(token, tokenSecret, profile, done) => {
    // Here you can save the profile info to your database if needed
    return done(null, profile);
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Routes
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

router.get('/api/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ error: 'User not authenticated' });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
