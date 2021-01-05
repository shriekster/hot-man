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

/** Hotel updaters */

function updateNume(nume, numeHotel) {
  const update = db.prepare(`UPDATE Hoteluri
                            SET Nume = ?
                            WHERE Nume = ?`);

  if (numeHotel && isValidHotelName(nume)) {
    let error;

    try {
      const info = update.run(nume, numeHotel);
      //console.log(info);
    } catch(err) {
      error = err;
      console.log(err);
    } finally {
      if (error) {
        return 'error';
      }

      return 'valid';
    }
  }
  
  return 'invalid';
}

function updateJudet(judet, numeHotel) {
  const update = db.prepare(`UPDATE Hoteluri
                            SET Judet = ?
                            WHERE Nume = ?`);

  if (numeHotel && isValidCounty(judet)) {
    let error;

    try {
      const info = update.run(judet, numeHotel);
      //console.log(info);
    } catch(err) {
      error = err;
      console.log(err);
    } finally {
      if (error) {
        return 'error';
      }

      return 'valid';
    }
  }
  
  return 'invalid';
}

function updateLocalitate(localitate, numeHotel) {
  const update = db.prepare(`UPDATE Hoteluri
                            SET Localitate = ?
                            WHERE Nume = ?`);
  if (numeHotel && isValidPartialLocationName(localitate)) {
    let error;

    try {
      const info = update.run(localitate, numeHotel);
      //console.log(info);
    } catch(err) {
      error = err;
      console.log(err);
    } finally {
      if (error) {
        return 'error';
      }

      return 'valid';
    }
  }
  
  return 'invalid';
}

function updateStrada(strada, numeHotel) {
  const update = db.prepare(`UPDATE Hoteluri
                            SET Strada = ?
                            WHERE Nume = ?`);

  if (numeHotel && isValidPartialLocationName(strada)) {
    let error;

    try {
      const info = update.run(strada, numeHotel);
      //console.log(info);
    } catch(err) {
      error = err;
      console.log(err);
    } finally {
      if (error) {
        return 'error';
      }

      return 'valid';
    }
  }
  
  return 'invalid';
}

function updateNumar(numar, numeHotel) {
  const update = db.prepare(`UPDATE Hoteluri
                            SET Numar = ?
                            WHERE Nume = ?`);

  if (numeHotel && isValidStreetNo(numar)) {
    let error;

    try {
      const info = update.run(numar, numeHotel);
      //console.log(info);
    } catch(err) {
      error = err;
      console.log(err);
    } finally {
      if (error) {
        return 'error';
      }

      return 'valid';
    }
  }
  
  return 'invalid';
}

function updateCodPostal(codPostal, numeHotel) {
  const update = db.prepare(`UPDATE Hoteluri
                            SET CodPostal = ?
                            WHERE Nume = ?`);

  if (numeHotel && isValidPostalCode(codPostal)) {
    let error;

    try {
      const info = update.run(codPostal, numeHotel);
      //console.log(info);
    } catch(err) {
      error = err;
      console.log(err);
    } finally {
      if (error) {
        return 'error';
      }

      return 'valid';
    }
  }
  
  return 'invalid';
}

function updateTelefon(telefon, numeHotel) {
  const update = db.prepare(`UPDATE Hoteluri
                            SET Telefon = ?
                            WHERE Nume = ?`);

  if (numeHotel && isValidPhoneOrFax(telefon)) {
    let error;

    try {
      const info = update.run(telefon, numeHotel);
      //console.log(info);
    } catch(err) {
      error = err;
      console.log(err);
    } finally {
      if (error) {
        return 'error';
      }

      return 'valid';
    }
  }
  
  return 'invalid';
}

function updateFax(fax, numeHotel) {
  const update = db.prepare(`UPDATE Hoteluri
                            SET Fax = ?
                            WHERE Nume = ?`);

  if (numeHotel && isValidPhoneOrFax(fax)) {
    let error;

    try {
      const info = update.run(fax, numeHotel);
      //console.log(info);
    } catch(err) {
      error = err;
      console.log(err);
    } finally {
      if (error) {
        return 'error';
      }

      return 'valid';
    }
  }
  
  return 'invalid';
}

function updateEmail(email, numeHotel) {
  const update = db.prepare(`UPDATE Hoteluri
                            SET Email = ?
                            WHERE Nume = ?`);

  if (numeHotel && isValidEmail(email)) {
    let error;

    try {
      const info = update.run(email, numeHotel);
      //console.log(info);
    } catch(err) {
      error = err;
      console.log(err);
    } finally {
      if (error) {
        return 'error';
      }

      return 'valid';
    }
  }
  
  return 'invalid';
}

/** Confort data manipulation - CRUD */

function createConfort(value) {
  const create = db.prepare(`INSERT INTO CategoriiConfort (Denumire)
                          VALUES (?)`);

  const check = db.prepare(`SELECT Denumire FROM CategoriiConfort
                          WHERE Denumire = ?`);

  if (value) {
    const exists = check.get(value);

    if (exists && exists.Denumire) {

      return 'duplicate';

    } 

    else 

    if (!isValidStreetNo(value)) {

      return 'invalid';

    }
    
    else {
      let error;
      try {

        const info = create.run(value);
      } catch (err) {

        if (err) {

          console.log(err);
          error = err;
        }
      } finally {

        if (error) {

          return 'error';
        }
      }


      return 'valid';
    }
  }

  return 'invalid';
}

function updateConfort(oldValue, newValue) {
  const create = db.prepare(`UPDATE CategoriiConfort 
                            SET Denumire = ?
                            WHERE Denumire = ?`);

  const check = db.prepare(`SELECT Denumire FROM CategoriiConfort
                          WHERE Denumire = ?`);

  if (oldValue && newValue) {
    const exists = check.get(newValue);

    if (exists && exists.Denumire) {

      return 'duplicate';

    } 

    else 

    if (!isValidStreetNo(newValue)) {

      return 'invalid';

    }
    
    else {
      let error;
      try {

        const info = create.run(newValue);
      } catch (err) {

        if (err) {

          console.log(err);
          error = err;
        }
      } finally {

        if (error) {

          return 'error';
        }
      }


      return 'valid';
    }
  }

  return 'invalid';
}

function deleteConfort(value) {
  const _delete = db.prepare(`DELETE FROM CategoriiConfort
                          WHERE Denumire = ?`);

  if (value) {
    let error;

    try {
      const info = _delete.run(value);
      //console.log(info);
    } catch(err) {

      error = err;
      console.log(err);

    } finally {

      if (error) {

        return 'error';
      }

      return 'valid';
    }
  }

  return 'invalid';
}

/** Spatii updaters */


/** Routes */

router.options('/:attribute?', function(req, res) {
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
 

/* POST - hotel */
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
        if (req.body.name && req.body.key && req.body.value) {
          let name = req.body.name;
          let value = req.body.value;

          switch(req.body.key) {

            case 'nume': {
              status = updateNume(value, name);
              break;
            }

            case 'judet': {
              status = updateJudet(value, name);
              break;
            }

            case 'localitate': {
              status = updateLocalitate(value, name);
              break;
            }

            case 'strada': {
              status = updateStrada(value, name);
              break;
            }

            case 'numar': {
              status = updateNumar(value, name);
              break;
            }

            case 'codPostal': {
              status = updateCodPostal(value, name);
              break;
            }

            case 'telefon': {
              status = updateTelefon(value, name);
              break;
            }

            case 'fax': {
              status = updateFax(value, name);
              break;
            }

            case 'email': {
              status = updateEmail(value, name);
              break;
            }

          }

        } else {
          status = 'error';
        }
        
        return res.json({
          status: status,
          hotel: hotel,
        });
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

/* POST - confort, paturi, spatii */
router.post('/:attribute', authorization, function(req, res) {
  res.set({
    'Allow': 'POST',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });

  if (req.params && req.body) {
    if (req.params.attribute) {
      switch (req.params.attribute) {

        case 'confort': {
          let status = '';
          if (req.body.task) {
            switch (req.body.task) {

              case 'create': {
                if (req.body && undefined !== req.body.value) {
                  status = createConfort(req.body.value);

                  return res.json({
                    status: status,
                  });
                }
                break;
              }

              case 'read': {
                let error;

                const selectConfort = db.prepare(`SELECT Denumire FROM CategoriiConfort`);

                let conforts;

                try {

                  conforts = selectConfort.all()

                } catch(err) {

                  if (err) {

                    console.log(err);
                    error = err;

                    return res.json({
                      status: 'error',
                    });
                  } 
                } finally {

                  if (!error) {
                    let categorii = Object.values(conforts);

                    return res.json({
                      status: 'valid',
                      categoriiConfort: categorii,
                    });
                  } 
                }

                break;
              }

              case 'update': {
                if (req.body && undefined !== req.body.oldValue && undefined !== req.body.newValue) {
                  status = updateConfort(req.body.oldValue, req.body.newValue);

                  return res.json({
                    status: status,
                  });
                }

                break;
              }

              case 'delete': {
                if (req.body && undefined !== req.value) {
                  deleteConfort(req.body.value);
                }

                break;
              }

            }
          }
          break;
        }

        case 'paturi': {
          let status = '';
          break;
        }

        case 'spatii': {
          let status = '';
          break;
        }

      }
    }
  }
});

router.all('/', function(req, res, next) {
  console.log('WARNING: HTTP METHOD')
  res.redirect('http://localhost:3001')
});

module.exports = router;
