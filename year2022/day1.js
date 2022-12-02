import fs from 'fs';

const calories = fs
  .readFileSync('./day1_input.txt')
  .toString()
  .split('\n\n')
  .map((perReindeer) => perReindeer.split('\n'));

function findTheMostTiredReindeer(inputCalories) {
  let maxCal = 0;
  inputCalories.forEach((perReindeer) => {
    const cand = perReindeer.reduce((a, b) => Number(a) + Number(b), 0);
    maxCal = Math.max(maxCal, cand);
  });

  return maxCal;
}

console.log(findTheMostTiredReindeer(calories));

function findTheTopThreeTiredReindeer(inputCalories) {
  let maxCal = [0, 0, 0];
  inputCalories.forEach((perReindeer) => {
    const cand = perReindeer.reduce((a, b) => Number(a) + Number(b), 0);
    maxCal[0] = Math.max(maxCal[0], cand);
    maxCal.sort((a, b) => a - b);
  });

  return maxCal.reduce((a, b) => a + b, 0);
}

console.log(findTheTopThreeTiredReindeer(calories));
