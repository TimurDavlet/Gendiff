/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import diff from '../src/core/diff.js';
import stylish from '../src/formatters/stylish.js';
import { parsingDoc } from '../src/core/parsers.js';

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

const ComparisonOfAttachedFiles = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('diffJSON', () => {
  const jsonBefore = parsingDoc(getFixturePath('file1.json'));
  const jsonAfter = parsingDoc(getFixturePath('file2.json'));
  const object = diff(jsonBefore, jsonAfter);
  expect(stylish(object)).toEqual(flatFileComparisonResultJSON);
});
test('diffYAML', () => {
  const jsonBefore = parsingDoc(getFixturePath('fileyaml1.yaml'));
  const jsonAfter = parsingDoc(getFixturePath('fileyaml2.yaml'));
  const object = diff(jsonBefore, jsonAfter);
  expect(stylish(object)).toEqual(flatFileComparisonResultYAML);
});
test('differenceRecursion', () => {
  const jsonBefore = parsingDoc(getFixturePath('fileWithNestedStructure1.json'));
  const jsonAfter = parsingDoc(getFixturePath('fileWithNestedStructure2.json'));
  const object = diff(jsonBefore, jsonAfter);
  expect(stylish(object)).toEqual(ComparisonOfAttachedFiles);
});
