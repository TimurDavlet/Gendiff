/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

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

// eslint-disable-next-line consistent-return
const parserJson = (notes) => {
  try {
    const filePath = getFilePath(notes);
    const readFile = readFileSync(filePath, 'utf8');
    return JSON.parse(readFile);
  } catch (err) {
    console.log(err);
  }
};

const compareProperties = (object1, object2, property) => {
  if (object1.hasOwnProperty(property) && object2.hasOwnProperty(property)) {
    if (object1[property] === object2[property]) {
      return { status: 'unchanged', name: property, value: object1[property] };
    }
    return {
      status: 'changed', name: property, oldValue: object1[property], newValue: object2[property],
    };
  }
  if (object1.hasOwnProperty(property)) {
    return { status: 'changed', name: property, oldValue: object1[property] };
  }
  return { status: 'changed', name: property, newValue: object2[property] };
};

const diff = (filePathBefore, filePathAfter) => {
  const fileBefore = parserJson(filePathBefore);
  const fileAfter = parserJson(filePathAfter);
  const keys = Object.keys({ ...fileAfter, ...fileBefore });
  const properties = keys.map((element) => compareProperties(fileBefore, fileAfter, element)).sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const result = properties.reduce((acc, element) => {
    if (element.status === 'unchanged') {
      acc.push(`    ${element.name}: ${element.value}`);
      return acc;
    }
    if (element.hasOwnProperty('oldValue') && element.hasOwnProperty('newValue')) {
      acc.push(`  - ${element.name}: ${element.oldValue}\n  + ${element.name}: ${element.newValue}`);
      return acc;
    }
    if (element.hasOwnProperty('oldValue')) {
      acc.push(`  - ${element.name}: ${element.oldValue}`);
      return acc;
    }
    acc.push(`  + ${element.name}: ${element.newValue}`);
    return acc;
  }, []);
  // console.log(result)
  return `{\n${result.join('\n')}\n}`;
};

export default diff;
// console.log(`Current directory: ${process.cwd()}`);
// console.log(path.resolve('/home/js'))
// console.log(diff('file1.json', 'file2.json'));
// test
