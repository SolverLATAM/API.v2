'use strict';
var express = require('express');
var router = express.Router();
var sql = require('mssql');
var dbConfig = require('../db/dbconnection');

/* Get All Farms */
router.get('/', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query('SELECT * FROM dbo.d_Farms;', function (err, result) {
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
      'INSERT INTO dbo.d_Farms ' +
        '("Code", "Description","EntityMemberId","CreatedBy","UpdatedBy","Source") ' +
        "VALUES('" +
        req.body.Code +
        "', '" +
        req.body.Description +
        "', " +
        req.body.EntityMemberId +
        ", '" +
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

/* Delete Farm */
router.delete('/delete/:ID', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    console.log(req.params.ID);
    request.query(
      'DELETE FROM dbo.d_Farms WHERE MemberId = ' + req.params.ID,
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

/* Update Farm */
router.put('/update/:ID', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
      "UPDATE dbo.d_Farms SET Code='" +
        req.body.Code +
        "', Description='" +
        req.body.Description +
        "', DescriptionPowerBi='" +
        req.body.DescriptionPowerBi +
        "', EntityMemberId=" +
        req.body.EntityMemberId +
        ", CreatedBy='" +
        req.body.CreatedBy +
        "', CreatedOn=" +
        req.body.CreatedOn +
        ", UpdatedBy='" +
        req.body.UpdatedBy +
        "', UpdatedOn=" +
        req.body.UpdatedOn +
        ", Source='" +
        req.body.Source +
        "' WHERE MemberId = " +
        req.params.ID,
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
