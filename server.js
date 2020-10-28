//Budget API
const mongoose = require("mongoose");
const budgetModel = require("./budget_schema");

const express = require("express");
const cors = require("cors");
const budget_Schema = require("./budget_schema");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let url = "mongodb://localhost:27017/budget";

app.get("/budget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to the database for budget ");
      budgetModel
        .find({})
        .then((data) => {
          res.send(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    });
});

app.post("/insert", (req, res) => {
  mongoose.connect(
    url,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );
  console.log(req.body);
  budgetModel
    .insertMany(req.body)
    .then((data) => {
        res.send("Insertion completed");
      mongoose.connection.close();
    })
    .catch((connectionError) => {
      console.log(connectionError);
    });
});

// const budget = {
//   myBudget: [
//     {
//        title: 'Eat out',
//        budget: 25
//     },
//     {
//        title: 'Rent',
//        budget: 375
//     },
//     {
//        title: 'Grocery',
//        budget: 110
//     },
//     ]
// };

// app.get('/budget', (req, res) => {
//     res.sendFile('budget.json', {root: __dirname});
// });

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
