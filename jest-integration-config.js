const config = require('./jest.config')

module.exports = {
  ...config,
  testMatch: config.testMatch = ['<rootDir>/src/**/*.integration.js'],
  displayName: 'integration'
}
