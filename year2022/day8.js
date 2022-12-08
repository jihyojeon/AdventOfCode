import fs from 'fs';

const grid = fs
  .readFileSync('./day8_input.txt')
  .toString()
  .split('\n')
  .map((line) => line.split(''));

let highstScenicScore = 0;
let numOfVisibleTrees = 0;
for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    let scenicScore = 1;
    const thisHeight = grid[row][col];

    let i = 1;
    let n = grid[row - i]?.[col];
    let s = grid[row + i]?.[col];
    let w = grid[row]?.[col - i];
    let e = grid[row]?.[col + i];

    if (n && s && w && e) {
      // check north
      while (true) {
        n = grid[row - i]?.[col];
        if (!n) {
          i = Math.max(i - 1, 0);
          scenicScore *= i;
          break;
        }
        if (!n || n >= thisHeight) {
          scenicScore *= i;
          break;
        }
        i++;
      }
      // check south
      i = 1;
      while (true) {
        s = grid[row + i]?.[col];
        if (!s) {
          i = Math.max(i - 1, 0);
          scenicScore *= i;
          break;
        }
        if (!s || s >= thisHeight) {
          scenicScore *= i;
          break;
        }
        i++;
      }
      // check west
      i = 1;
      while (true) {
        w = grid[row]?.[col - i];
        if (!w) {
          i = Math.max(i - 1, 0);
          scenicScore *= i;
          break;
        }
        if (!w || w >= thisHeight) {
          scenicScore *= i;
          break;
        }
        i++;
      }
      // check east
      i = 1;
      while (true) {
        e = grid[row]?.[col + i];
        if (!e) {
          i = Math.max(i - 1, 0);
          scenicScore *= i;
          break;
        }
        if (!e || e >= thisHeight) {
          scenicScore *= i;
          break;
        }
        i++;
      }
      highstScenicScore = Math.max(highstScenicScore, scenicScore);
      if (!n || !s || !w || !e) {
        numOfVisibleTrees++;
      }
    } else {
      numOfVisibleTrees++;
    }
  }
}

console.log(numOfVisibleTrees);
console.log(highstScenicScore);
