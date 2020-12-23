var express = require('express');
var router = express.Router();

const authorization = require('../auth');

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../db');
const secret = require('../secret');

router.options('/:id', function(req, res, next) {
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
router.post('/:id', function(req, res, next) {
  res.set({
    'Allow': 'POST',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  });

  console.log(req.body)
  console.log(req.params)


  const selectUser = db.prepare(`SELECT ID AS _id,
                                LocNastere AS _loc,
                                Grad AS _grad,
                                Nume AS _nume,
                                Prenume AS _prenume,
                                Utilizator AS _user
                                FROM Utilizatori 
                                WHERE Utilizator = ?`);

  let status = 'unknown';
  let token;

  if (req.body) {
    let key = req.body.attributeName;
    let value = req.body.attributeValue;
    let username = req.body.username;

    token = req.body.token;

    switch (key) {
      case 'cnp': {
        status = updateCnp(value, username);
        break;
      }

      case 'grad': {
        status = updateGrad(value, username);
        break;
      }

      case 'nume': {
        status = updateNume(value, username);
        break;
      }

      case 'prenume': {
        status = updatePrenume(value, username);
        break;
      }

      case 'utilizator': {
        status = updateUtilizator(value, username);
        if ('valid' === status) {
          username = value;
        }
        break;
      }

      case 'parola': {
        status = updateParola(value, username);
        break;
      }
    }

    if ('valid' === status) {
      const userRow = selectUser.get(username);
      
      if (userRow) {
        token = jwt.sign(
          {
            usr: username,
            loc: userRow._loc,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) /* expires in 1 year */,
            iat: Math.floor(Date.now() / 1000),
          }, 
          secret);
      }
    }
  }

  res.json({
    status: status,
    token: token,
  })

});

router.all('/', function(req, res, next) {
  console.log('WARNING: HTTP METHOD')
  res.redirect('http://localhost:3001')
});

module.exports = router;
