/* eslint-disable jest/no-conditional-expect */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedComplex = readFileSync(getFixturePath('expectedComplex.txt'), 'utf8');

const expectedComplexPlain = readFileSync(getFixturePath('expectedComplexPlain.txt'), 'utf8');

const expectedComplexJSON = readFileSync(getFixturePath('expectedComplexJSON.txt'), 'utf8');

const extensions = [['json'], ['yml'], ['plain']];

describe('Comparison of complex files in different formats', () => {
  test.each(extensions)('json, yaml, plain', (extension) => {
    const beforeFullPath = `${process.cwd()}/__fixtures__/before.${extension}`;
    const afterFullPath = `${process.cwd()}/__fixtures__/after.${extension}`;
    const result = genDiff(beforeFullPath, afterFullPath);

    // eslint-disable-next-line default-case
    switch (extension) {
      case 'yml':
        expect(result).toBe(expectedComplex);
        break;
      case 'plain':
        expect(result).toBe(expectedComplexPlain);
        break;
      case 'json':
        expect(result).toBe(expectedComplexJSON);
        break;
    }
  });
});
