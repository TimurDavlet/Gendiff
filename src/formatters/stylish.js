import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (inputValue, depth) => {
  if (!_.isPlainObject(inputValue)) {
    return inputValue;
  }

  const obj = inputValue;
  const keys = Object.keys(obj);
  const indent = getIndent(depth);
  const braceIndent = getIndent(depth - 1);

  const innerPart = keys.map((key) => {
    const currentValue = obj[key];
    if (_.isPlainObject(currentValue)) {
      return `${indent}  ${key}: ${stringify(currentValue, depth + 1)}`;
    }

    return `${indent}  ${key}: ${currentValue}`;
  });

  return `{\n${innerPart.join('\n')}\n${braceIndent}  }`;
};

const renderStylish = (diff) => {
  const iter = (depth, node) => node.flatMap((child) => {
    const {
      name, value, type, oldValue, children,
    } = child;
    const indent = getIndent(depth);
    const nextLevelDepth = depth + 1;

    switch (type) {
      case 'nested':
        return `${indent}  ${name}: {\n${iter(nextLevelDepth, children)}\n${indent}  }`.split(',');
      case 'updated':
        return `${indent}- ${name}: ${stringify(oldValue, nextLevelDepth)}\n${indent}+ ${name}: ${stringify(value, nextLevelDepth)}`;
      case 'add':
        return `${indent}+ ${name}: ${stringify(value, nextLevelDepth)}`;
      case 'delete':
        return `${indent}- ${name}: ${stringify(value, nextLevelDepth)}`;
      case 'unchanged':
        return `${indent}  ${name}: ${value}`;
      default:
        throw new Error(`Unexpected condition ${type}. Please check the input data.`);
    }
  });

  const startDepth = 1;
  const innerPart = iter(startDepth, diff);

  return `{\n${innerPart.join('\n')}\n}`;
};

export default renderStylish;