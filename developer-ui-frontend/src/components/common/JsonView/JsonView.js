/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { TransitionMotion, Motion, spring, presets } from "react-motion";
import Measure from "react-measure";
// Child Components only for Type Checking not for actual rendering
import JsonEditor from "./JsonEditor";
import JsonReadOnlyView from "./JsonReadOnlyView";

class JsonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: -1,
      editorTransition: "none" // "none" | "leaving" | "entering"
    };
  }

  render() {
    const { editorTransition, height } = this.state;
    const { value, inEditingMode, isFetching, children } = this.props;
    const childrenArr = React.Children.toArray(children);
    const JsonEditorChild = childrenArr.find(
      child => child.type === JsonEditor
    );
    const JsonReadOnlyChild = childrenArr.find(
      child => child.type === JsonReadOnlyView
    );
    return (
      <Measure
        scroll
        onResize={contentRect => {
          this.setState({ height: contentRect.scroll.height });
        }}>
        {({ measureRef }) => (
          <Motion
            style={{
              height: spring(height, presets.noWobble)
            }}
            defaultStyle={{ height: 0 }}>
            {interpolatingStyle => (
              <div style={{ ...interpolatingStyle, overflow: "hidden" }}>
                <div className="measuring-container" ref={measureRef}>
                  <TransitionMotion
                    willLeave={() => {
                      editorTransition !== "leaving" &&
                        this.setState({ editorTransition: "leaving" });
                      return { y: spring(15) };
                    }}
                    willEnter={() => {
                      this.setState({
                        editorTransition: "entering"
                      });
                      return { y: 15 };
                    }}
                    didLeave={() =>
                      this.setState({
                        editorTransition: "none"
                      })
                    }
                    config={{ stiffness: 360, damping: 30 }}
                    styles={
                      inEditingMode
                        ? [{ key: "editor", style: { y: spring(0) } }]
                        : []
                    }>
                    {interpolatedStyles => (
                      <Fragment>
                        {interpolatedStyles.map(config =>
                          React.cloneElement(JsonEditorChild, {
                            style: {
                              transform: `translateY(${-1 * config.style.y}px)`
                            },
                            className: `${
                              editorTransition !== "none"
                                ? editorTransition
                                : ""
                            } ${
                              JSON.stringify(value, null, 2).split(/\r\n|\r|\n/)
                                .length > 9
                                ? "two-digit-length"
                                : ""
                            }`,
                            ...this.props
                          })
                        )}
                        {editorTransition === "none" &&
                          !inEditingMode &&
                          React.cloneElement(JsonReadOnlyChild, {
                            value,
                            isFetching
                          })}
                      </Fragment>
                    )}
                  </TransitionMotion>
                </div>
              </div>
            )}
          </Motion>
        )}
      </Measure>
    );
  }
}

JsonView.propTypes = {
  value: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  inEditingMode: PropTypes.bool,
  children: (props, propName, componentName) => {
    const childs = props[propName];
    const childTypes = childs.map(c => c.type);
    const expectedTypes = [JsonReadOnlyView, JsonEditor];
    const expectedTypesVariant = [JsonEditor, JsonReadOnlyView];
    // Only accept two children of the appropriate type
    if (
      React.Children.count(childs) !== 2 ||
      !(
        childTypes.every((type, index) => type === expectedTypes[index]) ||
        childTypes.every((type, index) => type === expectedTypesVariant[index])
      )
    ) {
      return new Error(
        `"${componentName}" should have two children of the following types: ${expectedTypes.join(
          "`, `"
        )}.`
      );
    }
    return null;
  }
};

export default JsonView;
