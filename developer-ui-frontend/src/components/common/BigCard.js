/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import BackgroundImage from "images/backgrounds/backgroundHeader.jpg";

const Card = styled.div`
  position: relative;
  top: calc((100vh - ${props => props.theme.headerHeight} - 2px) / 2);
  left: 50vw;
  width: 75vw;
  height: 75vh;
  transform: translate(-37.5vw, -37.5vh);
  background-color: #fff;
  overflow: hidden;
  border-radius: 4px;
  transform-origin: center;
  outline: none;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  box-sizing: border-box;
`;

const CardHeader = styled.h1`
  color: #fff;
  width: 100%;
  height: 10rem;
  margin: 0;
  background-image: ${props => props.theme.backgroundGradientDark};
  line-height: 10rem;
  position: relative;
  font-weight: 100;
  user-select: none;

  &:after {
    content: "";
    position: absolute;
    pointer-events: none;
    background-repeat: no-repeat;
    background-position: 90%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${BackgroundImage});
    opacity: 0.1;
    z-index: 1;
  }

  span:first-child {
    background: #fff;
    color: #4b6983;
    font-weight: bold;
    text-transform: uppercase;
    opacity: 0.75;
    padding: 0 0.2em;
    margin-right: 0.2em;
  }

  span {
    font-size: 0.5em;
  }
`;

const BigCard = ({ title, children, ...other }) => (
  <Card {...other}>
    <CardHeader>{title}</CardHeader>
    {children}
  </Card>
);

BigCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default BigCard;
