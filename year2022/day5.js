import fs from 'fs';

const inputs = fs.readFileSync('./day5_input.txt').toString().split('\n\n');
const initial = inputs[0]
  .split('\n')
  .map((line) => [
    line.slice(0, 3),
    line.slice(4, 7),
    line.slice(8, 11),
    line.slice(12, 15),
    line.slice(16, 19),
    line.slice(20, 23),
    line.slice(24, 27),
    line.slice(28, 31),
    line.slice(32, 35),
  ]);

const rules = inputs[1]
  .split('\n')
  .map((line) => line.split(' ').filter((word) => word == Number(word)));

function getCrate({ reverse }) {
  const initialMatrix = [[], [], [], [], [], [], [], [], []];

  for (let i = initial.length; i > 0; i--) {
    initialMatrix[0].push(initial[i - 1][0].slice(1, 2));
    initialMatrix[1].push(initial[i - 1][1].slice(1, 2));
    initialMatrix[2].push(initial[i - 1][2].slice(1, 2));
    initialMatrix[3].push(initial[i - 1][3].slice(1, 2));
    initialMatrix[4].push(initial[i - 1][4].slice(1, 2));
    initialMatrix[5].push(initial[i - 1][5].slice(1, 2));
    initialMatrix[6].push(initial[i - 1][6].slice(1, 2));
    initialMatrix[7].push(initial[i - 1][7].slice(1, 2));
    initialMatrix[8].push(initial[i - 1][8].slice(1, 2));
  }

  const filteredMatrix = initialMatrix.map((l) =>
    l.splice(1, l.length).filter((el) => el != ' ')
  );
  rules.forEach((rule) => {
    const elementNumber = Number(rule[0]);
    const lineFrom = Number(rule[1]);
    const lineTo = Number(rule[2]);
    const movingElements = filteredMatrix[lineFrom - 1].slice(
      filteredMatrix[lineFrom - 1].length - elementNumber,
      filteredMatrix[lineFrom - 1].length
    );

    if (reverse) {
      movingElements.reverse();
    }

    filteredMatrix[lineTo - 1].push(...movingElements);
    filteredMatrix[lineFrom - 1] = filteredMatrix[lineFrom - 1].slice(
      0,
      filteredMatrix[lineFrom - 1].length - elementNumber
    );
  });

  return filteredMatrix.map((l) => l[l.length - 1]).join('');
}

console.log(getCrate({ reverse: true })); // RTGWZTHLD
console.log(getCrate({ reverse: false })); //STHGRZZFR
