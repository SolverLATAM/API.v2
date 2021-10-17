'use strict';
var express = require('express');
var router = express.Router();
var sql = require('mssql');
var dbConfig = require('../db/dbconnection');

/* Get All Operations */
router.get('/', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query('SELECT * FROM dbo.f_Operations;', function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      sql.close();
      res.send(result.recordset);
    });
  });
});

/* Add Operation */
router.post('/add', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
      'INSERT INTO f_Operations ' +
        '("TransactionId", "AccountMemberId", "AnimalMemberId","Value1","Value2","Value3","TimePeriod","CreatedBy","CreatedOn","UpdatedBy","UpdatedOn","Source") ' +
        "VALUES('" +
        req.body.TransactionId +
        "', " +
        req.body.AccountMemberId +
        ', ' +
        req.body.AnimalMemberId +
        ', ' +
        req.body.Value1 +
        ', ' +
        req.body.Value2 +
        ', ' +
        req.body.Value3 +
        ', ' +
        req.body.TimePeriod +
        ", '" +
        req.body.CreatedBy +
        "', " +
        req.body.CreatedOn +
        ", '" +
        req.body.UpdatedBy +
        "', " +
        req.body.UpdatedOn +
        ", '" +
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

/* Delete Operation */
router.delete('/delete/:ID', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    console.log(req.params.ID);
    request.query(
      'DELETE FROM dbo.f_Operations WHERE RowId = ' + req.params.ID,
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

/* Update Operation */
router.put('/update/:ID', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
      "UPDATE dbo.f_Operations SET TransactionId='" +
        req.body.TransactionId +
        "', AccountMemberId=" +
        req.body.AccountMemberId +
        ', AnimalMemberId=' +
        req.body.AnimalMemberId +
        ', Value1=' +
        req.body.Value1 +
        ', Value2=' +
        req.body.Value2 +
        ', Value3=' +
        req.body.Value3 +
        ', TimePeriod=' +
        req.body.TimePeriod +
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
        "' WHERE RowId = " +
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
