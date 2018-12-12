/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form/immutable";
import { connect } from "react-redux";
import { toJS } from "components/helpers/to-js";
import { selectSecretsByCredentialId } from "reducers/selectors";
import { changeSecretsInfo } from "actions/CredentialActions";
// Child Components
import SecretMainView from "./SecretMainView/SecretMainView";
import SecretMainViewHeader from "./SecretMainView/SecretMainViewHeader";
import AddSecretView from "./AddSecretView/AddSecretView";
import "styles/credentialModal.scss";

class SecretsConfiguratorWrapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSecret: 0,
      inAddingMode: false,
      inEditingMode: false
    };
    this.toggleEditingMode = this.toggleEditingMode.bind(this);
    this.submit = this.submit.bind(this);
    this.decreaseSelectedSecret = this.decreaseSelectedSecret.bind(this);
    this.increaseSelectedSecret = this.increaseSelectedSecret.bind(this);
    this.toggleAddingMode = this.toggleAddingMode.bind(this);
  }

  toggleEditingMode() {
    this.setState({ inEditingMode: !this.state.inEditingMode });
  }

  submit(values) {
    this.setState({ inEditingMode: false });
    const currSecret = this.props.secrets[this.state.selectedSecret];
    if (values.get(currSecret["secretId"] + "notBefore")) {
      currSecret["not-before"] = values
        .get(currSecret["secretId"] + "notBefore")
        .format();
    }
    if (values.get(currSecret["secretId"] + "notBefore") === null) {
      delete currSecret["not-before"];
    }
    if (values.get(currSecret["secretId"] + "notAfter")) {
      currSecret["not-after"] = values
        .get(currSecret["secretId"] + "notAfter")
        .format();
    }
    if (values.get(currSecret["secretId"] + "notAfter") === null) {
      delete currSecret["not-after"];
    }
    this.props.changeSecretsInfo(
      this.props.deviceId,
      this.props.authId,
      this.props.secrets
    );
    this.setState({ edited: !this.state.edited });
  }

  decreaseSelectedSecret() {
    this.setState(prevState => {
      let newIndex = prevState.selectedSecret;
      if (newIndex < 1) {
        newIndex = 0;
      } else {
        newIndex = prevState.selectedSecret - 1;
      }
      return { selectedSecret: newIndex };
    });
  }

  increaseSelectedSecret() {
    this.setState(prevState => {
      let newIndex = prevState.selectedSecret;
      const secretsLength = this.props.secrets.length - 1;
      if (newIndex === secretsLength) {
        newIndex = secretsLength;
      } else {
        newIndex = prevState.selectedSecret + 1;
      }
      return { selectedSecret: newIndex };
    });
  }

  toggleAddingMode() {
    this.setState({ inAddingMode: !this.state.inAddingMode });
  }

  render() {
    const { deviceId, authId, handleSubmit, secretType, secrets } = this.props;
    const { selectedSecret, inAddingMode, inEditingMode } = this.state;
    const selectedId =
      secrets[selectedSecret] && secrets[selectedSecret].secretId;
    return inAddingMode ? (
      <AddSecretView
        inAddingMode={inAddingMode}
        deviceId={deviceId}
        authId={authId}
        toggleAddingMode={this.toggleAddingMode}
        secretType={secretType}
      />
    ) : (
      <form onSubmit={handleSubmit(this.submit)} name="secretEditor">
        <SecretMainViewHeader
          deviceId={deviceId}
          authId={authId}
          selectedSecret={selectedSecret}
          selectedSecretId={selectedId}
          toggleAddingMode={this.toggleAddingMode}
          toggleEditingMode={this.toggleEditingMode}
          inEditingMode={inEditingMode}
          decreaseSelectedSecret={this.decreaseSelectedSecret}
          increaseSelectedSecret={this.increaseSelectedSecret}
        />
        <SecretMainView
          secrets={secrets}
          toggleEditingMode={this.toggleEditingMode}
          selectedSecret={selectedSecret}
          inEditingMode={inEditingMode}
        />
      </form>
    );
  }
}

let SecretsConfigurator = reduxForm({
  form: "secretEditor",
  enableReinitialize: true
})(SecretsConfiguratorWrapped);

const mapStateToProps = (state, ownProps) => {
  const secrets = selectSecretsByCredentialId(state, ownProps.authId);
  return {
    secrets
  };
};

const mapDispatchToProps = dispatch => ({
  changeSecretsInfo: (deviceId, authId, secrets) =>
    dispatch(changeSecretsInfo(deviceId, authId, secrets))
});

SecretsConfigurator = connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(SecretsConfigurator));

SecretsConfiguratorWrapped.propTypes = {
  deviceId: PropTypes.string,
  authId: PropTypes.string,
  secrets: PropTypes.array,
  handleSubmit: PropTypes.func,
  changeSecretsInfo: PropTypes.func,
  secretType: PropTypes.string,
  sercret: PropTypes.object
};

export default SecretsConfigurator;
