const assert = require('chai').assert;
const anagram = require('../solution');
const dictionary = require('./dictionary');
const query = require('./query');
const output = require('./output');

describe('Test anagram', () => {
  it('should equal output', () => {
    assert.deepEqual(anagram(dictionary, query), output);
  });
});
