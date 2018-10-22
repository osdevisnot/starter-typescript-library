// For a detailed explanation regarding each configuration property, visit: https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true, // Automatically clear mock calls and instances between every test
  coverageDirectory: 'docs', // The directory where Jest should output its coverage files
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'], // An array of regexp pattern strings used to skip coverage collection
  coverageReporters: ['text', 'lcov'], // A list of reporter names that Jest uses when writing coverage reports
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'], // An array of file extensions your modules use
  testEnvironment: 'node', // The test environment that will be used for testing
  testMatch: ['**/__tests__/**/*.(js|ts)?(x)', '**/?(*.)+(spec|test).(js|ts)?(x)'], // The glob patterns Jest uses to detect test files
  transform: { '.(ts|tsx)': 'ts-jest' } // A map from regular expressions to paths to transformers
}
