const authRoutes = require('./auth/auth');
const groupsRoutes = require('./groups/groups');

const init = () => {
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const methodOverride = require('method-override');
  const flash = require('connect-flash');
  const passport = require('passport');
  const LocalStratetry = require('passport-local');
  const User = require('../models/user');
  const middleware = require('../middleware');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set('view engine', 'ejs');
  app.use(require('express-session')({
    secret: 'Huynh Quoc Dung :v',
    resave: true,
    saveUninitialized: false,
  }));

  app.use(methodOverride('_method'));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStratetry(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
  });


  app.use(authRoutes);
  app.use('/groups', middleware.isLoggedIn, groupsRoutes);
  app.use(express.static('public'));
  app.listen(3000, function () {
    console.log('Listening to port 3000');
});

};

module.exports = {
  init: init,
};