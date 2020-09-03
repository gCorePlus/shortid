import shortid from '../lib';

let seed;
do {
  seed = shortid.next(seed);
  console.log(seed); // 0, 1, 2 ...... AAA
} while (seed !== 'AAA');
