import { readFileSync } from 'fs';
import buildDiff from './core/diff.js';
import parsingDoc from './core/parsers.js';
import chooseFormatter from './formatters/index.js';
import { getFormatFile, getAbsolutePath } from './core/path.js';

const expo = (filepath1, filepath2, formatName = 'stylish') => {
  const absolutePath1 = getAbsolutePath(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);
  const formatFile1 = getFormatFile(filepath1);
  const formatFile2 = getFormatFile(filepath2);
  try {
    const fileData1 = readFileSync(absolutePath1, 'utf8');
    const fileData2 = readFileSync(absolutePath2, 'utf8');
    const parsingFileData1 = parsingDoc(fileData1, formatFile1);
    const parsingFileData2 = parsingDoc(fileData2, formatFile2);
    const difference = buildDiff(parsingFileData1, parsingFileData2);
    return chooseFormatter(formatName)(difference);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default expo;
