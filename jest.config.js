module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    mockData: '<rootDir>/src/tests/__mocks__',
    mockService: '<rootDir>/src/tests/__mocks__'
  },
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      branches: 71,
      functions: 61.0,
      lines: 80.0
    }
  }
};
