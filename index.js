require("dotenv").config();

const { Comment } = require("./models/comment");
const express = require("express"); // express import
const cors = require("cors");
const app = express(); // app
const port = 5000;
const bodyParser = require("body-parser");
app.use(cors());
let allowedOrigins = ["*"];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log(err);
  });
app.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("hello world!!");
});

app.get("/comments", (req, response) => {
  Comment.find()
    .then((data) => response.json(data))
    .catch((error) => response.json(error));
});

app.post("/create", (req, res) => {
  const comment = new Comment(req.body);
  comment.save().then((comment) => {
    res.send({
      comment,
    });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Comment.findByIdAndRemove(id)
    .then(() => {
      res.send({ message: "Comment deleted successfully" });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
});

app.listen(port, () => console.log(`${port}포트입니다.`));
