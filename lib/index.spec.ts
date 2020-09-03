import shortid from './index';

describe('shortid', () => {

  describe('random', () => {
    it('should generate random one character', () => {
      const value = shortid.random();

      expect(value).toBeDefined();
      expect(value.length).toEqual(1);
    });

    it('should generate random five character', () => {
      const minlen = 5;
      const value = shortid.random(minlen);

      expect(value).toBeDefined();
      expect(value.length).toEqual(5);
    });
  });

  describe('next', () => {
    it('should return first shortid', () => {
      const current = undefined;
      const expected = '0';
      const value = shortid.next(current);

      expect(value).toBeDefined();
      expect(value).toEqual(expected);
    });

    it('should return next shortid from given seed', () => {
      const current = 'a';
      const expected = 'b';
      const value = shortid.next(current);

      expect(value).toBeDefined();
      expect(value).toEqual(expected);
    });

    it('should return next shortid from given seed with four chars length', () => {
      const current = 'aaaa';
      const expected = 'aaab';
      const value = shortid.next(current);

      expect(value).toBeDefined();
      expect(value).toEqual(expected);
    });

    it('should return next shortid from alphabetic char', () => {
      const current = '----';
      const expected = '00000';
      const value = shortid.next(current);

      expect(value).toBeDefined();
      expect(value).toEqual(expected);
    });

    it('should return first shortid with minlen 5', () => {
      const current = undefined;
      const minlen = 5;
      const expected = '00000';
      const value = shortid.next(current, minlen);

      expect(value).toBeDefined();
      expect(value).toEqual(expected);
    });

    it('should return next shortid with minlen 5', () => {
      const current = 'aaaaa';
      const minlen = 5;
      const expected = 'aaaab';
      const value = shortid.next(current, minlen);

      expect(value).toBeDefined();
      expect(value).toEqual(expected);
    });

    it('should return next four shortids', () => {
      const currents = ['aaaaa', 'aasaa', 'a123s-_', 'adf3s-'];
      const expects = ['aaaab', 'aasab', 'a123s--', 'adf3t0'];

      const values = currents.map(shortid.next);

      expect(values).toBeDefined();

      values.forEach((value, index) => {
        expect(value).toEqual(expects[index]);
      });
    });
  });

  describe('setAlphabet', () => {
    it('should return next three shortids with "undefined" different alphabet', () => {
      shortid.setAlphabet(undefined);

      const current = 'a';
      const expected = 'b';
      const value = shortid.next(current);

      expect(value).toBeDefined();
      expect(value).toEqual(expected);
      });

    it('should return next three shortids with different alphabet', () => {
      shortid.setAlphabet('01234');

      const currents = ['032', '332', '444'];
      const expects = ['033', '333', '0000'];

      const values = currents.map(shortid.next);

      expect(values).toBeDefined();

      values.forEach((value, index) => {
        expect(value).toEqual(expects[index]);
      });
    });
  });
});
