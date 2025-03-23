module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: 'tsconfig.jest.json'
    }
  },
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
}