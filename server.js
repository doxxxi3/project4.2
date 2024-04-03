const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const nedb = require("@seald-io/nedb");
let database = new nedb({
  filename: "database.txt",
  autoload: true,
});

const upload = multer({
  dest: "public/uploads",
});

const app = express();
let urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(express.static("public"));
app.use(urlencodedParser);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let query = {};
  let sortQuery = { timestamp: -1 };

  database
    .find(query)
    .sort(sortQuery)
    .exec((err, data) => {
      res.render("index.ejs", { posts: data });
    });
});

app.post("/upload", upload.single("file"), (req, res) => {
  //in the section take the data from request and save it to the database
  console.log(req.body);
  let currDate = new Date();

  let data = {
    title: req.body.title,
    summary: req.body.summary,
    date: currDate.toLocaleString(),
    timestamp: currDate.getTime(),
  };

  database.insert(data, (err, newData) => {
    console.log(newData);
    res.redirect("/");
  });
});

app.get("/article/:id", (req, res) => {
  let id = req.params.id;

  let query = { _id: id };

  database.findOne(query, (err, individualPost) => {
    res.render("articles.ejs", { post: individualPost });
  });
});

app.get("/submit", (req, res) => {
  res.render("submit.ejs", {});
});

app.get("/articles", (req, res) => {
  res.render("articles.ejs", {});
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
