const config = require('./jest.config')

module.exports = {
  ...config,
  testMatch: config.testMatch = ['<rootDir>/src/**/*.unit.js'],
  displayName: 'unit'
}
