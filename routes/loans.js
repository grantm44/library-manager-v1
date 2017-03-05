var express = require('express');
var router = express.Router();
var Loan = require("../models").Loan;
var Book = require("../models").Book;
var Patron = require("../models").Patron;
var parse = require('body-parser');
var moment = require('moment');
//all loans
router.get('/all', function(req, res, next){
  Loan.findAll({include: [Book, Patron]}).then(function(loans){
    console.log(loans);
    res.render('loans', {loans: loans, title: 'Loans'});
  }).catch(function(err){
    console.log(err);
  });
});

//new loan page
router.get('/new', function(req,res,next){
  Book.findAll().then(function(books){
    Patron.findAll().then(function(patrons){
      var data = {
        books : books,
        patrons : patrons
      }
      res.render('new_loan', {data: data, loan: Loan.build()});
    });
  });
});
  
  //save loan in database
  router.post('/new', function(req, res, next){
    Loan.create(req.body).then(function(loan){
      //console.log(loan);
    }).catch(function(err){
      if(err.name === 'SequelizeValidationError'){
        Book.findAll().then(function(books){
          Patron.findAll().then(function(patrons){
            var data = {
              books : books,
              patrons : patrons
            }
            res.render('new_loan', {
              data: data, 
              errors: err.errors,
              loan: Loan.build()});
          });
        });
      }
    });
  });
  
  //return a book page
  router.get('/return/:id', function(req,res,next){
    Loan.findById(req.params.id).then(function(loan){
      Book.findById(loan.book_id).then(function(book){
        Patron.findById(loan.patron_id).then(function(patron){
          var data = {
            loan : loan,
            book : book,
            patron : patron
          }
          res.render('return_book', {data : data});
        })
      })
    })
  });
  //save/update book as returned
  router.post('/return/:id', function(req, res, next){
    Loan.findById(req.params.id).then(function(loan){
      console.log(req.body);
      loan.update({returned_on: req.body.date});
      res.redirect('/loans/all');
    })
  });

//show checked out books and loan info
router.get('/checked_out', function(req, res, next){
  Loan.findAll({
    include: [Patron, Book],
    where: {returned_on: null}}).then(function(data){
      console.log(data);
      res.render('checked_out_loans', {data: data});
    })
});

//show overdue books and loan info
router.get('/overdue', function(req, res, next){
  var date = moment().format('YYYY-MM-DD');
  Loan.findAll({
    include: [Patron, Book],
    where: {return_by: {$lt: date}}
  }).then(function(data){
    console.log(data);
    res.render('overdue_loans', {data: data});
  })
});

module.exports = router;