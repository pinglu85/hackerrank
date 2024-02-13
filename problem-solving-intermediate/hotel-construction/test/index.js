import path from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { createReadStream } from 'fs';
import { assert } from 'chai';

import numberOfWays1 from '../solution1.js';
import numberOfWays2 from '../solution2.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testCasesDirPath = path.join(__dirname, 'test-cases');

const tests = await generateTests();

describe('Test numberOfWays1()', () => {
  tests.forEach(({ name, input, output }) => {
    it(name, () => {
      const result = numberOfWays1(input);
      assert.strictEqual(result, output);
    });
  });
});

describe('Test numberOfWays2()', () => {
  tests.forEach(({ name, input, output }) => {
    it(name, () => {
      const result = numberOfWays2(input);
      assert.strictEqual(result, output);
    });
  });
});

async function generateTests() {
  try {
    const files = await readdir(testCasesDirPath);
    const inputCount = files.length / 2;
    const tests = [];

    for (let i = 0; i < inputCount; i++) {
      const input = await readInput(files[i]);
      const output = await readOutput(files[i + inputCount]);

      tests.push({
        name: `Test Case ${i}`,
        input,
        output,
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
    const roads = [];
    for await (const line of rl) {
      const [from, to] = line.trim().split(' ');
      if (!to) continue;
      roads.push([Number(from), Number(to)]);
    }

    return roads;
  } catch (err) {
    console.error(err);
  }
}

async function readOutput(filename) {
  const rl = initReadline(filename);

  try {
    for await (const line of rl) {
      return Number(line.trim());
    }
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
