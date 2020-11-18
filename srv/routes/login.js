var express = require('express');
var router = express.Router();

router.options('/', function(req, res, next) {
  res.set({
    'Allow': 'OPTIONS',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Accept-Encoding, Origin'
  })
  .status(200)
  .send();
});

/* POST */
router.post('/', function(req, res, next) {
  res.set({
    'Allow': 'POST',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });

  let status = 'denied';
  if (req.body.user === 'test' && req.body.pass === 'test') {
    status = 'allowed';
  }
  
  res.json({
    status: status
  });
});

//router.all('/', function(req, res, next) {
//  res.redirect('http://localhost:3001')
//});

module.exports = router;
