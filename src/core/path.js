import path from 'path';

export const getAbsolutePath = (name) => path.resolve(name);

export const getFormatFile = (name) => path.extname(name);
