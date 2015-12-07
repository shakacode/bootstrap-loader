/* eslint no-console: 0 */

import chalk from 'chalk';

/**
 * Logger helper
 */
export default {

  /**
   * Logs output
   *
   * @param {...*} output
   */
  log(...output) {
    const pettyOutput = (
      [chalk.yellow('[bootstrap-loader]: ')].concat(output, '\n')
    );
    console.log(...pettyOutput);
  },

  /**
   * Logs debug info
   *
   * @param {...*} output
   */
  debug(...output) {
    if (__DEBUG__) this.log(...output);
  },

};
