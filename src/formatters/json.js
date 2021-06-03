import valueIsObj from '../utils/utils.js';

const formatSpacedKeys = (obj) => {
  const result = Object.keys(obj)
    .map((key) => {
      const valueIsObject = valueIsObj(obj, key);
      return key.startsWith('  ')
        ? { [key.substring(2)]: valueIsObject ? formatSpacedKeys(obj[key]) : obj[key] }
        : { [key]: valueIsObject ? formatSpacedKeys(obj[key]) : obj[key] };
    });
  return Object.assign({}, ...result);
};

const jsonFormatter = (obj) => {
  const objWithoutSpacedKeys = formatSpacedKeys(obj);
  return JSON.stringify(objWithoutSpacedKeys, null, '  ');
};

export default jsonFormatter;
