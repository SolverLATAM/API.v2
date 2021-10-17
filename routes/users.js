'use strict';
var express = require('express');
var router = express.Router();
var sql = require('mssql');
var dbConfig = require('../db/dbconnection');

//!Get Activo
/* Get All Animals */
router.get('/', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query('SELECT * FROM dbo.d_Users;', function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      sql.close();
      res.send(result.recordset);
    });
  }); 
});

/* Add Animal */
router.post('/add', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
      'INSERT INTO dbo.d_Users ' +
        '("EntityMemberId", "Email", "Name","UID") ' +
        'VALUES(' +
        req.body.EntityMemberId +
        ", '" +
        req.body.Email +
        "', '" +
        req.body.Name +
        "', '" +
        req.body.Uid +
        "')  ",
      function (err, result) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        sql.close();
        res.send(result);
      }
    );
  });
});


module.exports = router;
