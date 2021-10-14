const express = require("express");
const router = express.Router();
const connection = require("../database")
const passport = require('passport');
const videoController = require('../controllers/video-controller')
const user = require('../controllers/user')
require('../controllers/passport');

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

// video streaming
router.get('/video/:id', videoController.stream_video);
// video page
router.get('/videos/:id',videoController.videopage);

router.post('/signup',user.signupPage)

// Login with Google
router.get('/logingoogle', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), user.googlelogin);

//login with github
router.get('/logingithub', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github/callback',passport.authenticate('github', { failureRedirect: '/' }), user.githublogin);

// Login with Facebook
router.get('/loginfacebook',passport.authenticate('facebook'));
router.get('/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/' }), user.facebooklogin);

// sigup page
router.get('/signup', isLoggedIn, user.signup)

// dashboard page
router.get('/dashboard', isLoggedIn, user.dashboardpage)

// logout
router.get('/logout',user.logout)

// index page
router.get('/',user.indexpage)

module.exports = router;