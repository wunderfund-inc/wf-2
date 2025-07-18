module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: ["js", "vue", "json"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    // "<rootDir>/components/**/*.vue",
    "<rootDir>/components/**/*.js",
    "<rootDir>/content/**/*.js",
    // "<rootDir>/pages/**/*.vue",
    "<rootDir>/helpers/**/*.js",
  ],
};
