import fs from 'fs';

const inputs = fs
  .readFileSync('./day4_input.txt')
  .toString()
  .split('\n')
  .map((el) => el.split(','));

function fullyContain(elf1, elf2) {
  const [s1, e1] = elf1.split('-');
  const [s2, e2] = elf2.split('-');
  const elf1Contains2 = Number(s1) <= Number(s2) && Number(e1) >= Number(e2);
  const elf2Contains1 = Number(s2) <= Number(s1) && Number(e2) >= Number(e1);
  return elf1Contains2 | elf2Contains1;
}

let n = 0;
inputs.forEach(([elf1, elf2]) => {
  if (fullyContain(elf1, elf2)) {
    n += 1;
  }
});

console.log(n);

function haveOverlap(elf1, elf2) {
  const [s1, e1] = elf1.split('-');
  const [s2, e2] = elf2.split('-');
  const overlapStart = Math.max(Number(s1), Number(s2));
  const overlapEnd = Math.min(Number(e2), Number(e1));
  return overlapStart <= overlapEnd;
}

let m = 0;
inputs.forEach(([elf1, elf2]) => {
  if (haveOverlap(elf1, elf2)) {
    m += 1;
  }
});

console.log(m);
