import fs from 'fs';

const commands = fs
  .readFileSync('./day10_input.txt')
  .toString()
  .split('\n')
  .map((el) => el.split(' '));

const getSignalStrength = ({ signalStrength, X, numOfCycle }) => {
  if (numOfCycle === 20) {
    return signalStrength + 20 * X;
  } else if ((numOfCycle - 20) % 40 == 0) {
    const weight = numOfCycle;
    return signalStrength + weight * X;
  } else {
    return signalStrength;
  }
};

const getNewLine = ({ thisLine, sprite, X, numOfCycle }) => {
  let newLine = '';
  const sprites = [sprite, sprite + 1, sprite + 2];
  const p = numOfCycle % 40 || 40;
  if (sprites.includes(p)) {
    newLine = thisLine + '#';
  } else {
    newLine = thisLine + '.';
  }
  if (numOfCycle % 40 == 0) {
    console.log(`${newLine}`, numOfCycle);
    return '';
  } else {
    return newLine;
  }
};

let numOfCycle = 0;
let X = 1;
let signalStrength = 0;
let sprite = 1;
let thisLine = '';
commands.forEach((command) => {
  const [action, value] = command;
  if (action === 'addx') {
    numOfCycle += 1;
    // during cycle
    thisLine = getNewLine({ thisLine, sprite, X, numOfCycle });
    signalStrength = getSignalStrength({ signalStrength, X, numOfCycle });
    numOfCycle += 1;
    // during cycle
    thisLine = getNewLine({ thisLine, sprite, X, numOfCycle });
    signalStrength = getSignalStrength({ signalStrength, X, numOfCycle });
    // after cycle
    X += Number(value);
    sprite = X;
  } else if (action === 'noop') {
    numOfCycle += 1;
    // during cycle
    thisLine = getNewLine({ thisLine, sprite, X, numOfCycle });
    signalStrength = getSignalStrength({ signalStrength, X, numOfCycle });
  }
});

console.log({ signalStrength });
