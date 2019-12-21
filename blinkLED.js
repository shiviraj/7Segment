'use strict';
const { Gpio } = require('onoff');

const sleep = function(time) {
  let newTime = new Date().getTime() + time;
  while (newTime > new Date().getTime());
};

const setBoard = function(pinNo, mode) {
  return new Gpio(pinNo, mode);
};

const main = function() {
  const LED = setBoard(4, 'out');
  const button = setBoard(17, 'in');
  let number = 0;
  while (true) {
    if (button.readSync() == 1) {
      while (button.readSync() == 1);
      number++;
      console.log(number);
      LED.writeSync(1);
      sleep(500);
      LED.writeSync(0);
    }
  }
};

main();
