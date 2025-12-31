export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.spec.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/backend/src/$1',
  },
  collectCoverageFrom: [
    'backend/src/**/*.ts',
    '!backend/src/main.ts',
    '!backend/src/**/*.entity.ts',
    '!backend/src/**/*.dto.ts',
  ],
};