const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

const Entry = require('./models/entry');

mongoose.connect('mongodb+srv://rosscleary:1MlhvekIJ4jorhS8@cluster0.8boav.mongodb.net/node-angular?retryWrites=true&w=majority');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const entry = new Entry({
    locationcode: req.body.locationcode,
    fullname: req.body.fullname,
    phonenumber: req.body.phonenumber,
    date: req.body.date,
  });
  entry.save();
  res.status(201).json({
    message: 'Entry added successfully!'
  })
});

app.get("/api/posts", (req, res, next) => {
  Entry.find().then(documents => {
    res.status(200).json({
      message: "Entries fetched successfully!",
      entries: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Entry.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!"})
  });
});

module.exports = app;
