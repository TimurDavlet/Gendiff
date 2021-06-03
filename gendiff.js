#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from './src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, type = program.format) => {
    const difference = genDiff(filepath1, filepath2, type.format);
    console.log(difference);
  });

program.parse();
