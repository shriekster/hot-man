var express = require('express');
var router = express.Router();

/* POST */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.redirect('http://localhost:3000');
});

module.exports = router;
