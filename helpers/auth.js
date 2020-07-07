module.exports = {
    login: function (app) {
        const passport = require('passport');
        const LocalStrategy = require('passport-local').Strategy;
        app.use(passport.initialize());
        app.use(passport.session());
		passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',			
		}, function (username, password, done) {
				if(username == 'test@gmail.com' && password == 'test@123'){
                    return done(null, {
                        username:username,
                        name:"Test"
                    });
                } else {
                    return done(null, false, {
                        message: 'Invalid username or password'
                    });
                }			
			}
		));

		passport.serializeUser(function (user, done) {
            console.log('serializeUser')
			done(null, user);
		});

		passport.deserializeUser(function (user, done) {
            console.log('deserializeUser')
			done(null, user);
		});
    },
    checkAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
          return next(); //return next
        }
        //redirect to requested page
        res.redirect('/?u=' + req.originalUrl);
      },
}