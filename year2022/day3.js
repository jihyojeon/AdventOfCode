import fs from 'fs';

const inputs = fs.readFileSync('./day3_input.txt').toString().split('\n');

function findCommonCompartmentsPriority(item1, item2, item3) {
  let commonItem = item1.split('').filter((p) => item2.split('').includes(p));
  if (item3) {
    commonItem = commonItem.filter((p) => item3.split('').includes(p));
  }
  const priority = commonItem[0].charCodeAt(0);

  return priority >= 97 ? priority - 96 : priority - 38;
}

function calculatePriorities(inputs) {
  let total = 0;
  inputs.forEach(([item1, item2, item3]) => {
    total += findCommonCompartmentsPriority(item1, item2, item3);
  });
  return total;
}

console.log(
  calculatePriorities(
    inputs.map((e) => [e.slice(0, e.length / 2), e.slice(e.length / 2)])
  )
);

const chunk = [];

for (let i = 1; i + 1 < inputs.length; i += 3) {
  chunk.push([inputs[i - 1], inputs[i], inputs[i + 1]]);
}
console.log(calculatePriorities(chunk));
