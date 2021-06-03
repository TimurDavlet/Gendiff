import { valueIsObj, valueIsStr } from '../utils/utils.js';

const formattedValue = (obj, key) => {
  if (valueIsObj(obj, key)) {
    return '[complex value]';
  }
  if (valueIsStr(obj, key)) {
    return `'${obj[key]}'`;
  }
  return obj[key];
};

const plain = (obj) => {
  const iter = (objX, complexKey = '') => {
    const keys = Object.keys(objX);
    return keys.reduce((accumulatedArr, key) => {
      const clearKey = key.substring(2);
      const plusKey = `+ ${clearKey}`;
      const minusKey = `- ${clearKey}`;
      const fullPath = `${complexKey}${clearKey}`;
      const startPhrase = `Property '${fullPath}' was`;
      if (key.startsWith('  ') && valueIsObj(objX, key)) {
        return [...accumulatedArr, iter(objX[key], `${fullPath}.`)];
      } if (key.startsWith('- ') && keys.includes(plusKey)) {
        return [...accumulatedArr, `${startPhrase} updated. From ${formattedValue(objX, minusKey)} to ${formattedValue(objX, plusKey)}`];
      } if (key.startsWith('- ') && !keys.includes(plusKey)) {
        return [...accumulatedArr, `${startPhrase} removed`];
      } if (key.startsWith('+ ') && !keys.includes(minusKey)) {
        return [...accumulatedArr, `${startPhrase} added with value: ${formattedValue(objX, plusKey)}`];
      }
      return accumulatedArr;
    }, []);
  };
  return iter(obj).flat(Infinity).join('\n');
};

export default plain;
