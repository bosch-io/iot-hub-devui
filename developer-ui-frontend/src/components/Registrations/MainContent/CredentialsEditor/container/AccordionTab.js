/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Route, Link, withRouter } from "react-router-dom";
// Child Components
import CredentialAccordionTabDropdown from "./CredentialAccordionTabDropdown";
import AccordionSection, {
  AccordionSectionHeader,
  AccordionSectionBody
} from "components/common/Accordion/AccordionSection";
import JsonView, {
  JsonEditor,
  JsonReadOnlyView
} from "components/common/JsonView";
import HoverTooltip from "components/common/HoverTooltip";
// Redux
import { selectIsFetchingByAuthId } from "reducers/selectors";
import { updateCredentialInfo } from "actions/CredentialActions";
import { connect } from "react-redux";
// SVG Imports
import CredentialIcon from "images/pwCredentialIcon.svg";
import AddSecretIcon from "images/addPwSecretIcon.svg";

class AccordionTabWrapped extends Component {
  constructor(props) {
    super(props);
    this.redirectToReadOnly = this.redirectToReadOnly.bind(this);
    this.handleEditorSave = this.handleEditorSave.bind(this);
  }

  redirectToReadOnly(withChangesSaved) {
    const { history, credential, selectedDevice } = this.props;
    history.push(
      `/registrations/${selectedDevice}/credentials/${credential.get(
        "auth-id"
      )}`,
      { fromRaw: true, withChangesSaved }
    );
  }

  handleEditorSave(newInfo) {
    new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 50)
    ).then(() => this.redirectToReadOnly(true));
  }

  render() {
    const {
      idIsOpened,
      credential,
      isFetching,
      selectedDevice,
      toggleIsOpened
    } = this.props;
    const authId = credential.get("auth-id");
    const tooltipIdAddSecret = "add-secret-tt";
    // Remove firstInitTime property if there is one
    const displayedCredential = credential.get("firstInitTime")
      ? credential.delete("firstInitTime")
      : credential;
    const expanded = authId === idIsOpened;
    return (
      <AccordionSection
        toggleExpanded={() => toggleIsOpened(authId)}
        expanded={expanded}
        className="accordion-tab">
        <AccordionSectionHeader
          className="accordion-tab-header"
          title={authId}
          icon={<CredentialIcon />}>
          {expanded && (
            <Fragment>
              {credential.get("firstInitTime") && (
                <Link
                  to={`/registrations/${selectedDevice}/credentials/${credential.get(
                    "auth-id"
                  )}/additionalSecrets`}>
                  <AddSecretIcon
                    className="header-icon-right callout"
                    data-tip
                    data-for={tooltipIdAddSecret}
                  />
                </Link>
              )}
              <HoverTooltip text="Add a Secret..." id={tooltipIdAddSecret} />
              <CredentialAccordionTabDropdown
                authId={credential.get("auth-id")}
                selectedDevice={selectedDevice}
              />
            </Fragment>
          )}
        </AccordionSectionHeader>
        <AccordionSectionBody>
          <Route
            path="/registrations/:selectedDeviceId/credentials/:authId/:credentialSubMenu?"
            render={({ match }) => (
              <JsonView
                value={displayedCredential.toJS()}
                isFetching={isFetching}
                inEditingMode={match.params.credentialSubMenu === "raw"}>
                <JsonReadOnlyView />
                <JsonEditor
                  onCancel={() => this.redirectToReadOnly(false)}
                  onSubmit={this.handleEditorSave}
                  editorConfig={{ statusBar: false }}
                  dynamicHeight
                />
              </JsonView>
            )}
          />
        </AccordionSectionBody>
      </AccordionSection>
    );
  }
}

const AccordionTab = withRouter(
  connect((state, ownProps) => ({
    isFetching: selectIsFetchingByAuthId(
      state,
      ownProps.credential.get("auth-id")
    )
  }))(AccordionTabWrapped)
);

AccordionTabWrapped.propTypes = {
  credential: ImmutablePropTypes.map.isRequired,
  isFetching: PropTypes.bool.isRequired,
  toggleIsOpened: PropTypes.func.isRequired,
  selectedDevice: PropTypes.string,
  idIsOpened: PropTypes.string,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default AccordionTab;
