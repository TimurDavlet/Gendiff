import path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const parsing = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const format = path.extname(filepath);

  try {
    const fileData = readFileSync(absolutePath, 'utf8');
    if (format === '.json') {
      return JSON.parse(fileData);
    }
    if (format === '.yml' || format === '.yaml') {
      return yaml.load(fileData);
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default parsing;
