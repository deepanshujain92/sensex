var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/sensex', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://www.moneycontrol.com/sensex/bse/sensex-live';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var json = { sensex : "", change : "", percent : ""};
      
      $('.r_35').filter(function(){
        var data = $(this);
        json.sensex = data.children().first().text().trim();
      })
      $('.r_20').filter(function(){
        var data = $(this);
        json.change = data.children().first().text().trim();

      })
       $('.r_15 ').filter(function(){
        var data = $(this);
        json.percent = data.text();
      }) 
 
    }
    res.header("content-type","application/json");
    res.send(json);
  })
})


console.log('Magic happens on port 8081');
exports = module.exports = app;
