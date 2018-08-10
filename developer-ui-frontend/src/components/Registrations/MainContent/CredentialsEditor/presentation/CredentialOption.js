/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// SVG Imports
import DeleteCredIcon from "images/deletePwCredentialIcon.svg";
import DeletePwSecretIcon from "images/deletePwSecretIcon.svg";
import AddPwSecretIcon from "images/addPwSecretIcon.svg";
import { camelCase } from "utils";

export default class CredentialOption extends React.Component {
  constructor(props) {
    super(props);
    this.getIcon = this.getIcon.bind(this);
    this.getPath = this.getPath.bind(this);
  }

  getIcon() {
    let icon;
    switch (this.props.categoryName) {
      case "Add Secret":
        icon = <AddPwSecretIcon />;
        break;
      case "Delete Secret":
        icon = <DeletePwSecretIcon />;
        break;
      case "Delete Credential":
        icon = <DeleteCredIcon />;
        break;
      default:
        console.error(
          "unknown filter category - can't load corresponding image"
        );
    }
    return icon;
  }

  getPath(categoryName) {
    const { selectedDevice, authId } = this.props;
    let path;
    switch (categoryName) {
      case "Add Secret":
        path = `/registrations/${selectedDevice}/${authId}/additionalSecrets`;
        break;
      case "Delete Secret":
        path = `/registrations/${selectedDevice}/${authId}/deleteSecrets`;
        break;
      case "Delete Credential":
        path = `registrations/${selectedDevice}/deleteCredential`;
        break;
      default:
        console.error(
          "unknown filter category - can't load corresponding image"
        );
    }
    return path;
  }

  render() {
    const { categoryName, disabled, toggleDropdownMenu } = this.props;
    const disabledTooltipId = "tt-" + camelCase(categoryName) + "-disabled";
    return (
      <li
        className={disabled ? "disabled" : null}
        data-for={disabled ? disabledTooltipId : null}
        data-tip={disabled}>
        <Link to={this.getPath(categoryName)} onClick={toggleDropdownMenu}>
          <div>
            {this.getIcon()}
            {categoryName}
          </div>
        </Link>
      </li>
    );
  }
}

CredentialOption.propTypes = {
  selectedDevice: PropTypes.string.isRequired,
  authId: PropTypes.string.isRequired,
  categoryName: PropTypes.string,
  toggleDropdownMenu: PropTypes.func,
  disabled: PropTypes.bool.isRequired
};
