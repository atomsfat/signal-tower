var Gpio = require('onoff').Gpio; // Constructor function for Gpio objects.
var red = new Gpio(4, 'out');
var yellow = new Gpio(18, 'out');
var green = new Gpio(23, 'out');
var blue = new Gpio(24, 'out');
var iv;

// Toggle the state of the LED on GPIO #14 every 200ms.
// Here synchronous methods are used. Asynchronous methods are also available.
iv = setInterval(function setInt() {
  red.writeSync(red.readSync() ^ 1); // 1 = on, 0 = off :)
  yellow.writeSync(yellow.readSync() ^ 1); // 1 = on, 0 = off :)
  green.writeSync(green.readSync() ^ 1); // 1 = ON, 0 = off :)
  blue.writeSync(blue.readSync() ^ 1); // 1 = on, 0 = off :)
}, 62.5);

// Stop blinking the LED and turn it off after 5 seconds.
setTimeout(function setOut() {
  clearInterval(iv); // Stop blinking
  red.writeSync(0);  // Turn LED off.
  red.unexport();    // Unexport GPIO and free resources
  yellow.writeSync(0);  // Turn LED off.
  yellow.unexport();    // Unexport GPIO and free resources
  green.writeSync(0);  // Turn LED off.
  green.unexport();    // Unexport GPIO and free resources
  blue.writeSync(0);  // Turn LED off.
  blue.unexport();    // Unexport GPIO and free resources
}, 10000);
