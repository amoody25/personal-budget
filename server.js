//Budget API
const mongoose = require('mongoose');
const budgetModel = require("./budget_schema");

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let url = 'mongodb://localhost:27017/budget';

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true })
            .then(() => {
                console.log("Connected to the database for budget ");
                budgetModel.find({})
                           .then((data) => {
                               res.send(data);
                               mongoose.connection.close();
                           })
                           .catch((connectionError) => {
                               console.log(connectionError);
                           })
            });
});
app.get('/update', (req, res, document) => {
    mongoose.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true })
            .then(() => {
                console.log("Connected to the database for upsertion")
                let newData = {$set: {id: idVar, value: valueVar}};;
                budgetModel.updateOne({id: idVar, newData})
                           .then((data) => {
                               console.log(data);
                               mongoose.connection.close();
                           })
                           .catch((connectionError) => {
                               console.log(connectionError);
                           })
            });

})

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