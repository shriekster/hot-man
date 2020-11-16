var express = require('express');
var router = express.Router();

router.options('/', function(req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.send('')
});

/* POST */
router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log (req.query)
  res.json({
    status: 'YES'
  })
});

module.exports = router;
