var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/items', function (req, res, next) {
  db.Item.findAll()
    .then(function (items) {
      res.json(items);
    });
});

router.get('/items/:id', function (req, res, next) {
  var id = req.params.id || -1;
  db.Item.findById(id)
    .then(function (item) {
      res.json(item);
    });
});

router.post('/items', function (req, res, next) {
  var item = req.body || {};
  db.Item.create(item)
    .then(function (dbItem) {
      res.json(dbItem);
    });
});

router.put('/items', function (req, res, next) {
  var item = req.body || {};
  db.Item.findById(item.id)
    .then(function (dbItem) {
      var obj = {
        title: item.title
      };
      return dbItem.update(obj);
    })
    .then(function (dbItem) {
      res.json(dbItem);
    });
});

router.delete('/items/:id', function (req, res, next) {
  var id = req.params.id || -1;
  db.Item.findById(id)
    .then(function (item) {
      return item.destroy();
    })
    .then(function () {
      res.json({});
    });
});
