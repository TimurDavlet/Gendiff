import plain from './plain.js';
import stylish from './stylish.js';
import jsonFormatter from './json.js';

const formatters = { stylish, json: jsonFormatter, plain };

export default (format, diff) => {
  const formatter = formatters[format];
  if (!formatter) {
    throw new Error('unsupported format');
  }
  return formatter(diff);
};
