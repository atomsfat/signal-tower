'use strict';

var wrap = require('xhttp');

module.exports = function addHandler() {
  this.Ractive.prototype.resolveRequest = function resolveRequest(params) {
    var self = this;
    var options = {};

    if (params) {
      options = params;
    }
    console.log(params, options);
    if (!options.url) {
      options.url = self.get('url');
    }

    if (!options.fireEvent) {
      options.fireEvent = self.get('fireEvent');
    }
    console.log('url', self.get('url'));
    wrap.xhttp(options, function handleRes(res) {
      console.log('fireEvent', options.fireEvent, 'with:', res);
      self.fire(options.fireEvent, res);
    }, function handleError(err) {
      console.log('with got an error', err);
    });
  };
};
