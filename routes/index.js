var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

router.param('todo', function(req, res, next, id) {
	var query = Todo.findById(id);
	console.log("Query test: ");
	query.exec(function(err, todo) {
		if(err) {return next(err);}

		req.todo = todo;
		return next();
	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  console.log("Request for index");
});

/*GET all todos*/
router.get('/todos', function(req, res, next) {
	Todo.find(function(err, todos) {
		if(err) {return next(err);}

		res.json(todos);
	});
});

/*Create a todo*/
router.post('/todos', function(req, res, next) {
	var todo = new Todo(req.body);
	todo.save(function(err, todo) {
		if(err) {return next(err);}

		res.json(todo);
	});
});

/*Delete a todo*/
router.delete('/todos/:todo', function(req, res, next) {
	console.log("Entered delete request");
	console.log("Test");
	console.log("Todo id:" + req.todo._id);
	Todo.remove({_id: req.todo._id}, function(err) {
		if(err) {
			console.log(err);
			return next(err);
		}

		return res.json(req.todo);
	});
});
module.exports = router;
