const config = require('./jest.config');

module.exports = {
  ...config,
  testTimeout: 60000,
  testRegex: '__integration__/[^/.]+\\.spec\\.ts$',
};
