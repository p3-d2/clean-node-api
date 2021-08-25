const config = require('./jest.config')

module.exports = {
  ...config,
  testMatch: config.testMatch = ['**/*.integration.js'],
  displayName: 'integration'
}
