/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import SwitchCheckbox from "components/common/SwitchCheckbox";
// SVG Imports
import ListLengthIcon from "images/listLengthIcon.svg";
import BufferSizeIcon from "images/bufferSizeIcon.svg";

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.getIcon = this.getIcon.bind(this);
  }

  getIcon() {
    let icon;
    switch (this.props.categoryName) {
      case "Number of Feed Lines":
        icon = <ListLengthIcon />;
        break;
      case "Buffer Size":
        icon = <BufferSizeIcon />;
        break;
      default:
        console.log("unknown filter category - can't load corresponding image");
    }
    return icon;
  }
  render() {
    const {
      categoryName,
      type,
      scrollAnimationActive,
      onCheckboxChange,
      onClick
    } = this.props;
    return (
      <li
        onClick={
          type === "formConfig" ? () => onClick(categoryName) : undefined
        }>
        {type === "formConfig" ? (
          <div>
            {this.getIcon()}
            {categoryName}
          </div>
        ) : (
          <SwitchCheckbox
            checked={scrollAnimationActive}
            onCheckboxClick={() => onCheckboxChange(!scrollAnimationActive)}
            label={categoryName}
          />
        )}
      </li>
    );
  }
}

Setting.propTypes = {
  scrollAnimationActive: PropTypes.bool,
  categoryName: PropTypes.string,
  type: PropTypes.string,
  onCheckboxChange: PropTypes.func,
  onClick: PropTypes.func
};
