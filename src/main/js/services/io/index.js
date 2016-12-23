var Gpio;
var config = require('../../config');
var gpios = {};
var segment = 0;
var persistService = require('../../services/persist');

module.exports = function (isRaspberry, log) {

  if (isRaspberry === true) {
    Gpio = require('onoff').Gpio;
    config.lights.forEach(function each(light) {
      console.log('name: %s io: %d conf: %s', light.color, light.gpio, 'out');
      gpios[light.color] = new Gpio(light.gpio, 'out');
    });
  }

  setInterval(function loop() {
    var data = persistService.read();
    segment += 1;
    if (segment >= config.divisionBySecond) {
      segment = 0;
    }
    if (data !== undefined && data.commands !== undefined) {
      var stateLights = {};
      data.commands.forEach(function eachCmd(cmd) {
        cmd.patterns.forEach(function eachPattern(pattern) {
          var currentValue = stateLights[pattern.name] === undefined ?
            false : stateLights[pattern.name];
          stateLights[pattern.name] = (currentValue || (pattern.states[segment] && cmd.active));
        });
      });
      if (log === true) {
        console.log('State %d of lights: %j', segment, stateLights);
      }
      if (isRaspberry === true && Gpio !== undefined) {
        gpios.red.writeSync(stateLights.red === true ? 1 : 0);
        gpios.yellow.writeSync(stateLights.yellow === true ? 1 : 0);
        gpios.green.writeSync(stateLights.green === true ? 1 : 0);
        gpios.blue.writeSync(stateLights.blue === true ? 1 : 0);
      }
    }
  }, 1000 / config.divisionBySecond);
};
