/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
// Velocity Animations
require("velocity-animate");
require("velocity-animate/velocity.ui");
import { velocityHelpers } from "velocity-react";

// Use a staggered effect for the device panel items
export const ExpandAnimations = {
  collapse: velocityHelpers.registerEffect({
    defaultDuration: 500,
    calls: [
      [
        { flexGrow: [0, 0], scaleX: [0, 0], minWidth: 0 },
        1,
        { delay: 200, easing: "ease-in" }
      ]
    ]
  }),
  expand: velocityHelpers.registerEffect({
    defaultDuration: 500,
    calls: [[{ flexGrow: [2, 2], scaleX: [1, 1] }, 1, { easing: "ease-in" }]]
  })
};
