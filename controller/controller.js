var express = require('express');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var Note = require('./../models/Note');
var Article = require('./../models/Article');
var request = require("request");
var router = express.Router();

// mongoose.connect('MONGODB_URI: mongodb://heroku_17pwpftc:9viqgf245um31vif855ccf182m@ds161443.mlab.com:61443/heroku_17pwpftc');
// var db = mongoose.connection;
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/articles_test");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

router.get('/',(req, res) => {
  res.render("index");
});

router.get("/index",(req,res) => {
	res.redirect("/")
});

router.get("/scrape", (req,res) => {
	var articles = [];
		//grab site to scrape from
		var url = 'http://www.echojs.com/';
		//send url request to grab site
		request(url, (error,response,body) => {
		//set cheerio to $ for jquery-like syntax
		var $ = cheerio.load(body);
		
		//get all articles from db
		Article.find({},(err,doc)=>{
			//handle error
			if (err) throw err;
			//scrape webpage for selected elements
			$("article h2").each((i,element)=>{
				//set object to hold title and link vals
				var article = {};
				article.title = $(element).find("a").text();
				article.link = $(element).find("a").attr("href");
				article.btnId = i;
				//set match to false
				var match = false;
				//for each article in db
				for(j in doc){
					if(doc[j].title === article.title){
						match = true;
						console.log(doc[j].title)
					}
				}
				if (match){
					console.log(`${article.title} already exists in database`);
				}else{
					// var entry = new Article(article);
					// entry.save((err,doc) => {
					// 	if (err) throw err;
					// 	console.log(doc);
					// });
					articles.push(article);
				}
			});

		});
		res.render("scraped",{article: articles})
	});
});

router.post("/save",(req,res) => {
	var savedArticle = req.body;
	var entry = new Article(savedArticle);
	entry.save((err,doc)=> {
		if (err) throw err;
	})
});

router.get("/articles",(req,res)=>{
	Article.find({},(err,doc)=>{
		console.log(doc)
		res.render("saved",{article: doc})
	})
});


module.exports = router;