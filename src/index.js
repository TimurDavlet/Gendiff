import buildDiff from './core/diff.js';
import parsingDoc from './core/parsers.js';
import getFormatted from './core/formatters/index.js';
import { generatePath, getExtname, readFile } from './core/path.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const absolutePath1 = generatePath(filepath1);
  const absolutePath2 = generatePath(filepath2);
  const formatFile1 = getExtname(filepath1).slice(1);
  const formatFile2 = getExtname(filepath2).slice(1);
  const fileData1 = readFile(absolutePath1, 'utf8');
  const fileData2 = readFile(absolutePath2, 'utf8');
  const parsingFileData1 = parsingDoc(formatFile1, fileData1);
  const parsingFileData2 = parsingDoc(formatFile2, fileData2);
  const difference = buildDiff(parsingFileData1, parsingFileData2);
  return getFormatted(formatName, difference);
};
