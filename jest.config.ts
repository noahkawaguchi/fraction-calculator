import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  // moduleNameMapper: {
  //   '^@components/(.*)$': '<rootDir>/src/components/$1',
  //   '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  // },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
