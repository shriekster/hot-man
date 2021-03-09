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
  let regex = /^[1-9]{1}[0-9]*$/;
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

/** Pentru centralizatorul spatiilor de cazare */

/** number >= 1 */
function isValidRoomNumber(number) {
  let valid = false;
  let regex = /^[1-9]{1}[0-9]*$/;
  let test = regex.exec(number);

  if (test && undefined !== test) {
    valid = (test[0] === test.input);
  }

  return valid;
}

/** number >= 0 */
function isValidFloorNumber(number) {
  let valid = false;
  let regex = /(0{1}|[1-9]{1}[0-9]*)/;
  let test = regex.exec(number);

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

/** Confort data manipulation - C R U D */

function createConfort(value) {
  const create = db.prepare(`INSERT INTO CategoriiConfort (ID, Denumire)
                          VALUES (?, ?)`);

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

        const info = create.run(null, value);

      } catch (err) {

        if (err) {

          console.log(err);
          error = err;
        }

      } finally {

        return error ? 'error' : 'valid';
      }
    }
  }
}

function updateConfort(oldValue, newValue) {
  const update = db.prepare(`UPDATE CategoriiConfort 
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

        const info = update.run(newValue, oldValue);

      } catch (err) {

        if (err) {

          console.log(err);
          error = err;
        }

      } finally {

        return error ? 'error': 'valid';
      }
    }
  }
}

function deleteConfort(value) {
  const _delete = db.prepare(`DELETE FROM CategoriiConfort
                          WHERE Denumire = ?`);

  if (value) {
    let error;

    try {

      const info = _delete.run(value);

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

/** Spatii data manipulation - C R U D  */

function createSpatiu(value, details) {

  const create = db.prepare(`INSERT INTO CategoriiSpatii (ID, Denumire, Detalii)
                          VALUES (?, ?, ?)`);

  const check = db.prepare(`SELECT Denumire FROM CategoriiSpatii
                          WHERE Denumire = ?`);

  if (value) {

    const exists = check.get(value);

    if (exists && exists.Denumire) {

      return 'duplicate';
    } 

    else 

    if (!value) {

      return 'invalid';
    }
    
    else {
      let error;

      try {

        const info = create.run(null, value, details);

      } catch (err) {

        if (err) {

          console.log(err);
          error = err;
        }

      } finally {

        return error ? 'error' : 'valid';
      }
    }
  }
}

function updateSpatiu(oldValue, newValue, oldDetails, newDetails) {

  const update = db.prepare(`UPDATE CategoriiSpatii 
                            SET Denumire = ?,
                                Detalii = ?
                            WHERE Denumire = ?`);

  const check = db.prepare(`SELECT Denumire FROM CategoriiSpatii
                                WHERE Denumire = ?`);

  if (oldValue && newValue) {

    const exists = check.get(newValue);

    
    if (exists && exists.Denumire && oldValue !== newValue) {

      return 'duplicate';

    } 
    
    else 
    
    if (!newValue) {

      return 'invalid';

    }
    
    else {

      let error;

      try {

        const info = update.run(newValue, newDetails, oldValue);

      } catch (err) {

        if (err) {

          console.log(err);
          error = err;
        }

      } finally {

        return error ? 'error': 'valid';
      }
    }
  }
}

function deleteSpatiu(value) {

  const _delete = db.prepare(`DELETE FROM CategoriiSpatii
                          WHERE Denumire = ?`);

  if (value) {
    let error;

    try {

      const info = _delete.run(value);

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

/** Paturi data manipulation - C R U D  */

function createPat(value, number) {
  const create = db.prepare(`INSERT INTO CategoriiPaturi (ID, Denumire, NumarLocuri)
                          VALUES (?, ?, ?)`);

  const check = db.prepare(`SELECT Denumire FROM CategoriiPaturi
                          WHERE Denumire = ?`);

  if (value && number) {

    const exists = check.get(value);

    if (exists && exists.Denumire) {

      if (!isValidStreetNo(number)) {

        return 'broken';

      } else {

        return 'duplicate';
      }
    } 

    else 

    if (!isValidStreetNo(number)) {

      return 'invalid';
    }
    
    else {
      let error;

      try {

        const info = create.run(null, value, number);

      } catch (err) {

        if (err) {

          console.log(err);
          error = err;
        }

      } finally {

        return error ? 'error' : 'valid';
      }
    }
  }
}

function updatePat(oldValue, newValue, oldNumber, newNumber) {

  const update = db.prepare(`UPDATE CategoriiPaturi
                            SET Denumire = ?,
                                NumarLocuri = ?
                            WHERE Denumire = ?`);

  const check = db.prepare(`SELECT Denumire FROM CategoriiPaturi
                          WHERE Denumire = ?`);

  if (oldValue && newValue && oldNumber && newNumber) {

    const exists = check.get(newValue);

    
    if (exists && exists.Denumire && oldValue !== newValue) {

      if (!isValidStreetNo(newNumber)) {

        return 'broken';

      } else {

        return 'duplicate';
      }

    } 
    
    else 
    
    if (!isValidStreetNo(newNumber)) {

      return 'invalid';

    }
    
    else {

      let error;

      try {

        const info = update.run(newValue, newNumber, oldValue);

      } catch (err) {

        if (err) {

          console.log(err);
          error = err;
        }

      } finally {

        return error ? 'error': 'valid';
      }
    }
  }
}

function deletePat(value) {
  const _delete = db.prepare(`DELETE FROM CategoriiPaturi
                          WHERE Denumire = ?`);

  if (value) {
    let error;

    try {

      const info = _delete.run(value);

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

/** Situatia spatiilor de cazare - C R U D */

function createSCSingle (item) {

  let error;

  const selectCategorieSpatiuID = 
    db.prepare(`SELECT ID FROM CategoriiSpatii
                WHERE Denumire = ?`);

  const selectCategorieConfortID = 
    db.prepare(`SELECT ID FROM CategoriiConfort
                WHERE Denumire = ?`);

  const selectCategoriiPaturi = 
    db.prepare(`SELECT ID, Denumire FROM CategoriiPaturi`);

  const insertSpatiu = 
    db.prepare(`INSERT INTO Spatii(Numar, CategorieSpatiuID, Etaj, CategorieConfortID)
                VALUES(?, ?, ?, ?)`);

  const insertPaturi = 
    db.prepare(`INSERT INTO PaturiSpatii(SpatiuID, CategoriePatID, NumarPaturi)
                VALUES(?, ?, ?)`);

  try {

    const categorieSpatiuID = 
      selectCategorieSpatiuID.get(item.tip);
    
    const categorieConfortID = 
      selectCategorieConfortID.get(item.confort);

    const categoriiPaturi = 
      selectCategoriiPaturi.all();
    
    insertSpatiu.run(
      item.numar, 
      categorieSpatiuID.ID, 
      item.etaj,
      categorieConfortID.ID);

  } catch(err) {

    if (err) {

      console.log(err);
      error = err;

      return 'error';
    }

  } finally {

    if (!error) {

      return 'valid';

    } 

  }
}

function createSCRange() {

}

function readSC() {
  let error;

  const spatii = db.prepare(
  `SELECT 
      Spatii.Etaj AS etaj, 
      Spatii.Numar AS numar,
      CategoriiSpatii.Denumire AS tipSpatiu,
      CategoriiConfort.Denumire AS tipConfort,
      PaturiSpatii.NumarPaturi AS numarPaturi,
      CategoriiPaturi.Denumire AS tipPat
    FROM Spatii
    JOIN CategoriiSpatii ON Spatii.CategorieSpatiuID=CategoriiSpatii.ID
    JOIN CategoriiConfort ON Spatii.CategorieConfortID=CategoriiConfort.ID
    JOIN PaturiSpatii ON Spatii.ID=PaturiSpatii.SpatiuID
    JOIN CategoriiPaturi ON CategoriiPaturi.ID=PaturiSpatii.CategoriePatID
    ORDER BY Spatii.Etaj ASC, Spatii.Numar ASC, CategoriiPaturi.Denumire DESC`
  );

  const selectPaturi = db.prepare(`SELECT Denumire, NumarLocuri FROM CategoriiPaturi
                                   ORDER BY CategoriiPaturi.Denumire DESC`);

  const selectConfort = db.prepare(`SELECT Denumire from CategoriiConfort
                                    ORDER BY CategoriiConfort.Denumire ASC`);

  const selectCatSpatii = db.prepare(`SELECT Denumire from CategoriiSpatii
                                      ORDER BY CategoriiSpatii.Denumire ASC`);

  let beds, cats, confs, rooms;

  try {

    cats = spatii.all();
    beds = selectPaturi.all();
    confs = selectConfort.all();
    rooms = selectCatSpatii.all();

  } catch(err) {

    if (err) {

      console.log(err);
      error = err;

      return {
        status: 'error',
        spatii: {},
        categorii: {},
        paturi: {},
        confort: {},
      };
    } 
  } finally {

    if (!error) {

      let spaces = Object.values(cats);
      let paturi = Object.values(beds);
      let confort = Object.values(confs);
      let categ = Object.values(rooms);

      let newSpaces = [];

      spaces.forEach( item => {

        let newItem = {};

        let numarPaturi = item.numarPaturi;
        let tipPat = item.tipPat;

        newItem = {
          etaj: item.etaj,
          numar: item.numar,
          tipSpatiu: item.tipSpatiu,
          tipConfort: item.tipConfort,
          paturi: [
            {
              numar: numarPaturi, 
              tip: tipPat
            }
          ],
        };
        newSpaces.push(newItem);
      });
      
      for (let i = 0; i < newSpaces.length; i++) {

        while (i + 1 < newSpaces.length && newSpaces[i].etaj === newSpaces[i + 1].etaj &&
              newSpaces[i].numar === newSpaces[i + 1].numar &&
              newSpaces[i].tipSpatiu === newSpaces[i + 1].tipSpatiu) {
          
          let pat = {
            numar: newSpaces[i].paturi[0].numar,
            tip: newSpaces[i].paturi[0].tip
          };

          newSpaces[i + 1].paturi.push(pat);
          newSpaces.splice(i, 1);
        }
      }
      
      return {
        status: 'valid',
        spatii: newSpaces,
        categorii: categ,
        paturi: paturi,
        confort: confort,
      };
    } 
  }
}

function updateSCSingle() {

}

function updateSCRange() {

}

function deleteSCSingle() {

}

function deleteSCRange() {

}


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

/* POST - confort, paturi, spatii, centralizator (situatia spatiilor de cazare) */
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

          let status = 'invalid';

          if (req.body.task) {

            switch (req.body.task) {

              case 'create': {
                if (req.body && (undefined !== req.body.value)) {

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

                let cats;

                try {

                  cats = selectConfort.all()

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
                    let categorii = Object.values(cats);

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
                if (req.body && undefined !== req.body.value) {
                  status = deleteConfort(req.body.value);

                  return res.json({
                    status: status,
                  });
                }

                break;
              }

            }
          }
          break;
        }

        case 'paturi': {
          let status = 'invalid';

          if (req.body.task) {

            switch (req.body.task) {

              case 'create': {
                if (req.body && req.body.value && req.body.number) {

                  status = createPat(req.body.value, req.body.number);

                  return res.json({
                    status: status,
                  });
                }
                break;
              }

              case 'read': {
                let error;

                const selectPaturi = db.prepare(`SELECT Denumire, NumarLocuri FROM CategoriiPaturi`);

                let cats;

                try {

                  cats = selectPaturi.all()

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
                    let categorii = Object.values(cats);

                    return res.json({
                      status: 'valid',
                      categoriiPaturi: categorii,
                    });
                  } 
                }

                break;
              }

              case 'update': {
                if (req.body && req.body.oldValue && req.body.newValue && req.body.oldNumber && req.body.newNumber) {

                  status = updatePat(req.body.oldValue, req.body.newValue, req.body.oldNumber, req.body.newNumber);

                  return res.json({
                    status: status,
                  });
                }

                break;
              }

              case 'delete': {
                if (req.body && req.body.value) {

                  status = deletePat(req.body.value);

                  return res.json({
                    status: status,
                  });
                }

                break;
              }

            }
          }
          
          break;
        }

        case 'spatii': {
          let status = 'invalid';

          if (req.body.task) {

            switch (req.body.task) {

              case 'create': {
                if (req.body && (undefined !== req.body.value)) {

                  let details = req.body.details;

                  status = createSpatiu(req.body.value, details);

                  return res.json({
                    status: status,
                  });
                }
                break;
              }

              case 'read': {
                let error;

                const selectSpatii = db.prepare(`SELECT Denumire, Detalii FROM CategoriiSpatii`);

                let cats;

                try {

                  cats = selectSpatii.all()

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
                    let categorii = Object.values(cats);

                    return res.json({
                      status: 'valid',
                      categoriiSpatii: categorii,
                    });
                  } 
                }

                break;
              }

              case 'update': {
                if (req.body && undefined !== req.body.oldValue && undefined !== req.body.newValue) {

                  let newDetails = req.body.newDetails;

                  status = updateSpatiu(req.body.oldValue, req.body.newValue, req.body.oldDetails, newDetails);

                  return res.json({
                    status: status,
                  });
                }

                break;
              }

              case 'delete': {
                if (req.body && undefined !== req.body.value) {

                  status = deleteSpatiu(req.body.value);

                  return res.json({
                    status: status,
                  });
                }

                break;
              }

            }
          }

          break;
        }

        /** Situatia spatiilor de cazare */
        case 'central': {

          if (req.body.task) {

            switch (req.body.task) {

              case 'create': {

                if (req.body.item) {

                  const status = createSCSingle(req.body.item);

                  return res.json ({
                    status: status,
                  });

                }


                break;
              }

              case 'createRange': {

                break;
              }

              case 'read': {
                
                const {status, spatii, categorii, paturi, confort} = readSC();

                return res.json({
                  status: status,
                  spatii: spatii,
                  categorii: categorii,
                  paturi: paturi,
                  confort: confort
                });

                break;
              }

              case 'update': {

                break;
              }

              case 'delete': {

                break;
              }

              case 'deleteRange': {

                break;
              }

            }

          }
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
