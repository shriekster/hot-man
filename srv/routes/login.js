const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('../db');

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
  let remember = req.body.remember;

  // Prepare the SQL statement
  const selectUser = db.prepare(`SELECT ID AS _id, 
                                        Utilizator AS _user, 
                                        Parola AS _pass, 
                                        Extra AS _salt 
                                FROM Utilizatori 
                                WHERE Utilizator = ?`);
  const selectRolId = db.prepare(`SELECT RolID AS _rolId
                                FROM UtilizatoriROluri
                                WHERE UtilizatorID = ?`);

  const selectRol = db.prepare(`SELECT Denumire as _rol
                              FROM Roluri
                              WHERE ID = ?`);
  // Check if the username is correct and get the hashed password and the salt
  const usr = selectUser.get(user);
  
  if (usr && undefined !== usr){
    const rolId = selectRolId.get(usr._id);

    crypto.pbkdf2(pass, usr._salt, 10000, 32, 'sha512', (err, derivedKey) => {
      if (err) {
        console.log(err);
        res.json({
          status: 'error'
        });
      }
      
      let hash = derivedKey.toString('base64');

      if(hash === usr._pass) {
        status = 'allowed';

        if (rolId && undefined !== rolId) {
          const rolDen = selectRol.get(rolId._rolId);

          if (rolDen && undefined !== rolDen) {
            let secret = crypto.randomBytes(32).toString('base64');

            if ('yes' === remember){
              token = jwt.sign({
                usr: user,
                rol: rolDen._rol,
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 30) /* expires in 30 days */
              }, secret);

              // TODO: store the secret in the database when the user selects 'remember me'
              // TODO: access tokens, refresh tokens, token expiry
            } else {
              token = jwt.sign({
                usr: user,
                rol: rolDen._rol,
                exp: Math.floor(Date.now() / 1000) + (24 * 60) /* expires in 1 day */
              }, secret);
            }

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
