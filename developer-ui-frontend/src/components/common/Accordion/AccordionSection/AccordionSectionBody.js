/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Measure from "react-measure";
import { Motion, spring, presets } from "react-motion";

const AnimationWrapper = styled.div`
  overflow: hidden;
`;

export default class AccordionSectionBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: -1
    };
  }

  render() {
    const { expanded, children, sticky } = this.props;
    const { height } = this.state;
    return !sticky ? (
      <Measure
        scroll
        onResize={contentRect => {
          this.setState({ height: contentRect.scroll.height });
        }}>
        {({ measureRef }) => (
          <Motion
            style={{
              height: spring(expanded ? height : 0, presets.noWobble)
            }}
            defaultStyle={{ height: 0 }}>
            {interpolatingStyle => (
              <AnimationWrapper style={interpolatingStyle}>
                <div className="measuring-container" ref={measureRef}>
                  {children}
                </div>
              </AnimationWrapper>
            )}
          </Motion>
        )}
      </Measure>
    ) : (
      children
    );
  }
}

AccordionSectionBody.propTypes = {
  expanded: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  sticky: PropTypes.bool
};
