/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['<rootDir>/**/*.spec.ts'],
  transform: { '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }] },
  moduleNameMapper: { '^@app/(.*)$': '<rootDir>/../../src/$1/index.ts' },
  collectCoverageFrom: [
    '<rootDir>/../../src/{domain,application}/**/*.ts',
    '!**/index.ts',
    '!**/dist/**',
  ],
};
