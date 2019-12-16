'use strict';
const { Gpio } = require('onoff');

const sleep = function(time) {
  let newTime = new Date().getTime() + time;
  while (newTime > new Date().getTime());
};

const setPin = function(pinNo, mode) {
  return new Gpio(pinNo, mode);
};

const setBoard = function(pins, mode) {
  const assignedPins = pins.map(pin => setPin(pin, mode));
  return assignedPins;
};

const seg = function(pins, val) {
  for (let i = 0; i < 8; i++) {
    pins[i].writeSync((val >> i) & 1);
  }
};

const main = function() {
  const pins = [5, 6, 13, 19, 26, 16, 20, 21];
  const numbers = [0xc0, 0xf9, 0xa4, 0xb0, 0x99, 0x92, 0x82, 0xf8, 0x80, 0x90];
  const segment = setBoard(pins, 'out');
  while (true) {
    for (let i = 0; i < 10; i++) {
      seg(segment, numbers[i]);
      sleep(500);
    }
  }
};

main();
