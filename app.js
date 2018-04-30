const express = require("express");

const MongoClient = require('mongodb').MongoClient;
const objID = require('mongodb').ObjectID;
const router = express.Router();

const app = express();


// global var
const MONGO_URL = 'mongodb://localhost:27017/';

// all routes init
const post = require('./routes/post');
const update = require('./routes/update');


// use all routes
app.use(express.static('public'));
app.use('/post', post);
app.use('/update', update);

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


// add a new post to the database
// url: 'localhost:333'
// body-parser perams: @title title of the post
//                      @post contant of the post
//                      @category category of the post
// return new post details
app.post('/', jsonParser, function (req, res) {
    var titleData = req.body.title;
    var postData = req.body.post;
    var categoryData = req.body.category;

    // connect to the allpost collection in the anonyview database
    if(titleData && postData && categoryData){
        var inputData = {
            title: titleData,
            post: postData,
            category: categoryData,
            date: new Date(),
            rating: 0,
            comment:[]
        };
        var db = null;
        var collection = null;
        MongoClient.connect(MONGO_URL, function(err, client) {
            db = client.db('anonyview');
            collection = db.collection('allpost');
            collection.insertOne(inputData, function(err, result){
                if(err){
                    res.send('unable to save data to the database');
                }else{
                    res.send(inputData);
                }
            });
        });
    }else{
        res.send("invalid request, make sure your parse body have right params");
    }
});


// update the rating of a post when user rate any
// url: 'localhost:333/update_rating/'
// body-parser perams: @id id of the post
//                      @rating the new rating value user provided
// return new rating value
// make sure to update the new rating to the page
app.post('/update_rating', jsonParser, function (req, res) {

    // find them from the body parser
    var id = req.body.id;
    var rate = req.body.rating;

    if(id && rate){
        // connect to the allpost collection in the anonyview database
        var db = null;
        var collection = null;
        MongoClient.connect(MONGO_URL, function(err, client) {
            db = client.db('anonyview');
            collection = db.collection('allpost');
            updateRaing(id, rate, collection, res);
        });
    }else{
        res.send("invalid request, make sure your parse body have right params");
    }
});


async function updateRaing(id, rate, collection, res) {
    var myQuery = {"_id": objID(id)};
    var newValues = { $inc: {rating: parseInt(rate)} };

    var result = await collection.updateOne(myQuery, newValues, function(err, data) {
        if(err){
            res.send("No data found to this id");
        }else{
            res.send(rate);
        }
     });
}   

// add a new comment to a post
// url: 'localhost:333/update_comment'
// body-parser perams: @id id of the post
//                      @comment comment content
// res.sent the new comment contant
app.post('/update_comment', jsonParser, function (req, res) {
    // find them from the body parser
    var id = req.body.id;
    var comment = req.body.comment;

    if(id && comment){
        // connect to the allpost collection in the anonyview database
        var db = null;
        var collection = null;
        MongoClient.connect(MONGO_URL, function(err, client) {
            db = client.db('anonyview');
            collection = db.collection('allpost');
            updateComment(id, comment, collection, res);
        });
    }else{
        res.send("invalid request, make sure your parse body have right params");
    }
});


async function updateComment(id, newComment, collection, res) {
    var myQuery = {"_id": objID(id)};
    var newValues = { $push: {comment: newComment} };

    var result = await collection.updateOne(myQuery, newValues, function(err, data) {
        if(err){
            res.send("No data found to this id");
        }else{
            res.send(comment);
        }
     });
}   

app.listen(3000, function(){
    console.log('Listenning from port 3000')
});
