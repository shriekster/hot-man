var express = require('express');
var router = express.Router();

const authorization = require('../auth');

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../db');
const secret = require('../secret');

function isValidCNP( p_cnp ) {
  /** Verific daca CNP-ul exista deja in baza de date ... */
  // Prepare the SQL statement
  const statement = db.prepare(`SELECT CNP AS _cnp from Utilizatori
                                WHERE CNP = ?`);
  const row = statement.get(p_cnp);

  if (row && undefined !== row){
  // CNP-ul exista, deci este indisponibil
    return false;
  }

  /** ... apoi, daca nu exista, verific daca este valid */
  var i=0 , year=0 , hashResult=0 , cnp=[] , hashTable=[2,7,9,1,4,6,3,5,8,2,7,9];
  if( p_cnp.length !== 13 ) { return false; }
  for( i=0 ; i<13 ; i++ ) {
      cnp[i] = parseInt( p_cnp.charAt(i) , 10 );
      if( isNaN( cnp[i] ) ) { return false; }
      if( i < 12 ) { hashResult = hashResult + ( cnp[i] * hashTable[i] ); }
  }
  hashResult = hashResult % 11;
  if( hashResult === 10 ) { hashResult = 1; }
  year = (cnp[1]*10)+cnp[2];
  switch( cnp[0] ) {
      case 1  : case 2 : { year += 1900; } break;
      case 3  : case 4 : { year += 1800; } break;
      case 5  : case 6 : { year += 2000; } break;
      case 7  : case 8 : case 9 : { year += 2000; if( year > ( parseInt( new Date().getYear() , 10 ) - 14 ) ) { year -= 100; } } break;
      default : { return false; }
  }
  if( year < 1800 || year > 2099 ) { return false; }
  return ( cnp[12] === hashResult );
}

function isValidUsername(user) {
  // Prepare the SQL statement
  const statement = db.prepare(`SELECT Utilizator AS _user from Utilizatori
                                WHERE Utilizator = ?`);

  // Check if the username exists
  const row = statement.get(user);
  
  if (row && undefined !== row){
    // The username exists, so it is unavailable
    return false;
  }

  // The username does not exist, so it is available...
  // but it must have a letter as the first character,
  // must not contain spaces
  // and it must contain at least 3 characters
  let first = user[0];
  
  let testFirstChar = (
    (first >= 'a' && first <= 'z') || 
    (first >= 'A' && first <= 'Z')
  );

  let testSpaces = !(user.includes(' '));

  let testLength = (user.length >= 3);

  if (
    false === testFirstChar ||
    false === testSpaces ||
    false === testLength
  ) {
    return false;
  }

  return true;
}

// Nume, prenume etc.
function isValidOtherName(name) {
  let valid = false;
  let regex = /(\b[A-Z][a-z]*[\s-]*\b)+/;
  let test = regex.exec(name);

  // If the string matched by the regex matches the input string => the input string conforms to the requirements
  if (test && undefined !== test) {
    valid = (test[0] === test.input);
  }

  return valid;
}

function isValidPassword(pass) {
  /* at least 8 characters, with at least one character from each of the 
  * 4 character classes (alphabetic lower and upper case; numeric, symbols)
  */
  let regex = /(?=.{8,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/;

  // Whether the password conforms to the password policy or not
  return regex.test(pass);
}

function updateCnp(value, username) {
  const update = db.prepare(`UPDATE Utilizatori
                            SET CNP = ?
                            WHERE Utilizator = ?`);
  if (isValidCNP(value)) {
    let error;

    try {
      const info = update.run(value, username);
      console.log(info);
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
  
  return 'invalid';
}

function updateGrad(value, username) {

}

function updateNume(value, username) {

}

function updatePrenume(value, username) {

}

function updateUtilizator(value, username) {

}

function updateParola(value, username) {

}

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
router.post('/', authorization, function(req, res, next) {
  res.set({
    'Allow': 'POST',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  });

  let status = 'unknown';
  let token = 0;

  if (req.body) {
    let key = req.body.attributeName;
    let value = req.body.attributeValue;
    let username = req.body.username;

    const selectUser = db.prepare(`SELECT ID AS _id,
                                  CNP AS _cnp,
                                  Grad AS _grad,
                                  Nume AS _nume,
                                  Prenume AS _prenume,
                                  Utilizator AS _user
                                  FROM Utilizatori 
                                  WHERE Utilizator = ?`);

    const selectRolId = db.prepare(`SELECT RolID AS _val
                                  FROM UtilizatoriRoluri
                                  WHERE UtilizatorID = ?`);
  
    const selectRol = db.prepare(`SELECT Denumire as _val
                                FROM Roluri
                                WHERE ID = ?`);

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
        const rolId = selectRolId.get(userRow._id);
  
        if (rolId && undefined !== rolId) {
          const denumireRol = selectRol.get(rolId._val);
  
          if (denumireRol && undefined !== denumireRol) {
            let realUser = {
              cnp: userRow._cnp,
              grad: userRow._grad,
              nume: userRow._nume,
              prenume: userRow._prenume,
              utilizator: userRow._user,
              rol: denumireRol._val,
            };
  
            token = jwt.sign(
              {
                usr: realUser,
                rle: denumireRol._val,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) /* expires in 1 year */,
                iat: Math.floor(Date.now() / 1000),
              }, 
              secret);
          }
        }
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
