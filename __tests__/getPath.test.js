/* eslint-disable no-underscore-dangle */
import { getFilePath } from '../src/parsers.js';

test('getFilePath', () => {
  const file1 = 'index.js';
  const file2 = 'src/index.js';
  const file3 = '/home/tim/frontend-project-lvl2/__tests__/src/index.js';
  const file4 = '';
  expect(getFilePath(file1)).toEqual('/home/tim/frontend-project-lvl2/index.js');
  expect(getFilePath(file2)).toEqual('/home/tim/frontend-project-lvl2/src/index.js');
  expect(getFilePath(file3)).toEqual('/home/tim/frontend-project-lvl2/__tests__/src/index.js');
  expect(getFilePath(file4)).toEqual('/home/tim/frontend-project-lvl2');
});
