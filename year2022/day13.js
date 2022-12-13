import fs from 'fs';

let pairs = fs
  .readFileSync('./day13_input.txt')
  .toString()
  .split('\n\n')
  .map((x) => x.split('\n').map((packet) => JSON.parse(packet)));

function checkPackets(leftPacket, rightPacket) {
  for (let i = 0; i < leftPacket.length; i++) {
    const left = leftPacket[i];
    const right = rightPacket[i];

    if (right === undefined) {
      return false;
    }

    if (typeof left === 'number' && typeof right === 'number') {
      if (left == right) {
        continue;
      } else {
        return left < right;
      }
    } else if (typeof left === 'object' && typeof right === 'object') {
      const subArray = checkPackets(left, right);
      if (subArray == null) {
        continue;
      } else {
        return subArray;
      }
    } else {
      if (typeof left === 'number') {
        const subArray = checkPackets([left], right);
        if (subArray == null) {
          continue;
        } else {
          return subArray;
        }
      } else {
        const subArray = checkPackets(left, [right]);
        if (subArray == null) {
          continue;
        } else {
          return subArray;
        }
      }
    }
  }

  if (rightPacket.length > leftPacket.length) {
    return true;
  } else {
    return null;
  }
}

let indiciesSum = 0;
pairs.forEach(([l, r], index) => {
  if (checkPackets(l, r)) {
    indiciesSum += index + 1;
  }
});
console.log(indiciesSum); // 6076

const rightOrderedPackets = [...pairs, [[2]], [[6]]]
  .flat()
  .sort((l, r) => (checkPackets(l, r) ? -1 : 1));

let decoderKey = 1;
rightOrderedPackets.forEach((packet, i) => {
  const flattenPacket = packet.flat();
  if (
    flattenPacket.length == 1 &&
    (flattenPacket[0] == 2 || flattenPacket[0] == 6)
  ) {
    decoderKey *= i + 1;
  }
});

console.log(decoderKey); //24805
