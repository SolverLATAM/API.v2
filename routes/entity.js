'use strict';
var express = require('express');
var router = express.Router();
var sql = require('mssql');
var dbConfig = require('../db/dbconnection');

/* Get All Entities */
router.get('/', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query('SELECT * FROM dbo.d_Entity;', function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      sql.close();
      res.send(result.recordset);
    });
  });
});

/* Get All Entities where UID = to parameter */
router.get('/idWhereUID/:KUID', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("SELECT MemberId FROM dbo.d_Entity "+
    "where CreatedBy = '" +  req.params.KUID + "';"
    , function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      sql.close();
      res.send(result.recordset);
    });
  });
});


/* Add Farm */
router.post('/add', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
      'INSERT INTO dbo.d_Entity ' +
        '("Code", "Description","CreatedBy","UpdatedBy","Source") ' +
        "VALUES('" +
        req.body.Code +
        "', '" +
        req.body.Description +
        "', '" +
        req.body.CreatedBy +
        "', '" +
        req.body.UpdatedBy +
        "', '" +
        req.body.Source +
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
