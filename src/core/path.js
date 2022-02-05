import path from 'path';

export const getAbsolutePath = (name) => {
    return path.resolve(name);
  };
  
export const getFormatFile = (name) => {
    return path.extname(name);
  };