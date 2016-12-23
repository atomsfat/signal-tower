var fs = require('fs');
var config = require('../../config');
var util = require('./util');
var readDataFn;
var parseSafelyFn;
var createDefaultFn;
var diskData;

process.on('SIGINT', function SIGINT() {
  console.log('Setting save on ->:' + config.persistPath);
  console.log('Goodbye!');
  fs.writeFile(config.persistPath, JSON.stringify(diskData), 'utf8', function handleError(error) {
    console.log('trying to save', JSON.stringify(diskData));
    if (error != null) {
      console.error('Error unable to save', error);
    } else {
      console.log('Settings saved on ' + config.persistPath);
    }
    process.exit();
  });
});

parseSafelyFn = function fnParseSafely(data, next) {
  var parsed = null;
  try {
    parsed = JSON.parse(data);
  } catch (error) {
    console.log('errorParse', error);
    return next(error, null);
  }
  return next(null, parsed);
};


createDefaultFn = function fnCreateDefault() {
  var defaultData = {
    commands: []
  };
  defaultData.commands.push(util.newCommand('default', config));
  return defaultData;
};

readDataFn = function fnReadData(path, next) {
  if (diskData) {
    return next(null, diskData);
  }
  console.log('Trying to read data from', path);
  fs.exists(path, function ifExist(exist) {
    if (!exist) {
      console.log('File doesn\'t exist using default');
      diskData = createDefaultFn();
      return next(null, diskData);
    }
    fs.readFile(path, 'utf8', function readFile(error, readed) {
      parseSafelyFn(readed, function parseFromDisk(errorParsed, data) {
        console.log('Data length: %d, content: %j', readed.length, data);
        if (errorParsed !== null || data === null || data.commands === undefined) {
          console.log('Data from file was INVALID creating default');
          diskData = createDefaultFn();
        } else {
          console.log('Using data from file');
          diskData = data;
        }
        return next(null, diskData);
      });
    });
    return false;
  });
  return false;
};


module.exports = {
  readFromDisk: function read(next) {
    readDataFn(config.persistPath, next);
  },
  read: function () {
    return diskData;
  },
  save: function save(newData) {
    diskData = newData;
  },
  saveToDisk: function () {
    fs.writeFile(config.persistPath, JSON.stringify(diskData), 'utf8', function handleError(error) {
      console.log('trying to save', JSON.stringify(diskData));
      if (error != null) {
        console.error('Error unable to save', error);
      } else {
        console.log('Settings saved on ' + config.persistPath);
      }
    });
  }

};

