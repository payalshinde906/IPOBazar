/**
 * Jest configuration for the IPOBazar client.
 *
 * `jest-expo` is Expo's official preset: it configures Babel, the React Native
 * transform and the platform mocks needed to run component tests in Node.
 *
 * @type {import('jest').Config}
 */
module.exports = {
  preset: 'jest-expo',
  // Only our own source is measured; node_modules and config files are ignored.
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
};
