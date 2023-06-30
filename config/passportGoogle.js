const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../models/User');
require("dotenv").config();
const crypto = require('crypto');

module.exports.passport = passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.GOOGLE_CALLBACK_URL_LOCAL,
    // callbackURL:  process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback   : true
  }, (request, accessToken, refreshToken, profile, done) => {

    User.findOne({ email: profile.emails[0].value }).exec()
    .then(user => {
            console.log(profile);
            if(user){
                //If found then set this user as req.user
                return done(null,user);
            }else{
                //If not then Create one then set it to req.user
                User.create({
                        name : profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    })
                .then(user => { return done(null,user); })
                .catch (err => {
                    console.log('error in google stratergy-passport',err); 
                    return done();
              });
    }})
    .catch(err => {
        console.log('error in google stratergy-passport', err); 
        return done();
    });


    // User.findOrCreate({ googleId: user.id }, (err, user) => {
    //   if(err){
    //     return done(err, user);
    //   }else{
    //     return done(null, user)
    //   }
    // });
  }
));

