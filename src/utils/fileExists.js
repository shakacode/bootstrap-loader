import fs from 'fs';

export default function(file) {
  try {
    return fs.statSync(file).isFile();
  } catch (error) {
    return false;
  }
}
