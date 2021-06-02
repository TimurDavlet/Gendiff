import genDiff from './core/diff.js';
import parsingDoc from './core/parsers.js';
import stylish from './formatters/stylish.js';
// import chooseFormatter from './formatters/index.js';

// eslint-disable-next-line consistent-return
export default (filepath1, filepath2, formatName = 'stylish') => {
  const difference = genDiff(parsingDoc(filepath1), parsingDoc(filepath2));
  if (formatName === 'stylish') {
    return stylish(difference);
  }
};
