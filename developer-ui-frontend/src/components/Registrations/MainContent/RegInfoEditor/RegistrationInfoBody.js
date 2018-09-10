/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { updateRegistrationInfo } from "actions/RegistrationActions";
// Child Components
import JsonView, {
  JsonEditor,
  JsonReadOnlyView
} from "components/common/JsonView";
import { Route } from "react-router-dom";

class RegistrationInfoBodyWrapped extends Component {
  constructor(props) {
    super(props);
    this.handleEditorSave = this.handleEditorSave.bind(this);
    this.redirectToReadOnly = this.redirectToReadOnly.bind(this);
  }

  redirectToReadOnly() {
    const { history, match } = this.props;
    history.push(
      `/registrations/${match.params.selectedDeviceId}/registration`
    );
  }

  handleEditorSave(newInfo) {
    const { regInfo } = this.props;
    const { "device-id": deviceId, ...info } = newInfo;
    const enabledChanged = info.enabled !== regInfo;
    this.props
      .updateRegistrationInfo(deviceId, info, enabledChanged)
      .then(this.redirectToReadOnly);
  }

  render() {
    const { regInfo, isFetching } = this.props;
    return (
      <Route
        path="/registrations/:selectedDeviceId/registration/:regInfoSubMenu?"
        render={({ match }) => (
          <JsonView
            value={regInfo}
            isFetching={isFetching}
            inEditingMode={match.params.regInfoSubMenu === "raw"}>
            <JsonReadOnlyView />
            <JsonEditor
              onCancel={this.redirectToReadOnly}
              onSubmit={this.handleEditorSave}
              editorConfig={{ statusBar: false }}
              dynamicHeight
            />
          </JsonView>
        )}
      />
    );
  }
}

RegistrationInfoBodyWrapped.propTypes = {
  regInfo: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  updateRegistrationInfo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const RegistrationInfoBody = withRouter(
  connect(
    null,
    { updateRegistrationInfo }
  )(RegistrationInfoBodyWrapped)
);

export default RegistrationInfoBody;
