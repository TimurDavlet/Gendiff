import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const flatFileComparisonResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('diff', () => {
  const jsonBefore = getFixturePath('file1.json');
  const jsonAfter = getFixturePath('file2.json');
  expect(diff(jsonBefore, jsonAfter)).toEqual(flatFileComparisonResult);
});
