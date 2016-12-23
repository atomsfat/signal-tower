var express = require('express');
var api = new express.Router();
var persistService = require('../../services/persist');

module.exports = function () {
  api.get('/:name/:enable', function handlePost(req, res) {
    var data = persistService.read();
    var name = req.params.name;
    var enable = req.params.enable;
    var command = data.commands.find(function findByName(cmd) {
      return cmd.name === name;
    });
    console.log('Handling command:', req.params.name, enable !== undefined && enable === 'on');
    if (command !== undefined) {
      command.active = enable !== undefined && enable === 'on';
      persistService.save(data);
      res.status(202);
      return res.send('202 Accepted');
    }

    res.status(404);
    return res.send('Command not found');
  });

  return api;
};
