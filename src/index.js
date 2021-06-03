import genDiff from './core/diff.js';
import parsingDoc from './core/parsers.js';
import chooseFormatter from './formatters/index.js';

export default (filepath1, filepath2, formatName) => {
  const difference = genDiff(parsingDoc(filepath1), parsingDoc(filepath2));
  if (formatName) {
    return chooseFormatter(formatName)(difference);
  }
  return chooseFormatter()(difference);
};
