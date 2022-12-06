import fs from 'fs';

const input = fs.readFileSync('./day6_input.txt').toString();

function findAMarker(signal) {
  let marker = [];
  let i = 0;
  while (marker.length < 4) {
    const current = signal[i];
    if (marker.includes(current)) {
      marker = [...marker.splice(marker.indexOf(current) + 1), current];
    } else {
      marker.push(current);
    }
    i++;
  }
  return i;
}

console.log(findAMarker(input));

function findAMessage(signal) {
  let marker = [];
  let i = 0;
  while (marker.length < 14) {
    const current = signal[i];
    if (marker.includes(current)) {
      marker = [...marker.splice(marker.indexOf(current) + 1), current];
    } else {
      marker.push(current);
    }
    i++;
  }
  return i;
}

console.log(findAMessage(input));
