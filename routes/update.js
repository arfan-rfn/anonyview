// Rubbal Kumar and Md Arfan Uddin
// CSC 337, Spring 2018
// Section 2

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const updateRouter = express.Router({mergeParams: true});

// global var
const MONGO_URL = 'mongodb://localhost:27017/';


// get all the post list in a same category
// url: 'localhost:3000/update/cat/$category_name'
updateRouter.route('/cat/:catname')
    .get(function(req, res){
        res.header("Access-Control-Allow-Origin", "*");

        var category = req.params.catname;

        // connect to the allpost collection in the anonyview database
        var db = null;
        var collection = null;
        MongoClient.connect(MONGO_URL, function(err, client) {
            db = client.db('anonyview');
            collection = db.collection('allpost');
            queryCat(category, collection, res);
        });
    });

    async function queryCat(category, collection, res) {
        const doc = { "category": { $eq :category}};
        var mysort = {rating: -1};
        var result = await collection.find(doc).sort(mysort).toArray();
        // console.log(result);
        res.send(result);
    } 

// get all the post list sorted by time (recent post)
// url: 'localhost:3000/update/recent'
updateRouter.route('/recent')
    .get(function(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        
        // connect to the allpost collection in the anonyview database
        var db = null;
        var collection = null;
        MongoClient.connect(MONGO_URL, function(err, client) {
            db = client.db('anonyview');
            collection = db.collection('allpost');
            queryRecent(collection, res);
        });
    });

    async function queryRecent(collection, res) {
        var mysort = { date: -1, rating: -1};
        var result = await collection.find().sort(mysort).toArray();
        // console.log(result);
        res.send(result);
        } 

// get all the post based on the rating value
// url: 'localhost:3000/update/all
updateRouter.route('/all')
    .get(function(req, res){
        res.header("Access-Control-Allow-Origin", "*");

        // connect to the allpost collection in the anonyview database
        var db = null;
        var collection = null;
        MongoClient.connect(MONGO_URL, function(err, client) {
            db = client.db('anonyview');
            collection = db.collection('allpost');
            queryAll(collection, res);
        });
    });

    async function queryAll(collection, res) {
        var mysort = {rating: -1};
        var result = await collection.find().sort(mysort).toArray();
        // console.log(result);
        res.send(result);
    } 

module.exports = updateRouter;
