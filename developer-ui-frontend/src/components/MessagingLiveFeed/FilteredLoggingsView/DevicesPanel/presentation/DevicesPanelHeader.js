/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
// Components
import { VelocityComponent } from "velocity-react";
import DevicesSearchbar from "./DevicesSearchbar";
import ReactTooltip from "react-tooltip";
// SVG Imports
import ArrowRight from "images/arrow-right.svg";
import EditIcon from "images/editIcon.svg";
import DisconnectedIcon from "images/warningIcon.svg";

class DevicesPanelHeader extends Component {
  render() {
    const {
      expanded,
      toggleDevicesPanel,
      isConnected,
      deviceAddingModeActive,
      switchToAddingMode,
      tooltipIdEditSubs,
      tooltipIdCollapsePanel
    } = this.props;
    return (
      <VelocityComponent
        animation={{ translateX: expanded ? "0%" : "-100%" }}
        duration={100}
        delay={expanded ? 200 : 0}>
        <div id="devices-panel-header">
          <div id="fixed-header-content">
            <span>
              <ArrowRight
                id="arrow-button"
                onClick={toggleDevicesPanel}
                data-tip
                data-for={tooltipIdCollapsePanel}
              />
              <h6>
                {deviceAddingModeActive
                  ? "Subscription Configurations"
                  : "Subscribed Devices"}
              </h6>
            </span>
            {!deviceAddingModeActive && (
              <button
                id="add-button"
                ref={addBtn => {
                  this.addBtn = addBtn;
                }}
                onClick={
                  !deviceAddingModeActive
                    ? e => {
                        ReactTooltip.hide(this.addBtn);
                        switchToAddingMode(e);
                      }
                    : null
                }
                data-tip
                data-for={tooltipIdEditSubs}>
                <EditIcon />
              </button>
            )}
            {deviceAddingModeActive &&
              !isConnected && <DisconnectedIcon id="disconnected-icon" />}
          </div>
          <div
            id="collapsable-searchbar"
            className={deviceAddingModeActive ? "searchbar-collapsed" : ""}>
            <DevicesSearchbar />
          </div>
        </div>
      </VelocityComponent>
    );
  }
}

export default DevicesPanelHeader;

DevicesPanelHeader.propTypes = {
  /**
   *  Whether or not the panel is expanded visible/ rendered.
   **/
  expanded: PropTypes.bool.isRequired,
  /**
   *  Toggles the expanded state, can be triggered from inside the component with the close arrow.
   **/
  toggleDevicesPanel: PropTypes.func.isRequired,
  /**
   *  Whether or not the app is connected with the websocket eventbus (if not connected, a disconncted
   *  icon is shown in device adding mode).
   */
  isConnected: PropTypes.bool.isRequired,
  /**
   * Whether or not the DevicesPanel is in the Device Adding Mode (can be activated by clicking the
   * edit button in the header)
   */
  deviceAddingModeActive: PropTypes.bool.isRequired,
  /**
   * The id, ReactTooltip uses to find the HoverTooltip for the edit button (defined in DevicesPanel)
   */
  tooltipIdEditSubs: PropTypes.string.isRequired,
  /**
   * The id, ReactTooltip uses to find the HoverTooltip for the collapse arrow (defined in DevicesPanel)
   */
  tooltipIdCollapsePanel: PropTypes.string.isRequired,
  /**
   * Switches the deviceAddingModeActive state in DevicesPanel to true
   */
  switchToAddingMode: PropTypes.func.isRequired
};
