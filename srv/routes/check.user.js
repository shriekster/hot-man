var express = require('express');
var router = express.Router();
var db = require('../db');

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

  let status = 'available';

  let user = req.body.user;

  let remember = req.body.remember;
  console.log(req.body)
  // Prepare the SQL statement
  const statement = db.prepare(`SELECT Utilizator as _user
                                where Utilizator = ?`);
  // Check if the username exists
  const row = statement.get(user);
  
  if (row && undefined != row){
    status = 'unavailable';
    // The username is not available
    res.json({
      status: status
    });
  } else {
    // Send response if the user is not in the database, i.e. the username is available
    res.json({
      status: status
    })
  }

});

router.all('/', function(req, res, next) {
  console.log('WARNING: HTTP METHOD')
  res.status(404).send();
});

module.exports = router;
