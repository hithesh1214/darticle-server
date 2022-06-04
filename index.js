const express = require("express");
// const dotenv = require("dotenv");
// dotenv.config();
// console.log(process.env.SESSION_SECRET);
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const { verifyJWT } = require("./middleware");
const { login, seccheck } = require("./controllers/authentication");
const { register } = require("./controllers/authentication");
const { getarticles, getLevel, notifications } = require("./controllers/home");
const { getDrafts, delDraft, editDraft } = require("./controllers/stories");
const { addDraft } = require("./controllers/stories");
const { review, remarks } = require("./controllers/reviews");
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "darticle",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);
//registration
app.post("/register", register);
//login and seccheck
app.post("/login", login);
app.post("/secans", verifyJWT, seccheck);
//add draft
app.post("/addDraft", verifyJWT, addDraft);

app.post("/drafts", verifyJWT, getDrafts);
app.post("/getarticles", verifyJWT, getarticles);
app.post("/deleteDraft/:id", verifyJWT, delDraft);

app.post("/editDraft/:id", verifyJWT, editDraft);

app.post("/remarks/:id", verifyJWT, remarks);

app.post("/review", verifyJWT, review);
app.post("/notifications", verifyJWT, notifications);
app.post("/getlevel", verifyJWT, getLevel);

// app.get("/auth", verifyJWT, (req, res) => {
//   res.json("done");
// });
// app.get("/login", logincheck);

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.json("session destroyed");
});

app.listen(3001, () => {
  console.log("running server");
});
