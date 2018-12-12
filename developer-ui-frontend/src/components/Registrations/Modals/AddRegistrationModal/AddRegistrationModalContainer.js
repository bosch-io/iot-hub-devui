/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { CREDENTIAL_TYPES } from "_APP_CONSTANTS";
import { Redirect, withRouter } from "react-router-dom";
import {
  reduxForm,
  SubmissionError,
  change,
  formValueSelector
} from "redux-form/immutable";
import { connect } from "react-redux";
import { toJS } from "components/helpers/to-js";
import { createStandardPasswordRegistration } from "actions/RegistrationActions";
import ConfigurationViewBody from "./ConfigurationViewBody";
import { selectFetchingDevices, selectTenant } from "reducers/selectors";
import { noDuplicateDevices } from "validation/addRegistrationValidation";
import {
  ConfigurationModal,
  ConfigurationModalHeader,
  ConfigurationModalFooter
} from "components/common/dialogModals";
// SVG Imports
import AddDeviceLogo from "images/addPwDevice.svg";

// TODO: Enable Certificates Option
const validate = values => {
  const errors = {};
  if (!values.get("password")) {
    errors.password = "Required";
  }
  return errors;
};

const warn = values => {
  const warnings = {};
  if (values.get("password") && values.get("password").length < 8) {
    warnings.password =
      "Passwords shorter than 8 characters are not recommended";
  }
  return warnings;
};

class AddRegistrationModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      newDeviceId: "",
      newAuthId: "",
      newPw: "",
      inConfirmationMode: false,
      isOpen: true
    };
    this.submit = this.submit.bind(this);
    this.changeIsOpen = this.changeIsOpen.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.loading &&
      !nextProps.fetchingRegistrations.includes(this.state.newDeviceId)
    ) {
      this.setState({ loading: false, inConfirmationMode: true });
    }
  }

  submit(values) {
    // rejected Promises will set the error key in the corresponding Field component
    return new Promise((resolve, reject) => {
      const newDeviceId = values.get("deviceId");
      const error = noDuplicateDevices(newDeviceId);
      if (error) {
        reject(error);
      } else {
        // The first authId of a device is always equal to the deviceId
        const newAuthId = newDeviceId;
        const newPw = values.get("password");
        const secretData = {
          password: newPw,
          hashMethod: "sha-512"
        }; // sha-512 is hard coded (preset)
        this.props.createStandardPasswordRegistration(
          newDeviceId,
          newAuthId,
          secretData
        );
        this.setState({ newDeviceId, newAuthId, newPw, loading: true }, () =>
          resolve(newAuthId)
        );
      }
    }).catch(error => {
      throw new SubmissionError({ deviceId: error });
    });
  }

  changeIsOpen(opened) {
    this.setState({ isOpen: opened });
    // if a new device was created and the modal is about to be closed
    if (!opened && this.state.newDeviceId) {
      // Select the newly created device in the mainContent part of the
      // registrations tab (expand it)
      this.props.changeCurrentlySelectedDevice(this.state.newDeviceId);
      this.props.history.push(
        `/registrations/${this.state.newDeviceId}/registration`
      );
      this.props.setMainPanel(true);
    }
  }

  render() {
    const {
      handleSubmit,
      type,
      tenant,
      selectedDevice,
      match,
      ...others
    } = this.props;
    const { isOpen } = this.state;
    /* eslint-disable react/prop-types */
    const { invalid, pristine, submitting } = this.props;
    /* eslint-enable */
    const {
      inConfirmationMode,
      loading,
      newDeviceId,
      newAuthId,
      newPw
    } = this.state;
    const subjectTitle = `New Device with ${
      type === CREDENTIAL_TYPES.PASSWORD ? "Standard Password " : "Certificate "
    } Credential`;
    const selectedSubMenu = match.params.registrationsSubMenu;
    const selectedAuthId = match.params.authId;
    return isOpen ? (
      <form onSubmit={handleSubmit(this.submit)}>
        <ConfigurationModal
          modalShown={isOpen}
          changeIsOpen={this.changeIsOpen}
          className={`new-reg-modal ${
            inConfirmationMode || loading ? "confirmed" : ""
          }`}>
          {!inConfirmationMode && (
            <ConfigurationModalHeader
              subject={subjectTitle}
              icon={<AddDeviceLogo />}
            />
          )}
          <ConfigurationViewBody
            {...others}
            newDeviceId={newDeviceId}
            newAuthId={newAuthId}
            newPw={newPw}
            tenant={tenant}
            type={type}
            changeIsOpen={this.changeIsOpen}
            inConfirmationMode={inConfirmationMode}
            loading={loading}
          />
          {!inConfirmationMode && (
            <ConfigurationModalFooter
              submitType="submit"
              toggleModal={() => this.changeIsOpen(!isOpen)}
              submitBlocked={invalid || pristine || submitting}
              confirm={handleSubmit(this.submit)}
            />
          )}
        </ConfigurationModal>
      </form>
    ) : (
      <Redirect
        to={`/registrations/${selectedDevice ? selectedDevice + "/" : ""}${
          match.params.registrationsSubMenu
            ? match.params.registrationsSubMenu
            : ""
        }${
          selectedDevice &&
          match.params.registrationsSubMenu &&
          match.params.authId
            ? "/" + match.params.authId
            : ""
        }`}
      />
    );
  }
}

AddRegistrationModalContainer.propTypes = {
  type: PropTypes.string,
  tenant: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  createStandardPasswordRegistration: PropTypes.func.isRequired,
  changeCurrentlySelectedDevice: PropTypes.func.isRequired,
  setMainPanel: PropTypes.func.isRequired,
  fetchingRegistrations: PropTypes.array.isRequired,
  availableDevices: PropTypes.array,
  selectedDevice: PropTypes.string,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  fetchingRegistrations: selectFetchingDevices(state),
  tenant: selectTenant(state),
  selectedDevice: formValueSelector("registrationsTabListing")(
    state,
    "selectedDevice"
  )
});

const mapDispatchToProps = dispatch => ({
  createStandardPasswordRegistration: (deviceId, authId, secretData) =>
    dispatch(createStandardPasswordRegistration(deviceId, authId, secretData)),
  changeCurrentlySelectedDevice: deviceId =>
    dispatch(change("registrationsTabListing", "selectedDevice", deviceId))
});

AddRegistrationModalContainer = reduxForm({
  form: "newRegistration",
  validate,
  warn
})(AddRegistrationModalContainer);
AddRegistrationModalContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(AddRegistrationModalContainer))
);

export default AddRegistrationModalContainer;
