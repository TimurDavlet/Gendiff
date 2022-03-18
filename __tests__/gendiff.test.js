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

const resultStylish = readFileSync(getFixturePath('expectedComplex.txt'), 'utf8');

const resultPlain = readFileSync(getFixturePath('expectedComplexPlain.txt'), 'utf8');

const resultJson = readFileSync(getFixturePath('expectedComplexJSON.txt'), 'utf8');

const extensions = ['json', 'yml'];

describe('Comparison of complex files in different formats', () => {
  test.each(extensions)(`format check ${extensions}`, (extension) => {
    const beforeFullPath = `${process.cwd()}/__fixtures__/before.${extension}`;
    const afterFullPath = `${process.cwd()}/__fixtures__/after.${extension}`;

    expect(genDiff(beforeFullPath, afterFullPath, 'stylish')).toEqual(resultStylish.toString());
    expect(genDiff(beforeFullPath, afterFullPath, 'plain')).toEqual(resultPlain.toString());
    expect(genDiff(beforeFullPath, afterFullPath, 'json')).toEqual(resultJson.toString());
  });
});
