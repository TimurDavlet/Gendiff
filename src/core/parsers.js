import yaml from 'js-yaml';

const formatters = { yaml: yaml.load, json: JSON.parse, yml: yaml.load };

const parsing = (format, data) => {
  const formatter = formatters[format];
  if (!formatter) {
    throw new Error('unsupported file extension');
  }
  return formatter(data);
};

export default parsing;
