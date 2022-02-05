import yaml from 'js-yaml';

const parsing = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    default:
      return null;
  }
};

export default parsing;
