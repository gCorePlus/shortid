import shortid from '../lib';
shortid.setAlphabet('ABC');

let seed;
do {
  seed = shortid.next(seed, 3);
  console.log(seed); // AAA, AAB, AAC ...... CCC
} while (seed !== 'CCC');
