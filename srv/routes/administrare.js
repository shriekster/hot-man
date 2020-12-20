var express = require('express');
var router = express.Router();

const authorization = require('../auth');

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
router.post('/', authorization, function(req, res, next) {
  res.set({
    'Allow': 'POST',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });

  let hotel= {
    nume: '',
    judet: '',
    sector: '',
    strada: '',
    numar: '',
    codPostal: '',
    telefon: '',
    fax: '',
    email: '',
  }

  if (req.body) {
    switch (req.body.task) {

      case 'create': {
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
        });
        break;
      }

      case 'update': {
        break;
      }

      default: {

        res.json({
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
