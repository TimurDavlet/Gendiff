#!/usr/bin/env node

import commander from 'commander';
import genDiff from './src/diff.js';

const { program } = commander;

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  })
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
