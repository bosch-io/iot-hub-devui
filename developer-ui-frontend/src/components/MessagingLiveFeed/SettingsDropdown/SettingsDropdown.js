/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/settings.scss";
import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import SettingsDropdownMenu from "./presentation/SettingsDropdownMenu";
import { ConfirmationModal } from "components/common/dialogModals";
import HoverTooltip from "components/common/HoverTooltip";
// Redux
import { connect } from "react-redux";
import { toJS } from "components/helpers/to-js";
import { removeAllLogs } from "actions/LogActions";
import { selectNumberOfAllLogs, selectHubConnected } from "reducers/selectors";
import { honoConnect } from "actions/WebsocketActions";
// SVG Imports
import SettingsIcon from "images/settingsIcon.svg";
import ClearConsoleIcon from "images/clearConsoleIcon.svg";
import SwitchCheckbox from "components/common/SwitchCheckbox";

class SettingsDropdownWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      inEditingView: false,
      confirmModalOpen: false,
      ...props.initialState
    };
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
    this.toggleEditingView = this.toggleEditingView.bind(this);
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
    this.setHonoConnection = this.setHonoConnection.bind(this);
  }

  toggleEditingView() {
    this.setState(prevState => ({ inEditingView: !prevState.inEditingView }));
  }

  toggleDropdownMenu() {
    this.setState(prevState => ({ isOpened: !prevState.isOpened }));
    setTimeout(() => this.setState({ inEditingView: false }), 300);
  }

  toggleConfirmModal() {
    this.setState(state => ({ confirmModalOpen: !state.confirmModalOpen }));
  }

  setHonoConnection() {
    this.props.honoWebsockets(!this.props.isConnected);
  }

  render() {
    const { hasLogs, flushLogs, isConnected } = this.props;
    const { isOpened } = this.state;
    const tooltipIdSetHonoConnection = "set-btn";
    const tooltipIdClearConsole = "flush-btn";
    const tooltipIdSettings = "settings-btn";

    return [
      <div key="settingsFrag1" id="settings-wrapper">
        <SwitchCheckbox
          className="switchCheckBox"
          onCheckboxClick={this.setHonoConnection}
          checked={isConnected}
          data-tip
          data-for={tooltipIdSetHonoConnection}
        />
        <HoverTooltip
          id={tooltipIdSetHonoConnection}
          text="Set Hono Connection"
        />
        <ClearConsoleIcon
          className={hasLogs ? "settings-button" : "settings-button disabled"}
          id="console-flush-button"
          onClick={hasLogs ? this.toggleConfirmModal : null}
          data-tip
          data-for={tooltipIdClearConsole}
        />
        <HoverTooltip id={tooltipIdClearConsole} text="Clear Logs" />
        <div id="settings-button-wrapper">
          <SettingsIcon
            className={
              this.state.isOpened
                ? "settings-button settings-rotated"
                : "settings-button"
            }
            onClick={!this.state.isOpened ? this.toggleDropdownMenu : null} // if already opened, the ClickOutside Wrapper gets responsible for toggling
            data-tip
            data-for={tooltipIdSettings}
          />
          {!isOpened && (
            <HoverTooltip id={tooltipIdSettings} text="Edit Settings" />
          )}
        </div>
        <SettingsDropdownMenu
          isOpened={this.state.isOpened}
          inEditingView={this.state.inEditingView}
          toggleDropdownMenu={this.toggleDropdownMenu}
          toggleEditingView={this.toggleEditingView}
        />
      </div>,
      <ConfirmationModal
        key="settingsFrag2"
        subject="Clear All Logs"
        modalShown={this.state.confirmModalOpen}
        toggleModal={this.toggleConfirmModal}
        confirm={() => flushLogs()}
        submitType="delete"
      >
        {"Are you sure, you want to delete all captured logs?"}
      </ConfirmationModal>
    ];
  }
}

const mapStateToProps = state => {
  const hasLogs = selectNumberOfAllLogs(state) !== 0;
  const isConnected = selectHubConnected(state);
  return {
    hasLogs,
    isConnected
  };
};
const mapDispatchToProps = dispatch => ({
  honoWebsockets: isConnected => dispatch(honoConnect(isConnected)),
  flushLogs: () => dispatch(removeAllLogs())
});
const SettingsDropdown = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(SettingsDropdownWrapped))
);

SettingsDropdownWrapped.propTypes = {
  initialState: PropTypes.object,
  flushLogs: PropTypes.func,
  hasLogs: PropTypes.bool,
  honoWebsockets: PropTypes.func,
  isConnected: PropTypes.bool
};

export default SettingsDropdown;
