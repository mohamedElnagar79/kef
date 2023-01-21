const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // let token = req.get("Authorization").split(" ")[1];
    let token = req.cookies.access_token;
    // console.log("token auth",req.cookies.access_token);
    let decoded = jwt.verify(token, process.env.secret);
    // console.log(decoded);

    req.role = decoded.role;
    req.id = decoded.id;
    // console.log("req role token", req.role);
    next();
  } catch (error) {
    error.message = "You are not authorized to access this resource.";
    error.status = 403;
    next(error);
  }
};
