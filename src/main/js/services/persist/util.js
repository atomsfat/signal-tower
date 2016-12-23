module.exports = {

  newCommand: function newCommand(name, conf) {
    var createPattern = function createPattern(light, segments) {
      var states = [];
      var i = 0;
      for (i; i < segments; i += 1) {
        states.push(false);
      }

      return {
        name: light.color,
        states: states
      };
    };

    var patterns = [];

    conf.lights.forEach(function each(light) {
      patterns.push(createPattern(light, conf.divisionBySecond));
    });

    return {
      name: name,
      patterns: patterns,
      active: false
    };
  }

};
