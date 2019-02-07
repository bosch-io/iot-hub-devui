/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
module.exports = {
  moduleDirectories: ["src", "node_modules"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|ico|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(s?css|sass|less)$": "<rootDir>/src/__mocks__/styleMock.js"
  },
  setupFiles: ["react-app-polyfill/jsdom", "./config/jest/jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ]
};
