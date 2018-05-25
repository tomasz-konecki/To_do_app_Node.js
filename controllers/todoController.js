var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Conect to the database
mongoose.connect("mongodb://test:test@ds119150.mlab.com:19150/todo");

//Conect a schema (a blueprint)
var todoSchema = new mongoose.Schema({
  item: String
});

//model (stored as a collection named 'Todo' in mongoDB)
var Todo = mongoose.model("Todo", todoSchema);

var itemOne = Todo({ item: "buy flowers" }).save(function(err) {
  if (err) throw err;
  console.log("Item saved");
});

// var data = [
//   { item: "get milk" },
//   { item: "walk dog" },
//   { item: "kick some coding ass" }
// ];

module.exports = function(app) {
  app.get("/todo", function(req, res) {
    //get data frm mongodb and pass it to view
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, function(req, res) {
    console.log(req.body);
    data.push(req.body);
    res.json(data);
  });

  app.delete("/todo/:item", function(req, res) {
    data = data.filter(function(todo) {
      return todo.item.replace(/\s/g, "") !== req.params.item;
    });
    res.json(data);
  });
};
