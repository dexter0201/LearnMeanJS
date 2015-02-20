/**************************************************************************************
 * 
 *			This is the file where we will:
 *			- Configure our application
 *			- Connect to our database
 *			- Create our Mongoose models
 *			- Define routes for our RESTful API
 *			- Define routes for our frontend Angular application
 *			- Set the app to listen on a port so we can view it in our browser
 *
 *************************************************************************************/

 // set up ===========================================================================
 var express	= require('express');
 var app 		= express();						// create app express
 var mongoose 	= require('mongoose');				// mongoose for mobgodb
 var morgan 	= require('morgan');				// log request to the console (exprexx 4x)
 var bodyParser = require('body-parser');			// pull information from HTML POST (express 4x)
 var methodOverride = require('method-override');	// simulate DELETE and PUT (express 4x)

// configuration =====================================================================
mongoose.connect('mongodb://localhost/mean-dev');	// connect to mongoDB database

app.use(express.static(__dirname + '/public'));		// set the static files location /public/img will be /img for users
app.use(morgan('dev'));								// log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());							// parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));	// parse application/vnd.api+json as json
app.use(methodOverride());

// define model ======================================================================
var Todo = mongoose.model('Todo', {
	text: String
});

// routes ============================================================================
	//-- api =============================================================================
	app.get('/api/todos', function (req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function (err, todos) {
			// if there is an error retrieving, send the error. Nothing after res.send(err)
			// will execute
			if (err) {
				res.send(err);
			}
			res.json(todos);	// return all todos in JSON form at
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function (req, res) {

		// create a todo, infomation comes from AJAX request from Angular
		Todo.create({
			text: req.body.text,
			done: false
		}, function (err, todo) {
			if (err) {
				res.send(err);
			}

			// get and return all the todos after you create another
			Todo.find(function (err, todos) {
				if (err) {
					res.send(err);
				}
				res.json(todos);
			});
		});
	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function (req, res) {
		Todo.remove({
			_id: req.params.todo_id
		}, function (err, todo) {
			if (err) {
				res.send(err);
			}

			// get and return all the todos after you create another
			Todo.find(function (err, todos) {
				if (err) {
					res.send(err);
				}
				res.json(todos);
			})
		});
	});

// application =======================================================================
	app.get('*', function (req, res) {
		res.sendfile('./public/index.html');	// load the single view file (angular 
		// will handle the page changes on the front-end)
	});

// listen (start app with node server.js) ============================================
app.listen(8080);
console.log('App listening on port 8080');