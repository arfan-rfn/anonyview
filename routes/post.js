const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const objID = require('mongodb').ObjectID;


const post = express.Router({mergeParams: true});

// global var
const MONGO_URL = 'mongodb://localhost:27017/';

post.route('/')
    .get(function (req, res){
        res.send("hello from the post route");
    });

post.route('/:id')
    .get(function(req, res){
        res.header("Access-Control-Allow-Origin", "*");

        var id = req.params.id;

        // connect to the movies collection in the imdb database
        var db = null;
        var collection = null;
        MongoClient.connect(MONGO_URL, function(err, client) {
            db = client.db('anonyview');
            collection = db.collection('allpost');
            queryCat(id, collection, res);
        });
    });

    async function queryCat(id, collection, res) {
        var result = await collection.findOne({"_id": objID(id)}, function(err, data) {
            if(err){
                res.send("No data found to this id");
            }else{
                res.send(data);
            }
         });
    } 



    // post.route('/:id/update_rating/')
    // .get(function(req, res){
    //     res.send('got it');
    //     res.header("Access-Control-Allow-Origin", "*");

    //     var id = req.params.id;

    //     // connect to the movies collection in the imdb database
    //     var db = null;
    //     var collection = null;
    //     MongoClient.connect(MONGO_URL, function(err, client) {
    //         db = client.db('anonyview');
    //         collection = db.collection('allpost');
    //         queryCat(id, collection, res);
    //     });
    // });

    // async function queryCat(id, collection, res) {
    //     var result = await collection.findOne({"_id": objID(id)}, function(err, data) {
    //         if(err){
    //             res.send("No data found to this id");
    //         }else{
    //             res.send(data);
    //         }
    //      });
    // } 

module.exports = post;