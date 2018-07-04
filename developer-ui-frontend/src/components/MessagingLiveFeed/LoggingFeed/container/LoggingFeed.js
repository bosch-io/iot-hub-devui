/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable */
import "styles/feed.scss";
import "styles/loaderIcon.scss";
import { connect } from "react-redux";
import TextAreaWithLed from "../presentation/TextAreaWithLed";
import {
  selectNumberOfFeedLines,
  selectAllLogs,
  selectScrollAnimationActive,
  selectHubConnected
} from "reducers/selectors";

const mapStateToProps = state => {
  const numberOfFeedLines = selectNumberOfFeedLines(state);
  const feedLines = selectAllLogs(state).slice(numberOfFeedLines * -1);
  const scrollAnimationActive = selectScrollAnimationActive(state);
  const showLoadingSpinner = !selectHubConnected(state);

  return { feedLines, scrollAnimationActive, showLoadingSpinner };
};

// TextAreas are read-only -> no mapDispatchToProps Method needed!
const LoggingFeed = connect(mapStateToProps)(TextAreaWithLed);

export default LoggingFeed;
