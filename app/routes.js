// all routes will be handled here

// load the todo model
var Todo = require('./models/todo.js');

// expose the routes to our app with module.exports
module.exports = function(app) {
    //-- api =============================================================================
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {
            // if there is an error retrieving, send the error. Nothing after res.send(err)
            // will execute
            if (err) {
                res.send(err);
            }
            res.json(todos); // return all todos in JSON form at
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, infomation comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function(err, todo) {
            if (err) {
                res.send(err);
            }

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err) {
                    res.send(err);
                }
                res.json(todos);
            });
        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if (err) {
                res.send(err);
            }

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err) {
                    res.send(err);
                }
                res.json(todos);
            })
        });
    });

    /////////////////////////////////////////////////////////////////////////////////////////
    // application ======================================================================= //
    /////////////////////////////////////////////////////////////////////////////////////////
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular 
        // will handle the page changes on the front-end)
    });
};
