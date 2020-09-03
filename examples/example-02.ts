import shortid from '../lib';
shortid.setAlphabet('ABC');

let seed;
do {
  seed = shortid.next(seed);
  console.log(seed); // A, B, C, AA, AB, AC, BA, BB, BC, CA, CB, CC, AAA
} while (seed !== 'AAA');
