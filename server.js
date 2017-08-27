
//require express
var express = require("express");
//require body parser
var bodyParser = require("body-parser");
//require express handlebars engine
var exphbs = require("express-handlebars");
//set up express
var app = express();
//try to use port 8080 if available
var PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//set up app to use express to server static files in public directory
app.use(express.static(__dirname + "/public"));

//set up express handlebars engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//require router or controller
var routes = require("./controller/controller.js");
//use routes from router in controller
app.use("/",routes)

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});