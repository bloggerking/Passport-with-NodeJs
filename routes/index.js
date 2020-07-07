var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {    
    if (err || !user) {
      return res.redirect('/');
    } else {
      req.logIn(user, async function (err) {
        // Invalid password
        if (err) {
          return res.redirect('/');
        } else {
          res.redirect('/users');
        }
      });
    }
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout(); //passport logout method
  return res.redirect('/');
});

module.exports = router;
