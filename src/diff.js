/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
import { parsingDoc } from './parsers.js';
// import { readFileSync, writeFileSync } from 'fs';

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
  const fileBefore = parsingDoc(filePathBefore);
  const fileAfter = parsingDoc(filePathAfter);
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
  // console.log(`{\n${result.join('\n')}\n}`);
  return `{\n${result.join('\n')}\n}`;
};

export default diff;
// console.log(`Current directory: ${process.cwd()}`);
// console.log(path.resolve('/home/js'))
// console.log(diff('file1.json', 'file2.json'));
// test
