var express = require('express');
var morgan = require('morgan');
var cmdAPIRoute = require('./routes/pattern');
var configureRoute = require('./routes/configure');
var bodyParser = require('body-parser');
var persistService = require('./services/persist');
var ioService = require('./services/io');
var app = express();
var path = require('path');

var initApp = function init() {
  ioService(true, false);

  app.use(express.static(path.resolve(__dirname, '../../../public')));
  app.use(morgan('short'));
  app.use(bodyParser.json());

  app.use('/api/configure', configureRoute());
  app.use('/api/cmd', cmdAPIRoute());

  app.use(function handleError(req, res) {
    res.status(500);
    res.send('Error processing request');
  });

  app.listen(5000);
};

persistService.readFromDisk(function readFromDisk(err, data) {
  initApp(data);
});
