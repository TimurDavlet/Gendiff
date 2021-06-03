import plain from './plain.js';
import stylish from './stylish.js';
import jsonFormatter from './json.js';

const chooseFormatter = (formatter) => {
  if (formatter === 'plain') {
    return plain;
  }
  if (formatter === 'json' || formatter === 'JSON') {
    return jsonFormatter;
  }
  return stylish;
};

export default chooseFormatter;
