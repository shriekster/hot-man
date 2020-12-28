var express = require('express');
var router = express.Router();

const crypto = require('crypto');
const db = require('../db');

let id = 0;

const timeout = 120;

let serverTime = 0;

let user = '', 
    loc = '';

const selectUser = db.prepare(`SELECT Utilizator AS _user
                              FROM Utilizatori 
                              WHERE Utilizator = ?`);

const selectLoc = db.prepare(`SELECT LocNastere AS _loc
                              FROM Utilizatori 
                              WHERE Utilizator = ?`);

function isValidPassword(pass) {
  /* at least 8 characters, with at least one character from each of the 
  * 4 character classes (alphabetic lower and upper case; numeric, symbols)
  */
  let regex = /(?=.{8,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/;

  // Whether the password conforms to the password policy or not
  return regex.test(pass);
}

function updateParola(value, username) {
  const update = db.prepare(`UPDATE Utilizatori
                            SET Parola = ?,
                                Extra = ?
                            WHERE Utilizator = ?`);

  if (isValidPassword(value)) {
    let error;

    let salt = crypto.randomBytes(12).toString('base64');

    let derived;

    try {
      derived = crypto.pbkdf2Sync(value, salt, 10000, 32, 'sha512');
    } catch (e) {
      if (e) console.log(e)
    } finally {
      if (derived) {
        let hash = derived.toString('base64');

        try {
          const info = update.run(hash, salt, username);
          //console.log('PAROLA: ', info);
        } catch(err) {
          error = err;
          console.log(err);
        } finally {

          if (error) {
            return 'unknown';
          }

          return 'valid';
        }
      }
    }
  }
  
  return 'invalid';

}

router.options('/*', function(req, res, next) {
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

  let status = 'unknown';
  let code = 0;

  if (req && req.params && req.params.id) {
    if ('user' === req.params.id) {
      if (req.body && req.body.user) {
        const usr = selectUser.get(req.body.user);

        if (usr && usr._user) {
          user = usr._user;
          status = 'allowed';
        }
      }
    } else 
    if ('loc' === req.params.id) {
      if (req.body && req.body.loc) {
        if (user){
          const lc = selectLoc.get(user);

          if (lc && lc._loc) {
            if (req.body.loc === lc._loc) {
              loc = lc._loc;
              status = 'allowed';

              serverTime = Math.floor((Date.now() + 60 * 2 * 1000) / 1000);
            }
          }
        }
      }
    } else
    if ('pass' === req.params.id) {
      console.log(req.body)
      if (req.body && req.body.newPass && req.body.time) {
        //let serverTime = Math.floor((Date.now() + 60 * 2 * 1000) / 1000);
        if (user) {
          if (serverTime - req.body.time <= timeout) { //TODO!
            status = updateParola(req.body.newPass, user)
          } else {
            status = 'expired';
          }
        }
      }
    } 
    else {

    }
  }


  res.json({
    status: status,
  })

});

router.all('/', function(req, res, next) {
  console.log('WARNING: HTTP METHOD')
  res.redirect('http://localhost:3001')
});

module.exports = router;
