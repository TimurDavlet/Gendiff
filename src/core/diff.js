/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
import _ from 'lodash';
import { valueIsObj, objHasKey } from '../utils/utils.js';

const genDiff = (obj1, obj2) => {
  const keys = _.orderBy(Object.keys({ ...obj1, ...obj2 }));
  return keys.reduce((resultObj, key) => {
    const hasKey1 = objHasKey(obj1, key);
    const hasKey2 = objHasKey(obj2, key);
    const value1IsObj = valueIsObj(obj1, key);
    const value2IsObj = valueIsObj(obj2, key);
    if (!hasKey2) {
      return { ...resultObj, [`- ${key}`]: value1IsObj ? genDiff(obj1[key], obj1[key]) : obj1[key] };
    }
    if (!hasKey1) {
      return { ...resultObj, [`+ ${key}`]: value2IsObj ? genDiff(obj2[key], obj2[key]) : obj2[key] };
    }
    if (value1IsObj && value2IsObj) {
      return { ...resultObj, [`  ${key}`]: genDiff(obj1[key], obj2[key]) };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        ...resultObj,
        [`- ${key}`]: value1IsObj ? genDiff(obj1[key], obj1[key]) : obj1[key],
        [`+ ${key}`]: value2IsObj ? genDiff(obj2[key], obj2[key]) : obj2[key],
      };
    }
    return { ...resultObj, [`  ${key}`]: obj1[key] };
  }, {});
};

export default genDiff;
