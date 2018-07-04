/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/hoverTooltip.scss";
import React from "react";
import ReactTooltip from "react-tooltip";
import PropTypes from "prop-types";

const HoverTooltip = ({ text, id, delayShow, effect, ...other }) => (
  <ReactTooltip
    id={id}
    delayShow={delayShow}
    className="hover-tooltip"
    place="bottom"
    effect={effect}
    {...other}>
    <span>{text}</span>
  </ReactTooltip>
);

HoverTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  delayShow: PropTypes.number,
  effect: PropTypes.string
};

HoverTooltip.defaultProps = {
  delayShow: 500,
  effect: "solid"
};

export default HoverTooltip;
