const express = require("express");

const MongoClient = require('mongodb').MongoClient;
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


app.post('/', jsonParser, function (req, res) {
    
    var titleData = req.body.title;
    var postData = req.body.post;
    var categoryData = req.body.category;

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

app.post('/update_rating', jsonParser, function (req, res) {
    
    var id = req.body.id;
    var rate = req.body.rating;

    if(id && rate){
        var db = null;
        var collection = null;
        MongoClient.connect(MONGO_URL, function(err, client) {
            db = client.db('anonyview');
            collection = db.collection('allpost');
            // collection.updateRaing(inputData, function(err, result){
            //     if(err){
            //         res.send('unable to save data to the database');
            //     }else{
            //         res.send(inputData);
            //     }
            // });
        });
    }else{
        res.send("invalid request, make sure your parse body have right params");
    }
});


async function updateRaing(collection, res, inputData) {
    // const doc = { "year" : {$in : [year, year + 1]}, "genre": { $ne :"Animation" }};
    RESULT = await collection.find().toArray();
    console.log(RESULT);
    res.send(RESULT);
}    

app.listen(3000, function(){
    console.log('Listenning from port 3000');
});
