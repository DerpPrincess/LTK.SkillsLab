require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const isLocal = true;
const mongoose = require("mongoose");
const schema = mongoose.Schema;

app.use(express.json());

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

app.get("/api/v1/ltk/all", (req, res) => {
  userData.find({}).then((data) => {
    res.json(data);
  });
});

app.get("/api/v1/ltk/:id", (req, res) => {
  const { id } = req.params;

  userData.find({ loanId: id }).then((data) => {
    res.json(data);
  });
});

app.post("/api/v1/ltk/:loanId", (req, res) => {
  const { loanId } = req.params;
  const { borrowers } = req.body;

  const newUserData = new userData({
    loanId,
    borrowers,
  });

  newUserData.save().then(res.json(newUserData));
});

app.patch("/api/v1/ltk/:loanId", (req, res) => {
  const { loanId } = req.params;
  const { borrowers } = req.body;

  userData
    .findOneAndUpdate({ loanId }, { borrowers })
    .then(res.json(`Loan borrower by loanId:${loanId} was updated`));
});

app.delete("/api/v1/ltk/deleteBorrower/:loanId/:pairId", (req, res) => {
  const { loanId, pairId } = req.params;
  const { borrowers } = req.body;

  userData.find({ loanId }).then((data) => {
    const borrower = data[0].borrowers.filter((borrower) => {
      borrower.pairId !== Number(pairId);
    });

    userData
      .findOneAndUpdate({ loanId }, { borrowers: borrower })
      .then(res.json(`Borrower:${pairId} was deleted`));
  });
});

app.delete("/api/v1/ltk/deleteLoan/:loanId", async (req, res) => {
  const { loanId } = req.params;

  userData.find({ loanId }).then(() => {
    userData
      .deleteMany({ loanId })
      .then(res.json(`Loan:${loanId} was deleted`));
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
