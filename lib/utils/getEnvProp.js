"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (prop, config) {
  var NODE_ENV = process.env.NODE_ENV;

  var configEnvSection = config.env && config.env[NODE_ENV];

  if (configEnvSection && prop in configEnvSection) {
    return configEnvSection[prop];
  }

  if (prop in config) {
    return config[prop];
  }

  return false;
};