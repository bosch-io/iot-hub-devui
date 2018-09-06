/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Link } from "react-router-dom";
import CredentialAccordionTabDropdown from "./CredentialAccordionTabDropdown";
import AccordionSection, {
  AccordionSectionHeader,
  AccordionSectionBody
} from "components/common/Accordion/AccordionSection";
import { JsonReadOnlyView as JsonView } from "components/common/JsonView";
import HoverTooltip from "components/common/HoverTooltip";
// Redux
import { selectIsFetchingByAuthId } from "reducers/selectors";
import { connect } from "react-redux";
// SVG Imports
import CredentialIcon from "images/pwCredentialIcon.svg";
import AddSecretIcon from "images/addPwSecretIcon.svg";

const AccordionTabWrapped = ({
  idIsOpened,
  credential,
  isFetching,
  selectedDevice,
  toggleIsOpened
}) => {
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
        <JsonView value={displayedCredential.toJS()} isFetching={isFetching} />
      </AccordionSectionBody>
    </AccordionSection>
  );
};

const AccordionTab = connect((state, ownProps) => ({
  isFetching: selectIsFetchingByAuthId(
    state,
    ownProps.credential.get("auth-id")
  )
}))(AccordionTabWrapped);

AccordionTabWrapped.propTypes = {
  credential: ImmutablePropTypes.map.isRequired,
  isFetching: PropTypes.bool.isRequired,
  toggleIsOpened: PropTypes.func.isRequired,
  selectedDevice: PropTypes.string,
  idIsOpened: PropTypes.string
};

export default AccordionTab;
