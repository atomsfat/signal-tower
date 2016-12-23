var getUserHome = function getUserHome() {
  return process.env.HOME || process.env.USERPROFILE;
};

module.exports = {
  persistPath: getUserHome() + '/.signalTower.json',
  webContextPath: '',
  lights: [
    { color: 'red', gpio: 4 },
    { color: 'yellow', gpio: 18 },
    { color: 'green', gpio: 23 },
    { color: 'blue', gpio: 24 }],
  divisionBySecond: 16
};
