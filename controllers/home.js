const { db } = require("../admin");
exports.getarticles = (req, res) => {
  const sqlSelect =
    "SELECT a.title,a.id,a.content,a.status,\
  a.date, u.firstName, u.lastName FROM articlestb a \
    join userstb u on a.authorid = u.id";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};
exports.notifications = (req, res) => {
  let status = "draft";
  const authorId = req.userId;
  const role = req.body.role;
  if (role === "admin") {
    status = "published";
  }
  let sqlSelect = "SELECT COUNT(*) as cnt FROM articlestb WHERE status=?";
  if (role === "admin") {
    sqlSelect =
      "SELECT COUNT(*) as cnt FROM articlestb WHERE status=? AND authorId=?";
  }
  db.query(sqlSelect, [status, authorId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

exports.getLevel = (req, res) => {
  const id = req.userId;
  db.query("SELECT level FROM userstb WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};
