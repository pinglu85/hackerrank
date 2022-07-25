import path from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { createReadStream } from 'fs';
import { assert } from 'chai';

import stringAnagram from '../solution.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testCasesDirPath = path.join(__dirname, 'test-cases');

const tests = await generateTests();

describe('Test stringAnagram()', () => {
  tests.forEach(({ name, dictionary, query, expected }) => {
    it(name, () => {
      const result = stringAnagram(dictionary, query);
      assert.deepEqual(result, expected);
    });
  });
});

async function generateTests() {
  try {
    const files = await readdir(testCasesDirPath);
    const inputCount = files.length / 2;
    const tests = [];

    for (let i = 0; i < inputCount; i++) {
      const { dictionary, query } = await readInput(files[i]);
      const output = await readOutput(files[i + inputCount]);

      tests.push({
        name: `Test Case ${i}`,
        dictionary,
        query,
        expected: output,
      });
    }

    return tests;
  } catch (err) {
    console.error(err);
  }
}

async function readInput(filename) {
  const rl = initReadline(filename);

  try {
    const lines = [];
    for await (const line of rl) {
      lines.push(line.trim());
    }

    let i = 0;

    const dictionaryCount = Number(lines[i]);
    const dictionary = [];
    for (i = i + 1; i <= dictionaryCount; i++) {
      dictionary.push(lines[i]);
    }

    const query = [];
    for (i = i + 1; i < lines.length; i++) {
      query.push(lines[i]);
    }

    return {
      dictionary,
      query,
    };
  } catch (err) {
    console.error(err);
  }
}

async function readOutput(filename) {
  const rl = initReadline(filename);

  try {
    const output = [];
    for await (const line of rl) {
      output.push(Number(line.trim()));
    }

    return output;
  } catch (err) {
    console.error(err);
  }
}

function initReadline(filename) {
  const filepath = path.join(testCasesDirPath, filename);
  return readline.createInterface({
    input: createReadStream(filepath),
    crlfDelay: Infinity,
  });
}
