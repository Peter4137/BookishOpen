const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

class Security {
    constructor() {
        this.passport = require('passport');
        this.opts = {};
        this.opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        this.opts.secretOrKey = 'shhh';
        this.passport.use(new JwtStrategy(this.opts, function(jwt_payload, done) {
            if (jwt_payload.userID) {
                return done(null, true);
            }else{
                return done('error', false);
            }
        }));
    }
}

module.exports = new Security();

