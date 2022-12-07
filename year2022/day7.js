import fs from 'fs';

const input = fs.readFileSync('./day7_input.txt').toString().split('\n');

const directories = {};
let current = '';

input.map((command) => {
  const words = command.split(' ');
  if (words[0] === '$') {
    if (words[1] === 'cd') {
      if (words[2] === '..') {
        current = Object.keys(directories).find((key) =>
          directories[key].includes(current)
        );
      } else {
        current = `${current}${words[2]}`;
      }
    } else if (words[1] === 'ls') {
      directories[`${current}`] = [];
    }
  } else if (words[0] === 'dir') {
    directories[`${current}`] = [
      ...directories[`${current}`],
      `${current}${words[1]}`,
    ];
  } else if (words[0] == Number(words[0])) {
    directories[`${current}`] = [
      ...directories[`${current}`],
      Number(words[0]),
    ];
  }
});

const size = {};
let totalSumOfFilesUnder100K = 0;
Object.keys(directories)
  .reverse()
  .forEach((key) => {
    size[key] = directories[key].reduce((a, b) => {
      if (b == Number(b)) {
        return a + b;
      } else {
        return a + size[b];
      }
    }, 0);

    if (size[key] <= 100000) {
      totalSumOfFilesUnder100K += size[key];
    }
  });

console.log({ totalSumOfFilesUnder100K });

let smallest = 70000000;
const unusedSpace = 70000000 - size['/'];
Object.keys(size).forEach((key) => {
  let deleting = size[key];
  if (unusedSpace + deleting >= 30000000) {
    smallest = Math.min(smallest, deleting);
  }
});

console.log({ smallest });
