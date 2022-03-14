import plain from './plain.js';
import stylish from './stylish.js';
import jsonFormatter from './json.js';

const chooseFormatter = (format, diff) => {
  if (format === 'plain') {
    return plain(diff);
  }
  if (format === 'json' || format === 'JSON') {
    return jsonFormatter(diff);
  }
  return stylish(diff);
};

export default chooseFormatter;
