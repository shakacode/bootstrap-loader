"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Creates Node require string
 *
 * @param {string} module
 * @returns {string}
 */
exports.default = function (module) {
  return "require (" + JSON.stringify(module) + ");";
};