//const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');
const secret = require('./secret');

module.exports = function (req, res, next) {
  /** Very important: set headers, because the authorization middleware
   *  may not pass control to the next router
   */
  res.set({
    'Allow': 'POST',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  });

  let decoded;
  const token = req.body.token;
  const roles = [
    'operator',
    'manager'
  ];


  const now = Math.floor(Date.now() / 1000);

  const selectUser = db.prepare(`SELECT Utilizator AS value
                              FROM Utilizatori
                              WHERE Utilizator = ?`);

  try {
    if (token) {
      decoded = jwt.verify(token, secret);

      if (decoded) {
        let user = selectUser.get(decoded.usr);

        if (user) {
          if (roles.includes(decoded.rle)) {
            if (now < decoded.exp) {
              return next();

            } else {
              res.status(404)
              .json({
                status: 'denied'
              })
            }

          } else {
            res.status(404)
            .json({
              status: 'denied'
            })
          }

        } else {
          res.status(404)
          .json({
            status: 'denied'
          })
        }
      }
    }

    //next('route');

  } catch(err) {
    console.log(err);
    res.status(404)
    .json({
      status: 'denied'
    })
  }
};