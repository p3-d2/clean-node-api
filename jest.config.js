const { resolve } = require('path')
const rootDir = resolve(__dirname)

module.exports = {
  rootDir,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig'],
  collectCoverageFrom: ['<rootDir>/src/**/*.js', '!<rootDir>/src/main/**'],
  testMatch: ['<rootDir>/src/**/*.integration.js', '<rootDir>/src/**/*.unit.js']
}
