var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const db = require('../db');

function isValidCNP( p_cnp ) {
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

  let hotel='null';

  const hCount = db.prepare(`SELECT COUNT(*) AS value
                                FROM Hoteluri`);
  const who = db.prepare(`SELECT *
                          FROM Hoteluri`);

  const hotelCount = hCount.get();

  if (hotelCount && undefined !== hotelCount) {
    switch(hotelCount.value) {
      case 0: {}

      case 1: {
        let single = who.get();
        
        if (single && undefined !== single) {
          hotel = {
            nume: single.Nume,
            judet: single.Judet,
            sector: single.Sector,
            strada: single.Strada,
            numar: single.Numar,
            codPostal: single.CodPostal,
            telefon: single.Telefon,
            fax: single.Fax,
            email: single.Email,
          }
        }

        break;
      }

      default: {
        break;
      }
    }
  }

  res.json({
    hotel: hotel
  })
});

router.all('/', function(req, res, next) {
  console.log('WARNING: HTTP METHOD')
  res.redirect('http://localhost:3001')
});

module.exports = router;
