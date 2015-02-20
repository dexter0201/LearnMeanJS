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

 ////////////////////////////////////////////////////////////////////////////////////////
 // set up =========================================================================== //
 ////////////////////////////////////////////////////////////////////////////////////////
var express	= require('express');
var app 		= express();						// create app express
var mongoose 	= require('mongoose');				// mongoose for mobgodb
var morgan 	= require('morgan');				// log request to the console (exprexx 4x)
var bodyParser = require('body-parser');			// pull information from HTML POST (express 4x)
var methodOverride = require('method-override');	// simulate DELETE and PUT (express 4x)
var port 		= process.env.PORT || 8080;
var database = require('./config/database.js');		// load database file config


/////////////////////////////////////////////////////////////////////////////////////////
// configuration ===================================================================== //
/////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(database.url);	// connect to mongoDB database

app.use(express.static(__dirname + '/public'));		// set the static files location /public/img will be /img for users
app.use(morgan('dev'));								// log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());							// parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));	// parse application/vnd.api+json as json
app.use(methodOverride());

/////////////////////////////////////////////////////////////////////////////////////////
// routes ============================================================================ //
/////////////////////////////////////////////////////////////////////////////////////////
require('./app/routes')(app);

/////////////////////////////////////////////////////////////////////////////////////////
// listen (start app with node server.js) ============================================ //
/////////////////////////////////////////////////////////////////////////////////////////
app.listen(port);
console.log('App listening on port : ' + port);