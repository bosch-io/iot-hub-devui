/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/**
 * This file was adapted from the react-scripts package of the project bootstrapping
 * library Create React App by Facebook
 * https://github.com/facebook/create-react-app/tree/master/packages/react-scripts
 */
"use strict";

const path = require("path");

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      return `module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ReactComponent: () => ${assetFilename},
      };`;
    }

    return `module.exports = ${assetFilename};`;
  }
};
