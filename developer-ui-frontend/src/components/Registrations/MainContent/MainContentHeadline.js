/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
// Child Components
import HoverTooltip from "components/common/HoverTooltip";
import Spinner from "components/common/Spinner";
// SVG Imports
import DeviceIcon from "images/deviceIcon.svg";
import DeleteIcon from "images/deleteIcon.svg";
// Redux
import { connect } from "react-redux";
import { selectIsFetchingByDeviceId } from "reducers/selectors";

class MainContentHeadlineWrapped extends Component {
  render() {
    const {
      mainPanelExpanded,
      isFetching,
      setMainPanel,
      match: {
        params: { registrationsSubMenu, selectedDeviceId, authId }
      }
    } = this.props;
    const tooltipIdDeleteReg = "delete-reg-tt";
    return (
      <Fragment>
        <div
          id="main-panel-headline"
          className={!mainPanelExpanded ? "collapsed" : null}>
          <span>
            <DeviceIcon
              onClick={
                !mainPanelExpanded
                  ? () => setMainPanel(!mainPanelExpanded)
                  : null
              }
              id="device-icon"
            />
            <h2>{selectedDeviceId || <i>Please select a device</i>}</h2>
            {isFetching && <Spinner type="bubbles" />}
          </span>
          <span id="action-buttons">
            <Link
              to={`/registrations/${selectedDeviceId}${
                registrationsSubMenu ? "/" + registrationsSubMenu : ""
              }${authId ? "/" + authId : ""}?action=deleteReg`}
              onClick={!selectedDeviceId ? e => e.preventDefault() : null}>
              <DeleteIcon
                className={!selectedDeviceId ? "disabled" : null}
                data-tip
                data-for={tooltipIdDeleteReg}
              />
            </Link>
          </span>
        </div>
        {selectedDeviceId && (
          <HoverTooltip
            id={tooltipIdDeleteReg}
            text={"Delete " + selectedDeviceId}
          />
        )}
      </Fragment>
    );
  }
}

const MainContentHeadline = withRouter(
  connect((state, ownProps) => ({
    isFetching: selectIsFetchingByDeviceId(
      state,
      ownProps.match.params.selectedDeviceId
    )
  }))(MainContentHeadlineWrapped)
);

MainContentHeadlineWrapped.propTypes = {
  mainPanelExpanded: PropTypes.bool.isRequired,
  setMainPanel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
};

export default MainContentHeadline;
