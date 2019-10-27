import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import database from "../models";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: "nodeauthsecret"
};

passport.use(
  "jwt",
  new JwtStrategy(opts, function(jwt_payload, done) {
    database.Users.findByPk(jwt_payload.id)
      .then(user => {
        return done(null, user);
      })
      .catch(error => {
        return done(error, false);
      });
  })
);
