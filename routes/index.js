var express = require('express');
var router = express.Router();
var models = require('../models');
var Promise = require('bluebird');


var promisifiedFind = function (collection){
  return new Promise (function (resolve, reject){
    collection.find(function (err, data) {
      if (err) reject(err);
      else resolve(data);
    })
  })
}
/* GET home page. */
router.get('/', function(req, res, next) {

  
  var promises = [
    promisifiedFind(models.Hotel),
    promisifiedFind(models.Restaurant),
    promisifiedFind(models.ThingToDo)
  ];
  Promise.all(promises).spread( function (hotelData, restaurantData, todoData){
    res.render('index', {hotels: hotelData, restaurants: restaurantData, todos: todoData});  
  })


});

module.exports = router;
