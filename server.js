// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var fs = require('fs');
var friendslist = require('./data/friendslist.json');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

// Routes
// ============================================================= 
// require("./routing/apiRoutes.js");
// require("./routing/htmlRoutes.js");

	app.get('/', function (req, res) {
	    res.render("home");
	});

	app.get('/survey', function (req, res) {
	    res.render("survey");
	});

	// this is dependent on body parser to work
	app.get('/api/friends', function(req, res) {
	  res.json(friendslist);
	});
	app.post('/api/friends', function(req, res) {
		fs.writeFile("data/friendslist.json", JSON.stringify(friendslist), 'utf8', function(err) {
		    if (err) {
		      console.log(err);
		    }
  		});
	  	res.json(friendslist);
	});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
