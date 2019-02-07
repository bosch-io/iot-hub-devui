/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/**
 * This file was adapted from the react-scripts package of the project bootstrapping
 * library Create React App by Facebook
 * https://github.com/facebook/create-react-app/tree/master/packages/react-scripts
 */
"use strict";

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process() {
    return "module.exports = {};";
  },
  getCacheKey() {
    // The output is always the same.
    return "cssTransform";
  }
};
