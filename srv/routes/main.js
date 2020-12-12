var express = require('express');
var router = express.Router();

const authorization = require('../auth');

var setariRouter = require('./setari');
var administrareRouter = require('./administrare');

/** Setarile utilizatorului */
router.use('/setari', setariRouter);

/** Celelalte elemente din meniul principal */
router.use('/administrare', administrareRouter);


router.options('/', function(req, res, next) {
  res.set({
    'Allow': 'OPTIONS',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Accept-Encoding, Origin'
  })
  .status(200)
  .send();
});


/* POST */
router.post('/', authorization, function(req, res, next, err) {
  res.set({
    'Allow': 'POST',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });

  if (err) {
    console.log(err)
  }

  res.json({
    hotel: 'hotel'
  })
});

router.all('/', function(req, res, next) {
  console.log('WARNING: HTTP METHOD')
  res.redirect('http://localhost:3001')
});

module.exports = router;
