const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const secretKey = process.env.ACCESS_TOKEN_SECRET ; 

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    done(null , payload )
}));

const authenticateJwt = passport.authenticate('jwt', { session: false });

function isAdmin(req , res , next ){
  
  if(req.user.role == 'admin'){

    next() ; 
  }
  else {
    const error = new Error('Unauthorized');
    error['status'] = 401;
    next(error);
  }

  
}

module.exports = { authenticateJwt  , isAdmin};