const { db } = require("../admin");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM userstb WHERE username=?",
    [username],
    (err, result) => {
      if (err) {
        res.json({ err: err });
      }
      if (result.length > 0) {
        if (result[0].password == password) {
          const id = result[0].id;
          const token = jwt.sign({ id }, "darticle", {
            expiresIn: 30000,
          });
          req.session.user = result;
          res.json({ auth: true, token: token, result: result });
        } else {
          res.json({
            auth: false,
            message: "Wrong username/password combination",
          });
        }
      } else {
        res.json({ auth: false, message: "User doesn't exist" });
      }
    }
  );
};
exports.register = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;
  const secques = req.body.secques;
  const secans = req.body.secans;
  const level = req.body.level;
  db.query(
    "INSERT INTO userstb (firstName,lastName,username,password,secques,secans,level) VALUES (?,?,?,?,?,?,?)",
    [firstName, lastName, username, password, secques, secans, level],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
};
exports.seccheck = (req, res) => {
  const ans = req.body.secans;
  const id = req.userId;
  db.query(
    "SELECT * FROM userstb WHERE id=? AND secans=? ",
    [id, ans],
    (err, result) => {
      if (err) {
        res.json({ auth: false, err: err });
      }
      if (result.length > 0) {
        res.json({ auth: true, result: result });
      }
    }
  );
};

// exports.logincheck = (req, res) => {
//   if (req.session.user) {
//     res.json({ loggedIn: true, user: req.session.user });
//   } else {
//     res.json({ loggedIn: false });
//   }
// };
