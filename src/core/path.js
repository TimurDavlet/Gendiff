import { readFileSync } from 'fs';
import path from 'path';

export const generatePath = (filePath) => path.resolve(process.cwd(), filePath);

export const getExtname = (filePath) => path.extname(filePath);

export const readFile = (filePath) => readFileSync(filePath, 'utf8');
