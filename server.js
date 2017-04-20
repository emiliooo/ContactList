var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('persons',['persons']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/persons',function(req,res){
    console.log('otrzymalem /received a get request');
    db.persons.find(function(err,docs){
        console.log(docs);
        res.json(docs)
    })
});

app.post('/persons',function(req,res){
    console.log(req.body);
    db.persons.insert(req.body,function(err,doc){
        res.json(doc)
    });
});

app.delete('/persons/:id',function(req,res){
    var id = req.params.id;
    db.persons.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/persons/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.persons.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});


app.listen(3000);
console.log('working...');