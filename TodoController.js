/**
 * Created by silentrangerr on 15/07/17.
 */



var bodyParser=require('body-parser');
var mongoose=require('mongoose');
// connect to database
mongoose.connect('mongodb://test:test@ds163672.mlab.com:63672/todolist',{useMongoClient : true});

// Create a schema - this is like a blueprint
var todoSchema= new mongoose.Schema({
    item: String
}); // takes object as parameter.

var Todo=mongoose.model('Todo',todoSchema);

// var itemOne=Todo({item : ' say no to Engineering! '}).save(function (err) {
//   if(err) throw  err;
//   console.log('item saved');
//
// });

//var data=[];
var urlencodedParser=bodyParser.urlencoded({extended: false});

module.exports= function (app) {

  app.get('/todo',function (req,res) {              // for url
  // get data from mongodb and pass it to the view
      Todo.find({},function (err,data) {    // {} taaki saarey item:'' waaley data ko find karle database mai.
          if (err) throw err;
          res.render('todo', {todos:data});  // data passed to view through todos.

      });


  }) ;

  app.post('/todo',urlencodedParser,function (req,res) {  //pass request to data to have access on body
// get data from the view and add it to mongodb

      var newTodo=Todo(req.body).save(function (err,data) {
          if (err) throw err;
          res.json(data);
      })

   // data.push(); // grabbing from body and adding it to the array
     // res.render('todo', {todos:data});
    // res.json(data) ; // sending data back to front end.
  });

  app.delete('/todo/:item',function (req,res) {

    // delete the requested item from mongodb
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function (err,data) {
       if (err) throw err;
       res.json(data);
    });
   // data=data.filter(function (todo) {

      //  var itemIndex = data.indexOf(data.item);
     // return  data.splice(itemIndex, 1);

    //return todo.item.replace(/ /g, '-') !== req.params.item; // if true array mai rahega. if false array sai bahar. it will match line 27 :item kai sath.
    //});
      //  res.json(data); // sending data back to front end.
  });

}