import { readFileSync } from 'fs';
import path from 'path';
import buildDiff from './core/diff.js';
import parsingDoc from './core/parsers.js';
import chooseFormatter from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const absolutePath1 = path.resolve(filepath1);
  const absolutePath2 = path.resolve(filepath2);
  const formatFile1 = path.extname(filepath1);
  const formatFile2 = path.extname(filepath2);
  const fileData1 = readFileSync(absolutePath1, 'utf8');
  const fileData2 = readFileSync(absolutePath2, 'utf8');
  const parsingFileData1 = parsingDoc(fileData1, formatFile1);
  const parsingFileData2 = parsingDoc(fileData2, formatFile2);
  const difference = buildDiff(parsingFileData1, parsingFileData2);
  return chooseFormatter(formatName, difference);
};
