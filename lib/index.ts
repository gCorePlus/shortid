const DEFAULT_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
let _alphabet = DEFAULT_ALPHABET;

/**
 * Return next position from seed
 *
 * @param seed Seed to create current position map. if undefined it will return minimum
 * @param minlen Minimum characters to return
 */
const next = (seed?: string, minlen = 1): string => {
  let map = getMapFromSeed(seed, minlen);

  map = nextPosMap(map);
  return getSeedFromMap(map);
};

const setAlphabet = (alphabet: string | undefined) => {
  if (alphabet
    && alphabet.length > 0
    && alphabet !== DEFAULT_ALPHABET) {

    _alphabet = alphabet;
  }
};

const random = (minlen = 1): string => {
  return getSeedFromMap(Array(minlen).fill(0).map(randomAlphabet));
};

const randomAlphabet = () => {
  return Math.random() * _alphabet.length - 1;
};

/**
 * Get positions maps from see
 *
 * @param seed Seed to create current position map. if undefined it will return minimum
 * @param minlen Minimum characters to return
 */
const getMapFromSeed = (seed: string | undefined, minlen: number): number[] => {
  let result: number[];

  if (!seed) {
    result = [-1];
  } else {
    const array: string[] = seed.split('');

    result = array
      .map<number>((str) => _alphabet.indexOf(str))
    ;
  }

  // Fill up the remaining positions
  const remaining = minlen - result.length;
  if (remaining > 0) {
    Array(remaining)
      .fill(0)
      .forEach(() => result.unshift(0))
    ;
  }

  return result;
};

/**
 * Create Seed from current map
 *
 * @param map List of numbers represent position from full characters map
 */
const getSeedFromMap = (map: number[]): string => {
  const result = map
    .map<string>((pos) => _alphabet.charAt(pos))
    .join('')
  ;

  return result;
};

/**
 * Move current position map to next value
 * @param map
 */
const nextPosMap = (map: number[]): number[] => {
  // Move to next position
  let currentpos = map.length - 1;
  map[currentpos] += 1;

  // Check if reach the end of the characters map
  while (_alphabet.charAt(map[currentpos]) === '') {
    // if current pos is the beginning of the map - add new character
    if (_alphabet.charAt(map[currentpos]) === '' && currentpos === 0) {
      map.push(0);
    }

    map[currentpos] = 0;

    // set current pos to previous pos to check it value until end
    if (currentpos > 0) {
      currentpos -= 1;
      map[currentpos] += 1;
    }
  }

  return map;
};

export default {
  next: next,
  random: random,
  setAlphabet: setAlphabet
};
