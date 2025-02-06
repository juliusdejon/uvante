module.exports = {
  preset: "react-native",
  moduleNameMapper: {
    "^components/(.*)$": "<rootDir>/components/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@testing-library)/)",
  ],
};
