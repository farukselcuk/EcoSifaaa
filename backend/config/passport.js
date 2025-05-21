const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

// Configure Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/users/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  // Handle Google auth callback
  // Find or create user in your database
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      done(null, user);
    } else {
      // Create new user
      user = await User.create({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        // You might want to add more profile data here
      });
      done(null, user);
    }
  } catch (error) {
    done(error, false);
  }
}));

// Configure Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/api/users/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
  // Handle Facebook auth callback
  // Find or create user in your database
   try {
    let user = await User.findOne({ facebookId: profile.id });

    if (user) {
      done(null, user);
    } else {
      // Create new user
      user = await User.create({
        facebookId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value, // Facebook might not always return email
        // You might want to add more profile data here
      });
      done(null, user);
    }
  } catch (error) {
    done(error, false);
  }
}));

// Serialize and Deserialize User (for session management - optional depending on your needs)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}); 