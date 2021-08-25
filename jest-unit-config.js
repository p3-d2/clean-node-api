const config = require('./jest.config')

module.exports = {
  ...config,
  testMatch: config.testMatch = ['**/*.unit.js'],
  displayName: 'unit'
}
