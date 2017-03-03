var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
 
router.get('/all', function(req, res, next){
  Book.findAll().then(function(books){
    console.log(books);
    res.render("all_books", {books: books, title: 'Books'});
  }).catch(function(error){
    console.log(error);
  });
});

module.exports = router;