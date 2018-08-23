/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import "styles/jsonEditor.scss";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import {
  selectDeviceById,
  selectIsFetchingByDeviceId
} from "reducers/selectors";
import { updateRegistrationInfo } from "actions/RegistrationActions";
import { addCustomNotification } from "actions/globalActions";
// Child Components
import Accordion from "components/common/Accordion";
import AccordionSection, {
  AccordionSectionBody,
  AccordionSectionHeader
} from "components/common/Accordion/AccordionSection";
import Spinner from "components/common/Spinner";
import TooltipMenu, { TooltipMenuOption } from "components/common/TooltipMenu";
import HoverTooltip from "components/common/HoverTooltip";
// Code Syntax Highlighting for the modal view (Prism.js)
import Prism from "prismjs";
import Parser from "html-react-parser";
// SVG Imports
import InfoIcon from "images/infoIcon.svg";
import CodeIcon from "images/codeIcon.svg";
import GatewayIcon from "images/gatewayIcon.svg";
import MoreIcon from "images/moreIcon.svg";

class RegistrationInfoContentWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: false
    };
    this.menuOptions = [
      {
        value: "Configure Gateway",
        icon: <GatewayIcon />,
        route: `/registrations/${props.deviceId}/addGateway/`
      },
      {
        value: "Edit Raw",
        icon: <CodeIcon />,
        route: `/registrations/${props.deviceId}/raw/`
      }
    ];
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(state => ({ menuExpanded: !state.menuExpanded }));
  }

  render() {
    const { regInfo } = this.props;
    const { menuExpanded } = this.state;
    const menuBtnId = "registrations-menu-btn";
    return (
      <Accordion>
        <AccordionSection className="accordion-tab" sticky>
          <AccordionSectionHeader
            title="Registration Information"
            icon={<InfoIcon />}>
            <MoreIcon
              id={menuBtnId}
              data-tip
              data-for={menuBtnId}
              onClick={this.toggleMenu}
            />
            <TooltipMenu
              open={menuExpanded}
              toggleOpen={this.toggleMenu}
              ancorId={menuBtnId}>
              {this.menuOptions.map((option, index) => (
                <TooltipMenuOption key={index} {...option} />
              ))}
            </TooltipMenu>
          </AccordionSectionHeader>
          <AccordionSectionBody>
            <div id="info-console" className="reg-mode">
              {this.props.isFetching && (
                <span className="fetching-overlay">
                  <Spinner type="bubbles" />
                </span>
              )}
              <pre>
                {Parser(
                  Prism.highlight(
                    JSON.stringify(regInfo, null, 2),
                    Prism.languages.json
                  )
                )}
              </pre>
            </div>
          </AccordionSectionBody>
        </AccordionSection>
        {!menuExpanded && (
          <HoverTooltip id={menuBtnId} text="Edit Registration" />
        )}
      </Accordion>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const regInfo = ownProps.selectedDevice
    ? selectDeviceById(state, ownProps.selectedDevice)
        .get("registrationInfo")
        .toJS()
    : null;
  const deviceId = ownProps.selectedDevice;
  return {
    regInfo: Object.assign({ "device-id": deviceId }, regInfo),
    deviceId,
    isFetching: selectIsFetchingByDeviceId(state, deviceId)
  };
};
const mapDispatchToProps = dispatch => ({
  updateRegInfo: (deviceId, info) =>
    dispatch(updateRegistrationInfo(deviceId, info)),
  triggerNotification: (text, level) =>
    dispatch(addCustomNotification(text, level))
});
const RegistrationInfoContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationInfoContentWrapped);

RegistrationInfoContentWrapped.propTypes = {
  deviceId: PropTypes.string,
  regInfo: PropTypes.object,
  updateRegInfo: PropTypes.func.isRequired,
  triggerNotification: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default RegistrationInfoContent;
