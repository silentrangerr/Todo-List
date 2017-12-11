/**
 * Created by silentrangerr on 15/07/17.
 */

var express=require('express');
var TodoController= require('./controller/TodoController');
var app=express();
var ejs=require('ejs');

// setting template engine

app.set('view engine','ejs');

// static files

app.use(express.static('./node-js-playlist-master/public')) ; // can be used everywhere

// fire controllers

TodoController(app);

// listen to port

app.listen(7890,function () {
    console.log('You listening to port 3810');
});

