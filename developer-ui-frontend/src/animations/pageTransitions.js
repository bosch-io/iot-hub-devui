/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { spring } from "react-router-transition";

const slowSpring = val =>
  spring(val, {
    stiffness: 100,
    damping: 20
  });

const fastSpring = val =>
  spring(val, {
    stiffness: 190,
    damping: 20
  });

// The transform value doesn't map 1:1 with the numerical interpolation -> embed in string
export const mapStyles = styles => ({
  opacity: styles.opacity,
  transform: `translate(${styles.translateX}vw, ${styles.translateY}vh)`
});

const slideTransition = {
  // start in a transparent state outside the view
  atEnter: {
    fromLeft: {
      opacity: 0,
      translateX: -25,
      translateY: 0
    },
    fromRight: {
      opacity: 0,
      translateX: 25,
      translateY: 0
    },
    fromBottom: {
      opacity: 0,
      translateX: 0,
      translateY: 25
    },
    noTransition: {
      opacity: 1,
      translateX: 0,
      translateY: 0
    }
  },
  // leave in the other direction with fade out
  atLeave: {
    toRight: {
      opacity: fastSpring(0),
      translateX: slowSpring(25),
      translateY: slowSpring(0)
    },
    toLeft: {
      opacity: fastSpring(0),
      translateX: slowSpring(-25),
      translateY: slowSpring(0)
    },
    toTop: {
      opacity: fastSpring(0),
      translateX: slowSpring(0),
      translateY: slowSpring(-25)
    }
  },
  // rest opaque and unshifted
  atActive: {
    opacity: fastSpring(1),
    translateX: slowSpring(0),
    translateY: slowSpring(0)
  }
};

export const mapLocationToTransitionSettings = (location, lastLocation) => {
  const isFirstPage = !lastLocation; // No transition on first page load!
  const redirectedFromFirstPage =
    lastLocation &&
    lastLocation.state &&
    lastLocation.state.redirectOriginFirst;
  const path = location.pathname;
  const settings = {
    atEnter: null,
    atLeave: null,
    atActive: slideTransition.atActive
  };

  if (isFirstPage || redirectedFromFirstPage) {
    settings.atEnter = slideTransition.atEnter.noTransition;
    settings.atLeave = slideTransition.atActive;
  } else {
    if (
      path.includes("feed") &&
      !path.includes("initial") &&
      !lastLocation.pathname.includes("initial")
    ) {
      settings.atEnter = slideTransition.atEnter.fromLeft;
      settings.atLeave = slideTransition.atLeave.toRight;
    } else if (
      path.includes("feed") &&
      !path.includes("initial") &&
      lastLocation.pathname.includes("initial")
    ) {
      settings.atEnter = slideTransition.atEnter.fromBottom;
      settings.atLeave = slideTransition.atLeave.toRight;
    } else if (path.includes("initial")) {
      settings.atEnter = slideTransition.atEnter.fromBottom;
      settings.atLeave = slideTransition.atLeave.toTop;
    } else {
      settings.atEnter = slideTransition.atEnter.fromRight;
      settings.atLeave = slideTransition.atLeave.toLeft;
    }
  }

  return settings;
};
