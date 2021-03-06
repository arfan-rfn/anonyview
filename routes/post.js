// Rubbal Kumar and Md Arfan Uddin
// CSC 337, Spring 2018
// Section 2
const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const objID = require('mongodb').ObjectID;


const post = express.Router({mergeParams: true});

// global var
const MONGO_URL = 'mongodb://localhost:27017/';

// get details about a post
// url: 'localhost:3000/post/$id
post.route('/:id')
    .get(function(req, res){
        res.header("Access-Control-Allow-Origin", "*");

        var id = req.params.id;

        // connect to the allpost collection in the anonyview database
        var db = null;
        var collection = null;
        MongoClient.connect(MONGO_URL, function(err, client) {
            db = client.db('anonyview');
            collection = db.collection('allpost');
            queryPost(id, collection, res);
        });
    });

    async function queryPost(id, collection, res) {
        var result = await collection.findOne({"_id": objID(id)}, function(err, data) {
            if(err){
                res.send("No data found to this id");
            }else{
                res.send(data);
            }
         });
    } 

module.exports = post;