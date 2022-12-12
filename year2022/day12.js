import fs from 'fs';

const input = fs
  .readFileSync('./day12_input.txt')
  .toString()
  .split('\n')
  .map((l) => l.split(''));

let startPos = { x: 0, y: 0 };
let endPos = { x: 0, y: 0 };

const heightMap = fs
  .readFileSync('./day12_input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line, indexY) =>
    line.split('').map((char, indexX) => {
      if (char === 'S') {
        startPos = { x: indexX, y: indexY };
        return Infinity;
      }
      if (char === 'E') {
        endPos = { x: indexX, y: indexY };
        return 'z'.charCodeAt(0);
      } else return char.charCodeAt(0);
    })
  );

const shortestPath = ({ heightMap, startPos, endPos }) => {
  let visited = heightMap.map((line) => line.map(() => false));
  let shortestPaths = heightMap.map((line) => line.map(() => Infinity));
  shortestPaths[endPos.y][endPos.x] = 0;

  let queue = [endPos];

  while (queue.length > 0) {
    let pos = queue.shift();
    visited[pos.y][pos.x] = true;

    let neighbours = [
      { x: pos.x, y: pos.y - 1 },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x + 1, y: pos.y },
    ];

    neighbours = neighbours.filter((neighbour) => {
      return heightMap[neighbour.y]?.[neighbour.x] !== undefined;
    });

    neighbours.forEach((neighbour) => {
      let currHeight = heightMap[pos.y][pos.x];
      let nextHeight = heightMap[neighbour.y][neighbour.x];
      if (currHeight >= nextHeight - 1) {
        let shortestDist = shortestPaths[neighbour.y][neighbour.x] + 1;
        let currShortestDist = shortestPaths[pos.y][pos.x];
        shortestPaths[pos.y][pos.x] = Math.min(currShortestDist, shortestDist);
      }

      if (!visited[neighbour.y][neighbour.x] && currHeight <= nextHeight + 1) {
        queue.push(neighbour);
        visited[neighbour.y][neighbour.x] = true;
      }
    });
  }

  return shortestPaths;
};

const scenicPath = ({ heightMap, startPos, endPos }) => {
  const shortestPaths = shortestPath({ heightMap, startPos, endPos });

  let min = Infinity;

  heightMap.forEach((line, y) => {
    line.forEach((height, x) => {
      if (height === 'a'.charCodeAt(0))
        min = Math.min(min, shortestPaths[y][x]);
    });
  });

  return min;
};

console.log(
  shortestPath({ heightMap, startPos, endPos })[startPos.y][startPos.x]
);
console.log(scenicPath({ heightMap, startPos, endPos }));
