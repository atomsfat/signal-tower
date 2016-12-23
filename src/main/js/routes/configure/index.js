var express = require('express');
var persistService = require('../../services/persist');
var api = new express.Router();

module.exports = function () {
  api.get('/', function configureGet(req, res) {
    var data = persistService.read();
    return res.json(data);
  });

  api.post('/', function configurePost(req, res) {
    console.log('handling post', req.body);
    persistService.save(req.body);
    return res.json(req.body);
  });

  api.post('/saveToDisk', function configurePost(req, res) {
    console.log('handling post saveToDisk', req.body);
    persistService.saveToDisk(req.body);
    return res.json({ msg: 'ok' });
  });

  return api;
};
