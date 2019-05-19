'use script';
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var database = require('./lib/database');
var ai = require('./lib/ai');

var app = express();
var mysql = new database();
app.use("/resources", express.static("resources"));
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/lib", express.static("lib"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret :  'gomoku',
    resave : true,
    saveUninitialized: false, 
    cookie : {
        maxAge : 1000*60*30, 
    }
}));
app.get('/', function (req, res) {
    res.redirect('/index.html')
});
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/room.html',function(req,res){
    if(req.session.user_id){
        res.sendFile(__dirname + '/html/room.html');
    }else{
        res.sendFile(__dirname + '/html/index.html');
    }
});

app.get('/board.html',function(req,res){
    if(req.session.user_id){
        res.sendFile(__dirname + '/html/board.html');
    }else{
        res.sendFile(__dirname + '/html/index.html');
    }
});

app.post('/get_place', bodyParser.json(), function (req, res) {
    //console.log(req.body);
    if (req.body.user_id == 0) {
        res.json(ai.next_step(req.body.place));
    }
});

app.post('/signin', bodyParser.json(), function (req, res) {
    if(req.session.user_name){
        res.send({is_success:1,user_id:req.session.user_id});
    }else{
        mysql.sign_in(req.body.name, req.body.password, function (data) {
            if(data.is_success==1){
                console.log(req.session);
                req.session.user_name=req.body.name;
                req.session.user_id=data.user_id;
            }
            res.send(data);
        });
    }
    
});

app.post('/signup', bodyParser.json(), function (req, res) {
    console.log(req.body);
    mysql.sign_up(req.body.name, req.body.password, function (data) {
        console.log(data);
        res.send(data.is_success.toString());
    });
});

var http = require('http').Server(app);
var server = app.listen(51659, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("访问地址为 http://%s:%s", host, port)

})