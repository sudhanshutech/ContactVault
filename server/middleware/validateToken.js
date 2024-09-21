/* 
This middleware is used to validate the token that is sent in the request header and verify it using the JWT_SECRET. 
If the token is valid, the user object is added to the request object and the next middleware is called. 
If the token is not valid, an error is thrown and the request is not processed further.
*/

const asynHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asynHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
      req.user = user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
});

module.exports = validateToken;
