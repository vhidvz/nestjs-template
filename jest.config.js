'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  modulePaths: ['<rootDir>'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../docs/coverage',
  testEnvironment: 'node',
};
