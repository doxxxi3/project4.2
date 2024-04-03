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
  res.render("index.ejs", {});
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
