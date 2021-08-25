const { resolve } = require('path')
const rootDir = resolve(__dirname)

module.exports = {
  rootDir,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  testMatch: ['<rootDir>/src/**/*.integration.js', '<rootDir>/src/**/*.unit.js']
}
