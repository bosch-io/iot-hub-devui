/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MainContentHeadline from "./MainContentHeadline";
import RegistrationInfoContent from "./RegInfoEditor/RegistrationInfoContent";
import CredentialsInfoContent from "./CredentialsEditor/CredentialsInfoContent";
import MainContentTabs from "./MainContentTabs";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { fetchCredentialsByDeviceId } from "actions/DataFetchActions";
import { formValueSelector } from "redux-form/immutable";

class MainContentWrapped extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedDevice &&
      this.props.selectedDevice !== nextProps.selectedDevice
    ) {
      this.props.fetchCredentialsByDeviceId(nextProps.selectedDevice);
    }
  }

  render() {
    const {
      mainPanelExpanded,
      setMainPanel,
      style,
      selectedDevice
    } = this.props;
    return (
      <Route
        path="/registrations/:selectedDeviceId?"
        render={({ match }) => (
          <div
            id="registrations-main-content"
            className={this.props.mainPanelExpanded ? "expanded" : null}
            style={style}>
            <div id="main-panel-headline-wrapper">
              <MainContentHeadline
                mainPanelExpanded={mainPanelExpanded}
                setMainPanel={setMainPanel}
              />
              <MainContentTabs
                selectedDevice={selectedDevice}
                fetchCredential={this.props.fetchCredentialsByDeviceId}
              />
            </div>
            <div id="accordion-wrapper">
              <Switch>
                <Route
                  path="/registrations/:selectedDeviceId/:registrationsSubMenu"
                  render={regProps => {
                    let renderedRoute = null;
                    if (
                      regProps.match.params.registrationsSubMenu ===
                      "credentials"
                    ) {
                      renderedRoute = (
                        <CredentialsInfoContent
                          selectedDevice={
                            regProps.match.params.selectedDeviceId
                          }
                        />
                      );
                    } else {
                      renderedRoute = (
                        <RegistrationInfoContent
                          selectedDevice={
                            regProps.match.params.selectedDeviceId
                          }
                        />
                      );
                    }
                    return <div id="tab-content-wrapper">{renderedRoute}</div>;
                  }}
                />
                {/* fallback: a no-content div */}
                <Route
                  render={() => (
                    <div className="no-content">No Device selected</div>
                  )}
                />
              </Switch>
            </div>
          </div>
        )}
      />
    );
  }
}

const MainContent = withRouter(
  connect(
    state => ({
      selectedDevice: formValueSelector("registrationsTabListing")(
        state,
        "selectedDevice"
      )
    }),
    { fetchCredentialsByDeviceId }
  )(MainContentWrapped)
);

MainContentWrapped.propTypes = {
  mainPanelExpanded: PropTypes.bool.isRequired,
  selectedDevice: PropTypes.string,
  fetchCredentialsByDeviceId: PropTypes.func.isRequired,
  setMainPanel: PropTypes.func.isRequired,
  style: PropTypes.bool
};

export default MainContent;
