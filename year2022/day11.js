import fs from 'fs';

const commands = fs.readFileSync('./day11_input.txt').toString().split('\n');
const numOfInspectionsOfMonkey = Array(
  Math.floor(commands.length / 7) + 1
).fill(0);
const monkeyDetails = {};
let superMod = 1;

for (let i = 0; i < commands.length; i += 7) {
  const monkey = commands[i].split(' ')[1].split(':')[0];
  const initialItems = commands[i + 1].split(': ')[1].split(', ');
  const [operation, w] = commands[i + 2].split('old ')[1].split(' ');
  const test = commands[i + 3].split(' by ')[1];
  superMod *= Number(test);
  const ifTrueMonkeyNumber = Number(commands[i + 4].split('monkey ')[1]);
  const ifFalseMonkeyNumber = Number(commands[i + 5].split('monkey ')[1]);

  monkeyDetails[monkey] = {
    items: initialItems,
    operation,
    weight: w == 'old' ? 'old' : Number(w),
    test: Number(test),
    ifTrueMonkeyNumber,
    ifFalseMonkeyNumber,
  };
}

const process = ({
  numOfInspectionsOfMonkey,
  monkeyDetails,
  numberOfRound,
  superMod,
}) => {
  for (let round = 1; round <= numberOfRound; round++) {
    for (
      let monkeyNumber = 0;
      monkeyNumber < Object.keys(monkeyDetails).length;
      monkeyNumber++
    ) {
      const {
        items,
        operation,
        weight,
        test,
        ifTrueMonkeyNumber,
        ifFalseMonkeyNumber,
      } = monkeyDetails[`${monkeyNumber}`];

      monkeyDetails[monkeyNumber].items = [];

      items.forEach((item) => {
        numOfInspectionsOfMonkey[monkeyNumber] += 1;
        const w = weight == 'old' ? item : weight;

        let worryLevel =
          operation == '+'
            ? Number(item) + Number(w)
            : operation == '*'
            ? Number(item) * Number(w)
            : console.log('?');

        // Monkey get bored
        worryLevel = superMod
          ? worryLevel % superMod
          : Math.floor(worryLevel / 3);

        // Throw item to monkey
        if (worryLevel % test == 0) {
          monkeyDetails[ifTrueMonkeyNumber].items.push(worryLevel);
        } else {
          monkeyDetails[ifFalseMonkeyNumber].items.push(worryLevel);
        }
      });
    }
  }

  numOfInspectionsOfMonkey.sort((a, b) => b - a);
  return numOfInspectionsOfMonkey[0] * numOfInspectionsOfMonkey[1];
};

// const first = process({
//   numOfInspectionsOfMonkey,
//   monkeyDetails,
//   numberOfRound: 20,
// });
// console.log(first);
//10605

const second = process({
  numOfInspectionsOfMonkey,
  monkeyDetails,
  numberOfRound: 10000,
  superMod,
});
console.log(second);
//13954061248
