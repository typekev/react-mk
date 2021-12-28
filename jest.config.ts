import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  verbose: true,
  testURL: 'http://localhost/',
};

export default config;
