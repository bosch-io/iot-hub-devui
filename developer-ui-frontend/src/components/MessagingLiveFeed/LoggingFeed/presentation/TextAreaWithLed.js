/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import Velocity from "velocity-react/lib/velocity-animate-shim";
import PropTypes from "prop-types";
import { formatDateString } from "utils";
import ImmutablePropTypes from "react-immutable-proptypes";
import Spinner from "components/common/Spinner";

export default class TextAreaWithLed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ledActive: false
    };
    this.formatNewLines = this.formatNewLines.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // We use the change indicating ledActive flag instead of the feeedLines prop to avoid the need of deep comparison
    if (nextProps.feedLines.size > this.props.feedLines.size) {
      this.setState({ ledActive: true }, () =>
        setTimeout(() => this.setState({ ledActive: false }), 200)
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.feedLines.size !== prevProps.feedLines.size) {
      // On Feed Changes, scroll to the bottom
      const scrollOffset =
        this.textArea.scrollHeight -
        (this.textArea.scrollTop + this.textArea.clientHeight);
      Velocity(this.textArea, "scroll", {
        duration: this.props.scrollAnimationActive ? 100 : 0,
        container: this.textArea,
        offset: scrollOffset + "px",
        queue: false,
        mobileHA: false
      });
    }
  }

  formatNewLines(concatedString) {
    // TODO: Use this after state normalization and log aggregation refactoring
    let concatedStringWithNewlines;
    const charWidth =
      parseInt(
        window
          .getComputedStyle(this.textArea, null)
          .getPropertyValue("font-size"),
        10
      ) * 0.555; // 0.55 * font-size on monospace font = charWidth
    const textAreaWidth = this.textArea.clientWidth;
    for (let i = 0; i < concatedString.length; i++) {
      concatedStringWithNewlines += concatedString.charAt(i);
      if (i % (textAreaWidth / charWidth) === 0) {
        console.log("NewLine after", i, "characters");
        concatedStringWithNewlines += "§"; // TODO: Replace with \n
      }
    }
    return concatedStringWithNewlines;
  }

  render() {
    const { feedLines, showLoadingSpinner } = this.props;
    const output = feedLines
      .map(log => {
        const time = log.get("time");
        const type = log.getIn(["message", "type"]);
        const content = JSON.stringify(log.getIn(["message", "content"]));
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
        return concatedString;
      })
      .toJS();

    return (
      <div id="feedContainer">
        <form acceptCharset="UTF-8">
          <div id="feedContainerInner">
            <div
              className={this.state.ledActive ? "blink" : ""}
              id="statusLed"
            />
            <textarea
              id="feed"
              className={showLoadingSpinner ? "disconnected" : null}
              cols="50"
              ref={textarea => {
                this.textArea = textarea;
              }}
              readOnly
              value={output.join("")}
            />
            {showLoadingSpinner && (
              <div className="loader-container">
                <Spinner type="bubbles" />
                <span>Connecting ...</span>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

// feedLines has to be passed as immutable prop type for deep comparison in componentWillReceiveProps
TextAreaWithLed.propTypes = {
  scrollAnimationActive: PropTypes.bool,
  feedLines: ImmutablePropTypes.list,
  showLoadingSpinner: PropTypes.bool
};
