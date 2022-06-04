const jwt = require("jsonwebtoken");
exports.verifyJWT = (req, res, next) => {
  const token = req.body.headers["x-access-token"];
  if (!token) {
    res.json("need a token");
  } else {
    jwt.verify(token, "darticle", (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: "you failed to authenticate",
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
