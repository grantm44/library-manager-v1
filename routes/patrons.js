var express = require('express');
var router = express.Router();
var Patron = require("../models").Patron;
var Loan = require('../models').Loan;
var Book = require('../models').Book;
//all patrons
router.get('/all', function(req, res, next){
  Patron.findAll().then(function(patrons){
    res.render('all_patrons', {patrons: patrons});
  })
});

//new patron page
router.get('/new', function(req, res, next){
  res.render('new_patron', {patron: Patron.build()});
});

router.post('/new', function(req, res, next){
  Patron.create(req.body).then(function(patron){
    res.redirect('/patrons/all');
  }).catch(function(err){
    if(err.name === "SequelizeValidationError"){
      res.render('new_patron', {
          patron: Patron.build(req.body),
          errors: err.errors
        });
    }
  })
});

router.get('/detail/:id', function(req, res, next){
  Patron.findById(req.params.id, 
    {include: [{model: Loan,
      include: [{model: Book}]}]}).then(function(patron){
        res.render('patron_detail.pug', {patron: patron});
  })
});

router.post('/detail/:id', function(req,res,next){
  Patron.findById(req.params.id).then(function(patron){
    if(patron){
      patron.update(req.body);
    }
    res.redirect('/patrons/all');
  })
});

module.exports = router;