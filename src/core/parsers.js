/* eslint-disable consistent-return */
import yaml from 'js-yaml';
import path from 'path';
import { readFileSync } from 'fs';

const getFilePath = (notes) => {
  const dirname = path.dirname(notes);
  const basename = path.basename(notes);
  const resolve = path.resolve();
  if (dirname === '.') {
    return path.join(resolve, basename);
  } if (dirname.substr(0, 1) === '/') {
    return path.join(dirname, basename);
  }
  return path.join(resolve, dirname, basename);
};

export default (notes) => {
  try {
    const filePath = getFilePath(notes);
    const readFile = readFileSync(filePath, 'utf8');
    if (notes.endsWith('yaml') || notes.endsWith('yml')) {
      return yaml.load(readFile);
    } if (notes.endsWith('json')) {
      return JSON.parse(readFile);
    }
  } catch (err) {
    console.log(err);
  }
};
// console.log(parsingDoc('fileyaml1.yaml'));
