/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const flatFileComparisonResultJSON = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const flatFileComparisonResultYAML = `{
  - follow: true
    host: ya.ru
  - proxy: 123.265.02.01
  - timeout: 70
  + timeout: 50
  + verbose: true
}`;

test('diffJSON', () => {
  const jsonBefore = getFixturePath('file1.json');
  const jsonAfter = getFixturePath('file2.json');
  expect(diff(jsonBefore, jsonAfter)).toEqual(flatFileComparisonResultJSON);
});
test('diffYAML', () => {
  const jsonBefore = getFixturePath('fileyaml1.yaml');
  const jsonAfter = getFixturePath('fileyaml2.yaml');
  expect(diff(jsonBefore, jsonAfter)).toEqual(flatFileComparisonResultYAML);
});
