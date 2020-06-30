module.exports = {
  preset: 'ts-jest',
  cacheDirectory: './node_modules/.cache/jest',
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coveragePathIgnorePatterns : [
    '<rootDir>/.*/__test__/',
    '<rootDir>/.*/__integration__/',
  ],
  testEnvironment: 'node',
  verbose: Boolean(process.env.CI),
  testTimeout: 5000,
  testRegex: '__test__/[^/.]+\\.spec\\.ts$',
};
