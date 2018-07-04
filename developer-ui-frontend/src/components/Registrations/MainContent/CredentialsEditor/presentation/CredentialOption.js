/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
// SVG Imports
import DeleteCredIcon from "images/deletePwCredentialIcon.svg";
import DeletePwSecretIcon from "images/deletePwSecretIcon.svg";
import AddPwSecretIcon from "images/addPwSecretIcon.svg";
import { camelCase } from "utils";

export default class CredentialOption extends React.Component {
  constructor(props) {
    super(props);
    this.getIcon = this.getIcon.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
        console.log("unknown filter category - can't load corresponding image");
    }
    return icon;
  }

  handleClick() {
    const { toggleDropdownMenu, toggleModal, categoryName } = this.props;
    toggleDropdownMenu();
    toggleModal(categoryName);
  }

  render() {
    const { categoryName, disabled } = this.props;
    const disabledTooltipId = "tt-" + camelCase(categoryName) + "-disabled";
    return (
      <li
        className={disabled ? "disabled" : null}
        onClick={disabled ? null : () => this.handleClick()}
        data-for={disabled ? disabledTooltipId : null}
        data-tip={disabled}>
        <div>
          {this.getIcon()}
          {categoryName}
        </div>
      </li>
    );
  }
}

CredentialOption.propTypes = {
  categoryName: PropTypes.string,
  toggleDropdownMenu: PropTypes.func,
  toggleModal: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};
