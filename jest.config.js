module.exports = {
  preset: 'ts-jest',
  cacheDirectory: './node_modules/.cache/jest',
  clearMocks: true,
  collectCoverageFrom: [
    'bot/**/*.ts',
  ],
  testEnvironment: 'node',
  verbose: Boolean(process.env.CI),
};
