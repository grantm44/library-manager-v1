var express = require('express');
var router = express.Router();
var Patron = require("../models").Patron;

//all patrons
router.get('/all', function(req, res, next){
  Patron.findAll().then(function(patrons){
    console.log(patrons);
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
  }).catch(function(error){
    console.log(error);
  })
});

module.exports = router;