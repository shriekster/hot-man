var express = require('express');
var router = express.Router();

router.options('/', function(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.send('test')
});

/* POST */
router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({
    status: 'YES'
  })
});

//router.all('/', function(req, res, next) {
//  res.redirect('http://localhost:3001')
//});

module.exports = router;
