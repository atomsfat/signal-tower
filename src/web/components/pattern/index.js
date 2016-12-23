var Ractive = require('ractive');
var tmpl = require('./tmpl/pattern');

module.exports = Ractive.extend({
  template: tmpl,
  onrender: function onrender() {
    var self = this;
    this.on('changeState', function changeState(event) {
      var value = self.get(event.keypath);
      console.log('changeState', event.keypath, self.get(event.keypath));
      self.set(event.keypath, !value);
    });

    this.on('delete', function tearDown(event, name) {
      var commands = self.get('commands');
      var removeIndex = -1;
      commands.find(function findByName(cmd, index) {
        if (cmd.name === name) {
          removeIndex = index;
          return true;
        }
        return false;
      });

      if (removeIndex >= 0) {
        self.splice('commands', removeIndex, 1);
      }
    });
  }
});
