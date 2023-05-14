require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const isLocal = true;
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    loanId: Number,
    borrowers: [
      {
        pairId: Number,
        firstName: String,
        lastName: String,
        phone: String,
      },
    ],
  },
  { collection: "userData" }
);

const userData = mongoose.model("userData", userSchema);

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//check connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected to mongoDB"));

app.get("/", (req, res) => {
  res.json({
    message: "✨ 👋🌏 ✨",
    stage: process.env.NODE_ENV,
  });
});

app.get("/ping", (req, res) => {
  res.json({
    message: "🏓",
  });
});

if (isLocal) {
  //local host
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} else {
  //for lambda export
  module.exports = app;
}
