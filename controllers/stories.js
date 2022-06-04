const { db } = require("../admin");
exports.addDraft = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const authorId = req.userId;
  const role = req.body.role;
  const date = new Date();
  const status = role === "super_admin" ? "published" : "unpublished";
  db.query(
    "INSERT INTO articlestb (title,authorId,content,status,date) VALUES (?,?,?,?,?)",
    [title, authorId, content, status, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
};
exports.getDrafts = (req, res) => {
  const userId = req.userId;
  const sqlSelect =
    "SELECT a.title,a.id,a.content,a.status,\
  a.date, u.firstName, u.lastName FROM articlestb a \
    join userstb u on a.authorId = u.id WHERE u.id=?";
  db.query(sqlSelect, [userId], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
};
exports.delDraft = (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM articlestb WHERE id=?";
  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};
exports.editDraft = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  const date = new Date();
  const status = "draft";
  const sqlUpdate =
    "UPDATE articlestb SET title=?,content=?,date=?,status=? WHERE id=?";
  db.query(sqlUpdate, [title, content, date, status, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};
