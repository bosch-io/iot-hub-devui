/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import "styles/jsonEditor.scss";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import {
  selectDeviceById,
  selectIsFetchingByDeviceId
} from "reducers/selectors";
import { addCustomNotification } from "actions/globalActions";
// Child Components
import Accordion from "components/common/Accordion";
import AccordionSection, {
  AccordionSectionBody,
  AccordionSectionHeader
} from "components/common/Accordion/AccordionSection";
import RegistrationInfoBody from "./RegistrationInfoBody";
import TooltipMenu, { TooltipMenuOption } from "components/common/TooltipMenu";
import HoverTooltip from "components/common/HoverTooltip";
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
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(state => ({ menuExpanded: !state.menuExpanded }));
  }

  render() {
    const { regInfo, isFetching, deviceId } = this.props;
    const { menuExpanded } = this.state;
    const menuBtnId = "registrations-menu-btn";
    const menuOptions = [
      {
        value: "Configure Gateway",
        icon: <GatewayIcon />,
        route: `/registrations/${deviceId}/registration/addGateway`
      },
      {
        value: "Edit Raw",
        icon: <CodeIcon />,
        route: `/registrations/${deviceId}/registration/raw`
      }
    ];
    return (
      <Accordion>
        <AccordionSection className="accordion-tab" sticky>
          <AccordionSectionHeader
            title="Registration Information"
            icon={<InfoIcon />}
          >
            <MoreIcon
              id={menuBtnId}
              data-tip
              data-for={menuBtnId}
              onClick={this.toggleMenu}
            />
            <TooltipMenu
              open={menuExpanded}
              toggleOpen={this.toggleMenu}
              ancorId={menuBtnId}
            >
              {menuOptions.map((option, index) => (
                <TooltipMenuOption key={index} {...option} />
              ))}
            </TooltipMenu>
          </AccordionSectionHeader>
          <AccordionSectionBody>
            <RegistrationInfoBody regInfo={regInfo} isFetching={isFetching} />
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
  let regInfo = ownProps.selectedDevice;
  if (selectDeviceById(state, regInfo)) {
    if (regInfo) {
      regInfo = selectDeviceById(state, ownProps.selectedDevice)
        .get("registrationInfo")
        .toJS();
    } else {
      regInfo = null;
    }
  }
  const deviceId = ownProps.selectedDevice;
  return {
    regInfo: Object.assign({ "device-id": deviceId }, regInfo),
    deviceId,
    isFetching: selectIsFetchingByDeviceId(state, deviceId)
  };
};
const mapDispatchToProps = dispatch => ({
  triggerNotification: (text, level) =>
    dispatch(addCustomNotification(text, level))
});
const RegistrationInfoContent = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegistrationInfoContentWrapped)
);

RegistrationInfoContentWrapped.propTypes = {
  deviceId: PropTypes.string,
  regInfo: PropTypes.object,
  triggerNotification: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default RegistrationInfoContent;
