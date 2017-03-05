var express = require('express');
var router = express.Router();
var Book = require("../models").Book;
var Loan = require('../models').Loan;
var Patron = require('../models').Patron;
var moment = require('moment');

router.get('/new', function(req, res, next){
  //
  res.render("new_book", {book: Book.build()});
});

router.post('/new', function(req,res,next){
  Book.create(req.body).then(function(book){
    //console.log(book);
    res.redirect("/books/all");
  }).catch(function(err){
    if(err.name === 'SequelizeValidationError'){
      res.render('new_book', {
        book: Book.build(req.body),
        errors: err.errors
      });
    }
  });
});

router.get('/details/:id', function(req,res,next){
  Book.findById(req.params.id, 
    {include: [{model: Loan, include: [{model: Patron}] }]}).then(function(data){
        res.render('book_details', {data: data, title: data.title});
      })
  });

router.get('/overdue', function(req,res,next){
  var date = moment().format('YYYY-MM-DD');
  Loan.findAll({
    include: Book,
    where: 
      {return_by: {$lt: date},
      returned_on: null}}).then(function(data){
        res.render('overdue_books', {data: data});
      })
});

router.get('/checked_out', function(req, res, next){
  Loan.findAll({
    include: Book,
    where: {returned_on: null}
  }).then(function(data){
    res.render('checked_out', {data: data});
  })
});
  
module.exports = router;

