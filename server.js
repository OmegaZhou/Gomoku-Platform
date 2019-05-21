'use script';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var http=require('http').Server(app);
var io=require('socket.io')(http);
var database = require('./lib/database');
var ai = require('./lib/ai');


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
    if(req.session.user_id){
        res.sendFile(__dirname + '/html/room.html');
    }else{
        res.sendFile(__dirname + '/html/index.html');
    }
});
app.get('/index.html', function (req, res) {
    if(req.session.user_id){
        res.sendFile(__dirname + '/html/room.html');
    }else{
        res.sendFile(__dirname + '/html/index.html');
    }
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
    console.log('signup');
    mysql.sign_up(req.body.name, req.body.password, function (data) {
        console.log(data);
        res.send(data.is_success.toString());
    });
});

var room=new Map();
app.post('/create_room',bodyParser.json(), function (req, res){
    console.log('create_room');
    if(req.session.user_id){
        for(var i=0;i<1000;++i){
            if(room.has(i)){
                continue;
            }else{
                if(req.body.color=='black'){
                    room.set(i,{black:req.session.user_name,white:''});
                }else{
                    room.set(i,{white:req.session.user_name,black:''});
                }
                res.send(i.toString());
                break;
            }
        }
    }else{
        res.send('-1');
    }
});

app.post('/get_room',function(req,res){
    var temp=new Array();
    for(var i of room){
        temp.push({room_id:i[0],room_info:i[1]});
    }
    res.send(temp);
});

var room_to_socket=new Map();
var socket_to_room=new Map();
io.sockets.on('connection',function(socket){
    console.log(socket.id);
    socket.on('room_info',function(data){

    });
    socket.on('disconnect',function(){
        console.log('User disconnected');
    });
});

http.listen(51659, function () {
    var host = http.address().address;
    var port = http.address().port;
    console.log("访问地址为 http://%s:%s", host, port)

})