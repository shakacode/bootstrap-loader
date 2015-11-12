import fs from 'fs';

export default file => {
  try {
    return fs.statSync(file).isFile();
  } catch (error) {
    return false;
  }
};
