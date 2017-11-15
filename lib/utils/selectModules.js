"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Turns Object with names of modules into Array of names of modules
 *
 * @param {Object} modules
 * @returns {string[]}
 */
exports.default = function (modules) {
  return Object.keys(modules).filter(function (module) {
    return modules[module];
  });
};