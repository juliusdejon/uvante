module.exports = {
  preset: "react-native",
  moduleNameMapper: {
    "^components/(.*)$": "<rootDir>/components/$1",
    "^app/(.*)$": "<rootDir>/app/$1",
    "^containers/(.*)$": "<rootDir>/containers/$1",
    "^hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@/config/(.*)$": "<rootDir>/config/$1",
    "^@/api/(.*)$": "<rootDir>/api/$1",
    "^contexts/(.*)$": "<rootDir>/contexts/$1",
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@testing-library)/)",
  ],
};
