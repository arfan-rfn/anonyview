const express = require('express');
const MongoClient = require('mongodb').MongoClient;


const updateRouter = express.Router({mergeParams: true});


// global var
const MONGO_URL = 'mongodb://localhost:27017/';

updateRouter.route('/cat/:catname')
    .get(function(req, res){
        res.header("Access-Control-Allow-Origin", "*");

        var category = req.params.catname;

        // connect to the movies collection in the imdb database
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
        console.log(result);
        res.send(result);
    } 

updateRouter.route('/recent')
    .get(function(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        
        // connect to the movies collection in the imdb database
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
        console.log(result);
        res.send(result);
        } 

updateRouter.route('/all')
    .get(function(req, res){
        res.header("Access-Control-Allow-Origin", "*");

        // connect to the movies collection in the imdb database
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
        console.log(result);
        res.send(result);
    } 

module.exports = updateRouter;
