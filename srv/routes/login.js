const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('../db');
const secret = require('../secret');

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
  let token = '';

  let user = req.body.user;
  let pass = req.body.pass;

  // Prepare the SQL statements
  const selectUser = db.prepare(`SELECT ID AS _id, 
                                        Utilizator AS _user, 
                                        Parola AS _hashedPass, 
                                        Extra AS _salt 
                                FROM Utilizatori 
                                WHERE Utilizator = ?`);

  const selectRolId = db.prepare(`SELECT RolID AS _val
                                FROM UtilizatoriRoluri
                                WHERE UtilizatorID = ?`);

  const selectRol = db.prepare(`SELECT Denumire as _val
                              FROM Roluri
                              WHERE ID = ?`);
                              
  // Check if the username is correct and get the hashed password and the salt
  const userRow = selectUser.get(user);
  
  if (userRow && undefined !== userRow){
    const rolId = selectRolId.get(userRow._id);

    crypto.pbkdf2(pass, userRow._salt, 10000, 32, 'sha512', (err, derivedKey) => {
      if (err) {
        console.log(err);
        res.json({
          status: 'error'
        });
      }
      
      let hash = derivedKey.toString('base64');

      if(hash === userRow._hashedPass) {
        status = 'allowed';

        if (rolId && undefined !== rolId) {
          const denumireRol = selectRol.get(rolId._val);

          if (denumireRol && undefined !== denumireRol) {
            token = jwt.sign(
              {
                usr: user,
                rle: denumireRol._val,
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 30) /* expires in 30 days */
              }, 
              secret
            );
          }
        }
        //console.log('Login successful.')
      } else {
        //console.log('Login failed!')
      }

      res.json({
        status: status,
        token: token
      });
    });
  } else {
    // Send response if the user is not in the database
    res.json({
      status: status,
      token: token
    });
  }
});

router.all('/', function(req, res, next) {
  console.log('WARNING: HTTP METHOD')
  res.redirect('http://localhost:3001')
});

module.exports = router;
