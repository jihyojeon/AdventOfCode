import fs from 'fs';

const commands = fs
  .readFileSync('./day9_input.txt')
  .toString()
  .split('\n')
  .map((l) => l.split(' '));

const directionIn2D = {
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

const head2Tail = (head, tail) => {
  const { x: hx, y: hy } = head;
  const { x: tx, y: ty } = tail;
  return Math.sqrt((hx - tx) ** 2 + (hy - ty) ** 2);
};

const getNewHead = (head, x, y) => {
  return { x: head.x + x, y: head.y + y };
};

const getNewTail = (head, tail) => {
  if (head2Tail(head, tail) >= 2) {
    const diff = `${head.x - tail.x}${head.y - tail.y}`;
    switch (diff) {
      case '20':
        return { x: tail.x + 1, y: tail.y };
      case '-20':
        return { x: tail.x - 1, y: tail.y };
      case '02':
        return { x: tail.x, y: tail.y + 1 };
      case '0-2':
        return { x: tail.x, y: tail.y - 1 };
      case '21':
        return { x: tail.x + 1, y: tail.y + 1 };
      case '2-1':
        return { x: tail.x + 1, y: tail.y - 1 };
      case '-21':
        return { x: tail.x - 1, y: tail.y + 1 };
      case '-2-1':
        return { x: tail.x - 1, y: tail.y - 1 };
      case '12':
        return { x: tail.x + 1, y: tail.y + 1 };
      case '-12':
        return { x: tail.x - 1, y: tail.y + 1 };
      case '1-2':
        return { x: tail.x + 1, y: tail.y - 1 };
      case '-1-2':
        return { x: tail.x - 1, y: tail.y - 1 };
      case '22':
        return { x: tail.x + 1, y: tail.y + 1 };
      case '-22':
        return { x: tail.x - 1, y: tail.y + 1 };
      case '2-2':
        return { x: tail.x + 1, y: tail.y - 1 };
      case '-2-2':
        return { x: tail.x - 1, y: tail.y - 1 };
      default:
        throw new Error(`?????????????????????????`);
    }
  }
  return tail;
};

const trackTail = ({ commands }) => {
  const tailVisited = { '(0,0)': true };

  let head = { x: 0, y: 0 };
  let tail = { x: 0, y: 0 };

  commands.forEach((command) => {
    const direction = command[0];
    const distance = Number(command[1]);
    const { x, y } = directionIn2D[direction];

    for (let i = 0; i < distance; i++) {
      // update head
      head = getNewHead(head, x, y);
      tail = getNewTail(head, tail);
      tailVisited[`(${tail.x},${tail.y})`] = true;
    }
  });

  return Object.keys(tailVisited).length;
};

console.log(trackTail({ commands }));

const trackNinthTail = ({ commands }) => {
  const ninthTailVisited = { '(0,0)': true };

  let head = { x: 0, y: 0 };
  let firstTail = { x: 0, y: 0 };
  let secondTail = { x: 0, y: 0 };
  let thirdTail = { x: 0, y: 0 };
  let fourthTail = { x: 0, y: 0 };
  let fifthTail = { x: 0, y: 0 };
  let sixthTail = { x: 0, y: 0 };
  let seventhTail = { x: 0, y: 0 };
  let eighthTail = { x: 0, y: 0 };
  let ninthTail = { x: 0, y: 0 };

  commands.forEach((command) => {
    const direction = command[0];
    const distance = Number(command[1]);
    const { x, y } = directionIn2D[direction];

    for (let i = 0; i < distance; i++) {
      // update head
      head = getNewHead(head, x, y);
      firstTail = getNewTail(head, firstTail);
      secondTail = getNewTail(firstTail, secondTail);
      thirdTail = getNewTail(secondTail, thirdTail);
      fourthTail = getNewTail(thirdTail, fourthTail);
      fifthTail = getNewTail(fourthTail, fifthTail);
      sixthTail = getNewTail(fifthTail, sixthTail);
      seventhTail = getNewTail(sixthTail, seventhTail);
      eighthTail = getNewTail(seventhTail, eighthTail);
      ninthTail = getNewTail(eighthTail, ninthTail);

      ninthTailVisited[`(${ninthTail.x},${ninthTail.y})`] = true;
    }
  });

  return Object.keys(ninthTailVisited).length;
};

console.log(trackNinthTail({ commands }));
