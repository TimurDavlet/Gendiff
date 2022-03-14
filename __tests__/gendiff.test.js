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
/* const pathToFile5 = getFixturePath('fileComplex1.json');
const pathToFile6 = getFixturePath('fileComplex2.json');
test('Comparison of complex json files', () => {
  expect(genDiff(pathToFile5, pathToFile6)).toBe(expectedComplex);
});

const pathToFile7 = getFixturePath('fileComplex1.yml');
const pathToFile8 = getFixturePath('fileComplex2.yml');
test('Comparison of complex yml files', () => {
  expect(genDiff(pathToFile7, pathToFile8)).toBe(expectedComplex);
}); */

const expectedComplexPlain = readFileSync(getFixturePath('expectedComplexPlain.txt'), 'utf8');
/* test('Comparison of complex json files with PLAIN formatter', () => {
  expect(genDiff(pathToFile5, pathToFile6, 'plain')).toBe(expectedComplexPlain);
}); */

const expectedComplexJSON = readFileSync(getFixturePath('expectedComplexJSON.txt'), 'utf8');
/* test('Comparison of complex json files with JSON formatter', () => {
  expect(genDiff(pathToFile5, pathToFile6, 'json')).toBe(expectedComplexJSON);
}); */

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
