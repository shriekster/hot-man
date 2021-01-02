var express = require('express');
var router = express.Router();

const authorization = require('../auth');

const db = require('../db');

/** Validators */

function isValidHotelName (name) {
  let valid = false;
  let regex = /(\b[A-Z][a-z]*[\s-]?\b)+/;
  let test = regex.exec(name);

  // If the string matched by the regex matches the input string => the input string conforms to the requirements
  if (test && undefined !== test) {
    valid = ((test[0] === test.input) && (name.length >= 3));
  }

  return valid;
}

function isValidCounty(county) {
  let valid = false;
  let regex = /[A-Z]{1}[A-Z1-6]{1}/;
  let test = regex.exec(county);

  if (test && undefined !== test) {
    valid = ((test[0] === test.input) && (county.length == 2));
  }

  return valid;
}

function isValidPartialLocationName (name) {
  let valid = false;
  let regex = /([A-ZĂÂÎȘȚ][a-zăâîșț]*((\.?\s)|\-)?)+/;
  let test = regex.exec(name);

  if (test && undefined !== test) {
    valid = ((test[0] === test.input) && (name.length >= 2));
  }

  return valid;
}

function isValidStreetNo (number) {
  let valid = false;
  let regex = /^[1-9]+$/;
  let test = regex.exec(number);

  if (test && undefined !== test) {
    valid = (test[0] === test.input);
  }

  return valid;
}

function isValidPostalCode (code) {
  let valid = false;
  let regex = /^[0-9]{6}$/;
  let test = regex.exec(code);

  if (test && undefined !== test) {
    valid = (test[0] === test.input);
  }

  return valid;
}

function isValidPhoneOrFax (number) {
  let valid = false;
  let regex = /^[0-9]{6,10}$/;
  let test = regex.exec(number);

  if (test && undefined !== test) {
    valid = (test[0] === test.input);
  }

  return valid;
}

function isValidEmail (email) {
  let valid = false;
  let regex = /[a-z]+\w+\@[a-z]+\w+\.[a-z]{2,32}/i;
  let test = regex.exec(email);

  if (test && undefined !== test) {
    valid = (test[0] === test.input);
  }

  return valid;
}

/** Updaters */

function updateHotelName(name) {
  const update = db.prepare(`UPDATE Utilizatori
                            SET Parola = ?,
                                Extra = ?
                            WHERE Utilizator = ?`);


}


router.options('/', function(req, res) {
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
router.post('/', authorization, function(req, res) {
  res.set({
    'Allow': 'POST',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });

  let hotel= {
    nume: false,
    judet: false,
    sector: false,
    strada: false,
    numar: false,
    codPostal: false,
    telefon: false,
    fax: false,
    email: false,
  };

  let status = '';

  if (req.body) {
    switch (req.body.task) {

      case 'create': {

        const hCount = db.prepare(`SELECT COUNT(*) AS value
                                FROM Hoteluri`);

        const hotelCount = hCount.get();

        const insertHotel = db.prepare(`INSERT INTO Hoteluri (ID, Nume, Judet, Localitate, Strada, Numar, CodPostal, Telefon, Fax, Email)
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

        if (hotelCount && undefined !== hotelCount) {
          switch(hotelCount.value) {

            case 0: {
              status = 'valid';
              /** Validation */

              let _hotel = req.body.hotel;

              let id = 1;
  
              if (_hotel) {
                let nume = _hotel.nume;
                let judet = _hotel.judet;
                let localitate = _hotel.localitate;
                let strada = _hotel.strada;
                let numar = _hotel.numar;
                let codPostal = _hotel.codPostal;
                let telefon = _hotel.telefon;
                let fax = _hotel.fax;
                let email = _hotel.email;

                let required = nume && judet && localitate && strada && numar && telefon;

                if (nume && !isValidHotelName(nume)) {
                  status = 'invalid';
                  hotel.nume = true;
                }

                if (judet && !isValidCounty(judet)) {
                  status = 'invalid';
                  hotel.judet = true;
                }

                if (localitate && !isValidPartialLocationName(localitate)) {
                  status = 'invalid';
                  hotel.localitate = true;
                }

                if (strada && !isValidPartialLocationName(strada)) {
                  status = 'invalid';
                  hotel.strada = true;
                }

                if (numar && !isValidStreetNo(numar)) {
                  status = 'invalid';
                  hotel.numar = true;
                }

                if (codPostal && !isValidPostalCode(codPostal)) {
                  status = 'invalid';
                  hotel.codPostal = true;
                }

                if (telefon && !isValidPhoneOrFax(telefon)) {
                  status = 'invalid';
                  hotel.telefon = true;
                }

                if (fax && !isValidPhoneOrFax(fax)) {
                  status = 'invalid';
                  hotel.fax = true;
                }

                if (email && !isValidEmail(email)) {
                  status = 'invalid';
                  hotel.email = true;
                }

                let inserted = true;

                if ('valid' === status && required) {
                  try {
                    const hotelInfo = insertHotel.run(
                      id, nume, judet, localitate, strada, numar, codPostal, telefon, fax, email
                    );

                  } catch (error) {
                    if (error) {
                      status = 'error';
                      inserted = false;
                      console.log(error);
                    }
                  } finally {
                    if (inserted) {
                      // do nothing, everything seems ok
                    }
                  }
                }

              } else {
                status = 'error';
              }

              break;
            }

            case 1: {
              status = 'full';

              break;
            }

            default: {
              status = 'error';
              break;
            }
          }
        }

        return res.json({
          hotel: hotel,
          status: status,
        });

        break;
      }

      case 'read': {
        const hCount = db.prepare(`SELECT COUNT(*) AS value
                                FROM Hoteluri`);
        const who = db.prepare(`SELECT *
                                FROM Hoteluri`);

        const hotelCount = hCount.get();

        if (hotelCount && undefined !== hotelCount) {
          switch(hotelCount.value) {

            case 0: {
              status = 'empty';
              break;
            }

            case 1: {
              status = 'valid';

              let single = who.get();
              
              if (single && undefined !== single) {
                hotel = {
                  nume: single.Nume,
                  judet: single.Judet,
                  localitate: single.Localitate,
                  strada: single.Strada,
                  numar: single.Numar,
                  codPostal: single.CodPostal,
                  telefon: single.Telefon,
                  fax: single.Fax,
                  email: single.Email,
                };
              }

              break;
            }

            default: {
              status = 'error';
              break;
            }
          }
        }

        return res.json({
          hotel: hotel,
          status: status,
        });
        break;
      }

      case 'update': {
        // task: update
        // field: {key, value} -> switch (key)
        break;
      }

      default: {

        return res.json({
          status: 'error',
          hotel: hotel
        });

        break;
      }
    }
  }
});

router.all('/', function(req, res, next) {
  console.log('WARNING: HTTP METHOD')
  res.redirect('http://localhost:3001')
});

module.exports = router;
