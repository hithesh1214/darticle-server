const { db } = require("../admin");

exports.remarks = (req, res) => {
  const id = req.params.id;
  const approverId = req.userId;
  const approvedDate = new Date();
  const remarks = req.body.remarks;
  const status = remarks === "" ? "published" : "unpublished";
  const sqlUpdate =
    "Update articlestb SET status=?,remarks=?,approvedId=?,approvedDate=? WHERE id=? ";
  db.query(
    sqlUpdate,
    [status, remarks, approverId, approvedDate, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
};
exports.review = (req, res) => {
  const status = "draft";
  db.query(
    "SELECT * FROM articlestb WHERE status=?",
    [status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
};
