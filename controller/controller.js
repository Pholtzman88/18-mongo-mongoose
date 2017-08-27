var express = require('express');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var Note = require('./../models/Note');
var Article = require('./../models/Article');
var request = require("request");
var router = express.Router();


mongoose.connect('MONGODB_URI: mongodb://heroku_17pwpftc:9viqgf245um31vif855ccf182m@ds161443.mlab.com:61443/heroku_17pwpftc');
var db = mongoose.connection;

router.get('/',(req, res) => {
  res.render("index");
});

router.get("/index",(req,res) => {
	res.redirect("/")
});

router.get("/scrape", (req,res) => {

		var url = 'http://www.echojs.com/';
		request(url, (error,response,body) => {
		var $ = cheerio.load(body);
		var scrapeResults = [];
		$("article h2").each((i,element)=>{
			var article = {};
			article.title = $(element).find("a").text();
			article.link = $(element).find("a").attr("href");
			scrapeResults.push(article);
		});
		var entries = [];
		Article.find({},(err,doc)=>{
			if (err) throw err;
			for(i in scrapeResults){
				if (scrapeResults[i] !== docs[i]){
					entries.push(results[i])
				}
			}
			console.log(entries)

		});

	});
		res.redirect("/")
});







module.exports = router;