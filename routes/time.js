'use strict';
var express = require('express');
var router = express.Router();
var sql = require('mssql');
var dbConfig = require('../db/dbconnection');

/* Get All Times */
router.get('/', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query('SELECT * FROM dbo.d_Time;', function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      sql.close();
      res.send(result.recordset);
    });
  });
});

module.exports = router;
