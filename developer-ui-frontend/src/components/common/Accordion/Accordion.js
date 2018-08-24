/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Measure from "react-measure";
import throttle from "lodash.throttle";

const FOOTER_HEIGHT = 40;

/* eslint-disable react/no-multi-comp */
// AccordionContainer constrains the dimensions if the maximum height gets exceeded
const AccordionContainer = styled.div`
  display: flex;
  max-height: 100%;
  width: 100%;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

// AccordionInner is the real dimension of the Accordion
const AccordionInner = styled.span`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  background-color: #ccc;
  /* Prevent blurryness */
  -webkit-font-smoothing: subpixel-antialiased;
  backface-visibility: hidden;
  transform: translateZ(0);
  ${props => props.snapFooter && `margin-bottom: ${FOOTER_HEIGHT}px`};
`;

const FixedFooterPortal = styled.div`
  position: fixed;
  pointer-events: ${props => (props.snapFooter ? "auto" : "none")};
  margin-top: ${props => props.containerHeight - FOOTER_HEIGHT}px;
  height: 4.2rem;
  width: ${props => props.containerWidth}px;
`;

// Create a context to expose state that is global to the whole componenent (asField, name, leadingCheckbox)
// to all children
const AccordionContext = React.createContext();
// Also create a HOC as simple API to wrap the children
export const withAccordionContext = WrappedComponent => props => (
  <AccordionContext.Consumer>
    {({ snapFooter }) => (
      <WrappedComponent {...props} snapFooter={snapFooter} />
    )}
  </AccordionContext.Consumer>
);

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Measure the visible dimensions of the container
      outerDimensions: {
        height: -1,
        width: -1
      },
      // ...and the height used by the accordion
      innerDimensions: {
        height: -1
      },
      snapFooter: false
    };
    // Debounce expensive calculations and prevent jumping snapFooter in states near the threshold
    this.calculateRemainingSpace = throttle(this.calculateRemainingSpace, 10, {
      trailing: true
    }).bind(this);
  }

  calculateRemainingSpace() {
    const containerHeight = this.state.outerDimensions.height;
    const usedHeight = this.state.innerDimensions.height;
    const diffHeight = containerHeight - usedHeight;
    const toggleFooter = this.state.snapFooter
      ? diffHeight >= FOOTER_HEIGHT
      : diffHeight < 0;
    toggleFooter && this.setState(state => ({ snapFooter: !state.snapFooter }));
  }

  render() {
    const { children } = this.props;
    const { snapFooter } = this.state;
    const containerHeight = this.state.outerDimensions.height;
    const containerWidth = this.state.outerDimensions.width;
    return (
      <Fragment>
        <AccordionContext.Provider value={{ snapFooter, containerHeight }}>
          <Measure
            client
            onResize={contentRect => {
              this.setState({
                outerDimensions: contentRect.client
              });
            }}>
            {measure => (
              <AccordionContainer innerRef={measure.measureRef}>
                <Measure
                  scroll
                  onResize={contentRect => {
                    this.setState(
                      {
                        innerDimensions: { height: contentRect.scroll.height }
                      },
                      this.calculateRemainingSpace
                    );
                  }}>
                  {({ measureRef }) => (
                    <AccordionInner
                      snapFooter={snapFooter}
                      innerRef={measureRef}>
                      {children}
                    </AccordionInner>
                  )}
                </Measure>
              </AccordionContainer>
            )}
          </Measure>
        </AccordionContext.Provider>
        <FixedFooterPortal
          id="fixed-acc-footer-modal"
          snapFooter={snapFooter}
          containerHeight={containerHeight}
          containerWidth={containerWidth}
        />
      </Fragment>
    );
  }
}
Accordion.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Accordion;
