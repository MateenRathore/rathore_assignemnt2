const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: '704546380148-gfqr210hhkcohp74fmehfqh93lvh7a4c.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile);
  }
));

passport.use(new GitHubStrategy({
    clientID: '2e6b755b331dec5d7caa',
    clientSecret: '74f22bf4eaac41275515712e9ea500fa2af7a6dc',
    callbackURL: 'http://localhost:3000/github/callback',
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    done(null, profile);
  }
));

passport.use(new FacebookStrategy({
  clientID: '227573446071320',
  clientSecret: '3434f95aa57317812b7f9335c58cecae',
  callbackURL: 'http://localhost:3000/facebook/callback',
},
function (accessToken, refreshToken, profile, done) {
  console.log(profile);
  done(null, profile);
}
));

