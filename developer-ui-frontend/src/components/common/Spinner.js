/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/loaderIcon.scss";
import React from "react";

const Spinner = ({ type }) => {
  let spinner;
  switch (type) {
    case "bubbles":
      spinner = (
        <div className="spinner">
          {" "}
          <div className="double-bounce1" />
          <div className="double-bounce2" />{" "}
        </div>
      );
      break;
    case "default":
      spinner = (
        <div className="sk-circle">
          <div className="sk-circle1 sk-child" />
          <div className="sk-circle2 sk-child" />
          <div className="sk-circle3 sk-child" />
          <div className="sk-circle4 sk-child" />
          <div className="sk-circle5 sk-child" />
          <div className="sk-circle6 sk-child" />
          <div className="sk-circle7 sk-child" />
          <div className="sk-circle8 sk-child" />
          <div className="sk-circle9 sk-child" />
          <div className="sk-circle10 sk-child" />
          <div className="sk-circle11 sk-child" />
          <div className="sk-circle12 sk-child" />
        </div>
      );
      break;
    default:
      return new Error(
        'Unknown type property "' +
          type +
          '". Use either "bubbles" or "default"'
      );
  }
  return spinner;
};

export default Spinner;
