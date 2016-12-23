'use strict';

var Ractive = require('ractive');
var main = require('./tmpl/main');
var util = require('../../main/js/services/persist/util');
var config = require('../../main/js/config');
var Chance = require('chance');
var chance = new Chance();
var pattern = require('../components/pattern');
var app;
var webContextPath = window.location.pathname;

require('semantic-ui-css/semantic.min.css');

require('./lib/resolveRequest').call({ Ractive: Ractive });


app = new Ractive({
  template: main,
  el: '#app',
  data: {
    commands: [],
    fireEvent: 'fullGet',
    url: webContextPath + 'api/configure/'
  },
  components: {
    pattern: pattern
  },
  onrender: function onRender() {
    this.resolveRequest();
  }
});

app.on('newCmd', function newCmd() {
  app.push('commands', util.newCommand(chance.word(), config));
});

app.on('saveAll', function saveAll() {
  var commands = app.get('commands');

  app.resolveRequest({
    method: 'POST',
    url: webContextPath + 'api/configure/saveToDisk',
    fireEvent: 'nothing',
    body: { commands: commands }
  });
});

app.observe('commands', function changeState(newValue, oldValue, keyPath) {
  console.log('oldValue ', oldValue);
  console.log('newValue', newValue);
  console.log('keyPath ', keyPath);
  if (newValue.length > 0) {
    console.log('------Saving data to server------------');
    app.resolveRequest({
      method: 'POST',
      fireEvent: 'nothing',
      body: { commands: newValue }
    });
  }
});

app.on('fullGet', function fullGet(data) {
  app.set('commands', data.commands);
});
