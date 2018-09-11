/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import { reduxForm, formValueSelector } from "redux-form/immutable";
import { withRouter } from "react-router-dom";
import { toJS } from "components/helpers/to-js";
import { connect } from "react-redux";
import { selectAllDevices } from "reducers/selectors";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import ChecklistSelect, {
  ChecklistSelectHeader,
  ChecklistOptionEntries
} from "components/common/ChecklistSelect";
import {
  ConfigurationModal,
  ConfigurationModalHeader,
  ConfigurationModalFooter,
  ConfigurationModalBody
} from "components/common/dialogModals";
import GatewayIcon from "images/gatewayIcon.svg";
import { SearchbarM } from "components/common/textInputs";
import "styles/gatewayStyle.scss";

class AddGatewayModalWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerOptionChecked: true,
      isOpen: true
    };
    this.changeIsOpen = this.changeIsOpen.bind(this);
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  onCheckboxClick() {
    this.setState(state => ({
      footerOptionChecked: !state.footerOptionChecked
    }));
  }

  changeIsOpen(opened) {
    this.setState({ isOpen: opened });
  }

  confirm() {}
  render() {
    const { deviceData, deviceId, gatewaySearch } = this.props;
    const { isOpen } = this.state;
    return isOpen ? (
      <ConfigurationModal
        className="script"
        modalShown={isOpen}
        toggleModal={this.changeIsOpen}
      >
        <ConfigurationModalHeader
          icon={<GatewayIcon />}
          subject={"Configure Gateway for " + deviceId}
        />
        <ConfigurationModalBody className="mainContent">
          <p className="paragraph">
            A short descirption of what the gateway device is. Maybe with a link
            to the [documentantion]. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua.
          </p>
          <div className="elementsAlign">
            <SearchbarM
              className="search"
              id="search_content"
              name="gatewaySearchText"
              type="text"
              placeholder="Search for device"
              autoComplete="off"
              asField
            />
            <form onSubmit={e => e.preventDefault()}>
              <ChecklistSelect name="selectedDevice">
                <div className="header">
                  <ChecklistSelectHeader textTitle="ID" />
                </div>
                <div className="table">
                  <ChecklistOptionEntries
                    data={deviceData.map(entry => ({
                      text: entry.deviceId,
                      checked: entry.selected
                    }))}
                    filterText={gatewaySearch}
                  />
                </div>
              </ChecklistSelect>
            </form>
          </div>
        </ConfigurationModalBody>
        <ConfigurationModalFooter
          confirm={this.confirm}
          submitType="submit"
          toggleModal={this.changeIsOpen}
        />
      </ConfigurationModal>
    ) : (
      <Redirect to="/registrations" />
    );
  }
}

const mapStateToProps = state => {
  const selector = formValueSelector("gatewayTab");
  const devices = selectAllDevices(state);
  return {
    gatewaySearch: selector(state, "gatewaySearchText"),
    deviceData: devices.map(device => ({
      deviceId: device.get("deviceId")
    }))
  };
};

let AddGatewayModalContainer = reduxForm({
  form: "gatewayTab"
})(AddGatewayModalWrapped);

AddGatewayModalContainer = withRouter(
  connect(mapStateToProps)(toJS(AddGatewayModalContainer))
);

AddGatewayModalWrapped.propTypes = {
  deviceData: PropTypes.arrayOf(
    PropTypes.shape({ deviceId: PropTypes.string, enabled: PropTypes.bool })
  ),
  gatewaySearch: PropTypes.string,
  deviceId: PropTypes.string.isRequired
};

const AddGateway = AddGatewayModalContainer;
export default AddGateway;
