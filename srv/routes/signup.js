var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var db = require('../db');

/* Validate CNP ( valid for 1800-2099 )
*
* @param string $p_cnp
* @return boolean
*/
function checkCNP( p_cnp ) {
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

function checkPerson(grad, nume, prenume) {
  // does not contain whitespace characters
  // certain attributes must contain at least 3 characters
}

function checkUsername(user) {
  // does not contain whitespace characters
  // certain attributes must contain at least 3 characters
  // Prepare the SQL statement
  const statement = db.prepare(`SELECT Utilizator AS _user from Utilizatori
                                WHERE Utilizator = ?`);

  // Check if the username exists
  const row = statement.get(user);
  
  if (row && undefined != row){
  }

}

function checkPassword() {
  /* at least 8 characters, with at least one character from each of the 
  * 4 character classes (alphabetic lower and upper case; numeric, symbols)
  */
  let regex = /(?=.{8,})(?=.*?[^\w\s])(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/;
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

  let valid = {
    cnp: false,
    grad: false,
    nume: false,
    prenume: false,
    user: false, 
    pass: false,
    rol: false,
    message: [],
  };

  let cnp = req.body.cnp;
  let grad = req.body.grad;
  let nume = req.body.nume;
  let prenume = req.body.prenume;
  let user = req.body.user;
  let pass = req.body.pass;
  let rol = req.body.rol;

  // TODO: implement check functions
  // TODO: finish the route handler




});

router.all('/', function(req, res, next) {
  console.log('WARNING: HTTP METHOD')
  res.status(404).send();
});

module.exports = router;
