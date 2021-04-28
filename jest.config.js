module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'enzyme',
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '\\.less': 'identity-obj-proxy',
  },
};
