/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest", // Use ts-jest preset for TypeScript support
  testEnvironment: "node", // Set Node.js as the test environment
  moduleFileExtensions: ["ts", "js"], // Recognize TypeScript and JavaScript files
  testMatch: ["**/src/**/*.test.ts"], // Match test files with `.test.ts` suffix
  transform: {
    "^.+\\.ts$": "ts-jest", // Use ts-jest to transform TypeScript files
  },
  coverageProvider: "v8", // Use v8 for code coverage
  collectCoverage: true, // Enable code coverage collection
  coverageDirectory: "coverage", // Directory where coverage reports are saved
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ], // Ignore these paths when collecting coverage
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore these paths for tests
  verbose: true, // Show detailed test results
};

export default config;