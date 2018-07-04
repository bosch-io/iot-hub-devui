/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import Measure from "react-measure";
import { Motion, spring, presets } from "react-motion";
import HoverTooltip from "components/common/HoverTooltip";
import CredentialAccordionTabDropdown from "../container/CredentialAccordionTabDropdown";
// Code Syntax Highlighting for the modal view (Prism.js)
import Prism from "prismjs";
import Parser from "html-react-parser";
// SVG Imports
import CredentialIcon from "images/pwCredentialIcon.svg";
import CaretDown from "images/caretDownIcon.svg";
import AddSecretIcon from "images/addPwSecretIcon.svg";
import Spinner from "components/common/Spinner";

export default class AccordionTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: -1
    };
  }
  render() {
    const { height } = this.state;
    const {
      credential,
      changeAddSecretModalIsOpen,
      isOpened,
      changeIsOpened,
      selectedDevice,
      isFetching
    } = this.props;
    const tooltipIdAddSecret = "add-secret-tt";
    // Remove needsSecret property if there is one
    const displayedCredential = credential.get("needsSecret")
      ? credential.delete("needsSecret")
      : credential;
    return (
      <div className="accordion-tab">
        <div className={`accordion-tab-header ${isOpened ? "opened" : ""}`}>
          <span className="click-proxy" onClick={() => changeIsOpened()} />
          <span>
            <CredentialIcon className="credential-icon" />
            {displayedCredential.get("auth-id")}
          </span>
          <span style={{ zIndex: 2, overflow: "visible" }}>
            {isOpened && (
              <React.Fragment>
                {credential.get("needsSecret") && (
                  <AddSecretIcon
                    onClick={() =>
                      changeAddSecretModalIsOpen(
                        true,
                        credential.get("auth-id")
                      )
                    }
                    className="header-icon-right callout"
                    data-tip
                    data-for={tooltipIdAddSecret}
                  />
                )}
                <HoverTooltip text="Add a Secret..." id={tooltipIdAddSecret} />
                <CredentialAccordionTabDropdown
                  authId={credential.get("auth-id")}
                  selectedDevice={selectedDevice}
                />
              </React.Fragment>
            )}
            <CaretDown
              className={
                isOpened
                  ? "header-icon-right caret-rotated"
                  : "header-icon-right"
              }
              onClick={() => changeIsOpened()}
            />
          </span>
        </div>
        <Measure
          scroll
          onResize={contentRect => {
            this.setState({ height: contentRect.scroll.height });
          }}>
          {({ measureRef }) => (
            <Motion
              style={{
                height: spring(isOpened ? height : 0, presets.noWobble)
              }}
              defaultStyle={{ height: 0 }}>
              {interpolatingStyle => (
                <div className="animation-wrapper" style={interpolatingStyle}>
                  <div className="measuring-container" ref={measureRef}>
                    <div id="info-console">
                      {isFetching && (
                        <span className="fetching-overlay">
                          <Spinner type="bubbles" />
                        </span>
                      )}
                      <pre>
                        {Parser(
                          Prism.highlight(
                            JSON.stringify(displayedCredential.toJS(), null, 2),
                            Prism.languages.json
                          )
                        )}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </Motion>
          )}
        </Measure>
      </div>
    );
  }
}

AccordionTab.propTypes = {
  credential: ImmutablePropTypes.map.isRequired,
  isFetching: PropTypes.bool.isRequired,
  changeAddSecretModalIsOpen: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  changeIsOpened: PropTypes.func.isRequired,
  selectedDevice: PropTypes.string
};
