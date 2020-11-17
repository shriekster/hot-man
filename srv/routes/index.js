var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  let options = {
    root: path.join(__dirname, 'public'),
  }

  if (req.headers['user-agent'] !== 'Hotelitary/1.0.0-beta'){
    console.log('WARNING: ACCESS');
    res.status(404).sendFile('404.html', options)
  }
  
  res.redirect('http://localhost:3000');
});

module.exports = router;
