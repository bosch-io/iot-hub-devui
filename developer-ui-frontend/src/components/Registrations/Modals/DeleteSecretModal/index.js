/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form/immutable";
import {
  ConfigurationModal,
  ConfigurationModalHeader,
  ConfigurationModalFooter,
  ConfigurationModalBody
} from "components/common/dialogModals";
import { Redirect, withRouter } from "react-router-dom";
import DeleteSecretLogo from "images/deletePwSecretIcon.svg";
import { connect } from "react-redux";
import { deleteSecret } from "actions/CredentialActions";
import { selectSecretsByCredentialId } from "reducers/selectors";
import { toJS } from "components/helpers/to-js";
import Dropdown from "components/common/Dropdown";
// TODO: Enable Certificates Option

const validate = values => {
  const errors = {};
  if (!values.get("secretSelect")) {
    errors.password = "Required";
  }
  return errors;
};

class DeleteSecretModalWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  changeIsOpen(opened) {
    this.setState({ isOpen: opened });
  }

  submit(values) {
    const { deviceId, authId } = this.props;
    this.props.deleteSecret(deviceId, authId, values.get("secretSelect"));
    this.changeIsOpen(false);
  }

  render() {
    const { authId, handleSubmit, secrets, match } = this.props;
    const { isOpen } = this.state;
    const subjectTitle = "Delete a Secret from ";
    return isOpen ? (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <ConfigurationModal
          modalShown={isOpen}
          changeIsOpen={this.changeIsOpen}>
          <ConfigurationModalHeader
            subject={subjectTitle}
            subTitle={authId}
            icon={<DeleteSecretLogo />}
          />

          <ConfigurationModalBody className="configuration-modal-content">
            <div className="dropdown-input">
              <label htmlFor="secretSelect">Secret Id</label>
              <Field
                name="secretSelect"
                component={Dropdown}
                items={secrets.map((secret, index) => ({
                  value: secret.secretId,
                  id: secret.secretId + index
                }))}
              />
            </div>
          </ConfigurationModalBody>
          <ConfigurationModalFooter
            submitType="submit"
            toggleModal={() => this.changeIsOpen(!isOpen)}
            confirm={handleSubmit(this.submit.bind(this))}
          />
        </ConfigurationModal>
      </form>
    ) : (
      <Redirect
        to={`/registrations/${match.params.selectedDeviceId}/credentials/${
          match.params.selectedAuthId
        }`}
      />
    );
  }
}

let DeleteSecretModal = reduxForm({
  form: "deleteSecret",
  enableReinitialize: true,
  validate
})(DeleteSecretModalWrapped);
const mapStateToProps = (state, ownProps) => {
  const secrets = selectSecretsByCredentialId(state, ownProps.authId);
  return {
    initialValues: { secretSelect: secrets.getIn([0, "secretId"]) },
    secrets
  };
};
DeleteSecretModal = withRouter(
  connect(
    mapStateToProps,
    {
      deleteSecret
    }
  )(toJS(DeleteSecretModal))
);

DeleteSecretModalWrapped.propTypes = {
  authId: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  deviceId: PropTypes.string,
  secrets: PropTypes.array.isRequired,
  deleteSecret: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default DeleteSecretModal;
