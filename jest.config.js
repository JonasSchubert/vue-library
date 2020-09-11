module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/{!(index|*.plugin),}.{ts,vue}'
  ],
  coverageDirectory: './coverage/',
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 75,
      lines: 82.5,
      statements: 82.5
    }
  },
  moduleNameMapper: {
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: [
    'jest-localstorage-mock'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  transformIgnorePatterns: [
    "/node_modules(?![\\\\/]vuetify[\\\\/])/"
  ]
};
