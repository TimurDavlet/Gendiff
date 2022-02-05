import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const renderPlain = (diff) => {
  const iter = (tree, path) => tree.flatMap((node) => {
    const {
      name, value, oldValue, type, children,
    } = node;

    const outputValue = stringify(value);
    const outputOldValue = stringify(oldValue);
    const currentPath = [...path, name];
    const currentPathStr = currentPath.join('.');

    switch (type) {
      case 'nested':
        return iter(children, currentPath);
      case 'add':
        return `Property '${currentPathStr}' was added with value: ${outputValue}`;
      case 'delete':
        return `Property '${currentPathStr}' was removed`;
      case 'updated':
        return `Property '${currentPathStr}' was updated. From ${outputOldValue} to ${outputValue}`;
      default:
        return [];
    }
  });

  return iter(diff, []).join('\n');
};

export default renderPlain;