var express = require('express');
var router = express.Router();
const crypto = require('crypto');
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

  let status = 'denied';

  let user = req.body.user;
  let pass = req.body.pass;
  let remember = req.body.remember;
  console.log(req.body)
  // Prepare the SQL statement
  const statement = db.prepare(`SELECT Utilizator as _user, Parola as _pass, 
                                Extra as _salt from Utilizatori 
                                where Utilizator = ?`);
  // Check if the username is correct and get the hashed password and the salt
  const row = statement.get(user);
  
  if (row && undefined != row){
    crypto.pbkdf2(pass, row._salt, 10000, 32, 'sha512', (err, derivedKey) => {
      if (err) throw err;

      let hash = derivedKey.toString('base64');

      if(hash === row._pass) {
        status = 'allowed';
        console.log('Login successful.')
      } else {
        console.log('Login failed!')
      }

      res.json({
        status: status
      });
    });
  } else {
    // Send response if the user is not in the database
    res.json({
      status: status
    });
  }

});

router.all('/', function(req, res, next) {
  console.log('WARNING: HTTP METHOD')
  res.redirect('http://localhost:3001')
});

module.exports = router;
