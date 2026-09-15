module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!((react-native|@react-native|@react-navigation)))',
  ],
  moduleNameMapper: {
    '\\.(ttf)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
