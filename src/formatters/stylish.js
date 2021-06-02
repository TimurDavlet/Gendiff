import { valueIsObj } from '../utils/utils.js';

const stylish = (obj, indentSize = 2) => {
  const keys = Object.keys(obj);
  const result = keys.reduce((accumArr, key) => {
    if (valueIsObj(obj, key)) {
      return [...accumArr, `${' '.repeat(indentSize)}${key}: ${stylish(obj[key], indentSize + 4)}`];
    }
    const formattedValue = String(obj[key]).trim();
    return [...accumArr, `${' '.repeat(indentSize)}${key}: ${formattedValue}`];
  }, ['{']);
  return [...result, `${' '.repeat(indentSize - 2)}}`].join('\n');
};

export default stylish;
