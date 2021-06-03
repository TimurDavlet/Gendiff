export const valueIsObj = (obj, key) => {
  const type = typeof obj[key];
  const isObj = obj[key] !== null && (type === 'object' || type === 'function');
  const isArr = Array.isArray(obj[key]);
  return isObj && !isArr;
};

// eslint-disable-next-line no-prototype-builtins
export const objHasKey = (obj, key) => obj.hasOwnProperty(key);

export const valueIsStr = (obj, key) => typeof obj[key] === 'string';
