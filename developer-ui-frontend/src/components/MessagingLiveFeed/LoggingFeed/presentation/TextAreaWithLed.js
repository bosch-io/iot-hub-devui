/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { TransitionMotion, Motion, spring } from "react-motion";
import Measure from "react-measure";
import { formatDateString } from "utils";
import ImmutablePropTypes from "react-immutable-proptypes";

export default class TextAreaWithLed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ledActive: false,
      newLineInterval: null,
      scrollTopEndPos: 0
    };
    this.formatNewLines = this.formatNewLines.bind(this);
    this.setNewlineInterval = this.setNewlineInterval.bind(this);
    this.formatOutput = this.formatOutput.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // We use the change indicating ledActive flag instead of the feeedLines prop to avoid the need of deep comparison
    if (nextProps.numberOfAllLogs > this.props.numberOfAllLogs) {
      this.setState({ ledActive: true }, () =>
        setTimeout(() => this.setState({ ledActive: false }), 200)
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.feedLines.size !== prevProps.feedLines.size) {
      const { scrollHeight, clientHeight } = this.textArea;
      /* eslint-disable react/no-did-update-set-state  */
      this.setState({ scrollTopEndPos: scrollHeight - clientHeight });
    }
  }

  setNewlineInterval(contentRect) {
    const charWidth =
      parseInt(
        window
          .getComputedStyle(this.textArea, null)
          .getPropertyValue("font-size"),
        10
      ) * 0.6; // 0.6 * font-size on monospace font = charWidth
    const textAreaWidth = contentRect.client.width;
    const newLineInterval = parseInt(textAreaWidth / charWidth, 10) - 3; // 3 spaces are prepended
    this.setState({ newLineInterval });
  }

  formatNewLines(concatedString) {
    let concatedStringWithNewlines = "";
    let charsSinceNewline = 0;
    for (let i = 0; i < concatedString.length; i++) {
      const currentChar = concatedString.charAt(i);
      concatedStringWithNewlines += currentChar;
      if (currentChar === "\n") {
        charsSinceNewline = 0;
      } else if (
        i !== 0 &&
        charsSinceNewline - this.state.newLineInterval === 0
      ) {
        concatedStringWithNewlines += "\n   ";
        charsSinceNewline = 0;
      } else {
        charsSinceNewline++;
      }
    }
    return concatedStringWithNewlines;
  }

  formatOutput() {
    return this.props.feedLines
      .map(log => {
        const time = log.get("time");
        const type = log.getIn(["message", "type"]);
        const content = String(log.getIn(["message", "content"]));
        const contentType = log.getIn(["message", "contentType"]);
        const deviceId = log.getIn(["message", "deviceId"]);
        const concatedString =
          "✉ " +
          formatDateString(time) +
          "\n" +
          "   ▸ " +
          type +
          " message from " +
          deviceId +
          " of type " +
          contentType +
          ": " +
          content +
          "\n";
        return this.formatNewLines(concatedString);
      })
      .toJS()
      .join("");
  }

  render() {
    const { scrollTopEndPos } = this.state;
    const { feedLines, showLoadingSpinner, scrollAnimationActive } = this.props;
    const output = this.state.newLineInterval
      ? this.formatOutput(feedLines)
      : feedLines.join("");

    return (
      <div id="feedContainer">
        <form acceptCharset="UTF-8">
          <div id="feedContainerInner">
            <div
              className={this.state.ledActive ? "blink" : ""}
              id="statusLed"
            />
            <Motion
              style={
                scrollAnimationActive
                  ? {
                      scrollTop: spring(scrollTopEndPos, {
                        stiffness: 500,
                        damping: 50
                      })
                    }
                  : { scrollTop: scrollTopEndPos }
              }
            >
              {interpolStyles => (
                <Measure
                  client
                  onResize={contentRect => this.setNewlineInterval(contentRect)}
                  innerRef={ref => {
                    this.textArea = ref;
                  }}
                >
                  {({ measureRef }) => (
                    <TextArea
                      measureRef={measureRef}
                      forwardedRef={this.textArea}
                      id="feed"
                      className={showLoadingSpinner ? "disconnected" : null}
                      cols="50"
                      readOnly
                      scrollTop={interpolStyles.scrollTop}
                      value={output}
                    />
                  )}
                </Measure>
              )}
            </Motion>
            {/* Fade the loader in and out with a mount/unmount transition */}
            <TransitionMotion
              willLeave={() => ({ opacity: spring(0) })}
              willEnter={() => ({ opacity: spring(1) })}
              config={{ stiffness: 210, damping: 20 }}
              styles={
                showLoadingSpinner
                  ? [
                      {
                        key: "spinner",
                        style: { opacity: 1 }
                      }
                    ]
                  : []
              }
            >
              {interpolatedStyles => (
                <Fragment>
                  {interpolatedStyles.map(config => (
                    <div
                      className="loader-container"
                      key={config.key}
                      style={{
                        opacity: config.style.opacity
                      }}
                    >
                      <span>Disconnected</span>
                    </div>
                  ))}
                </Fragment>
              )}
            </TransitionMotion>
          </div>
        </form>
      </div>
    );
  }
}
/* eslint-disable react/no-multi-comp */
class TextArea extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.scrollTop !== this.props.scrollTop) {
      this.props.forwardedRef.scrollTop = this.props.scrollTop;
    }
  }
  render() {
    /* eslint-disable no-unused-vars */
    const { measureRef, scrollTop, forwardedRef, ...props } = this.props;
    /* eslint-enable */
    return <textarea ref={measureRef} {...props} />;
  }
}

TextArea.propTypes = {
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  measureRef: PropTypes.func,
  id: PropTypes.string,
  scrollTop: PropTypes.number,
  className: PropTypes.string,
  cols: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  scrollAnimationActive: PropTypes.bool
};

// feedLines has to be passed as immutable prop type for deep comparison in componentWillReceiveProps
TextAreaWithLed.propTypes = {
  scrollAnimationActive: PropTypes.bool,
  feedLines: ImmutablePropTypes.list,
  numberOfAllLogs: PropTypes.number.isRequired,
  showLoadingSpinner: PropTypes.bool
};
