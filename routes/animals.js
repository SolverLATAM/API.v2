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
    request.query('SELECT * FROM dbo.d_Animals;', function (err, result) {
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
      'INSERT INTO dbo.d_Animals ' +
        '("BirthDate", "SaleDate", "Breed","NickName","AnimalId","FarmMemberId","IsFemale","MadreMemberId","Active","Birthweight","CreatedBy","CreatedOn","UpdatedBy","UpdatedOn","Source") ' +
        'VALUES(' +
        req.body.BirthDate +
        ', ' +
        req.body.SaleDate +
        ", '" +
        req.body.Breed +
        "', '" +
        req.body.NickName +
        "', " +
        req.body.AnimalId +
        ', ' +
        req.body.FarmMemberId +
        ', ' +
        req.body.IsFemale +
        ', ' +
        req.body.MadreMemberId +
        ', ' +
        req.body.Active +
        ', ' +
        req.body.Birthweight +
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

/* Delete Animal */
router.delete('/delete/:IDANIMAL/:CODEFINCA', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    console.log(req.params.ID);
    request.query(
      'DELETE A FROM d_Animals A ' +
      'INNER JOIN d_Farms B ON B.MemberId = A.FarmMemberId '+
      'WHERE A.AnimalId = ' + req.params.IDANIMAL + ' AND B.Code = ' + "'" + req.params.CODEFINCA + "'",
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

/* Get animal from farm id */
router.get('/farm/:ID', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
      'SELECT * FROM dbo.d_Animals WHERE FarmMemberId = ' + req.params.ID,
      function (err, result) {
        if (err) {
          console.log(err);
          res.send(err);
        }
        sql.close();
        res.send(result.recordsets);
      }
    );
  });
});
/* Update Animal */
router.put('/update/:ID', function (req, res, next) {
  sql.connect(dbConfig, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(
      'UPDATE dbo.d_Animals SET BirthDate=' +
        req.body.BirthDate +
        ', SaleDate=' +
        req.body.SaleDate +
        ", Breed='" +
        req.body.Breed +
        "', NickName='" +
        req.body.NickName +
        "', AnimalId=" +
        req.body.AnimalId +
        ', FarmMemberId=' +
        req.body.FarmMemberId +
        ', IsFemale=' +
        req.body.IsFemale +
        ', MadreMemberId=' +
        req.body.MadreMemberId +
        ', Active=' +
        req.body.Active +
        ', Birthweight=' +
        req.body.Birthweight +
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
