// Allison Obourn
// CSC 337, Spring 2018
// Lecture 28

// server that accepts a post request from the client and saves the 
// text the client sends at the bottom of the comments file and sends 
// back a confirmation that it was successful

const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static('public'));

// so that we can run on the localhost without errors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// allows us to access prameters easily
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.post('/', jsonParser, function (req, res) {
	res.send("Thank you for submitting the following comment: ");
})

app.listen(3000);