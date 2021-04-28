#!/usr/bin/env node

//import { CommanderError } from 'commander';
import commander from 'commander';

const { program } = commander;
// const newCommand = new commander.Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')

program.parse(process.argv);
