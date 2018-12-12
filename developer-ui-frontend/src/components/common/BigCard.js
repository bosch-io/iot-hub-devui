/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import styled, { keyframes } from "styled-components";
import { transparentize, rgba } from "polished";
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

const infiniteProgress = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
`;

const openAnimation = keyframes`
  from {
    transform: scaleY(0);
  } to {
    transform: scaleY(1);
  }
`;

const LoadingBar = styled.div`
  position: absolute;
  bottom: 0;
  height: 0.3rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  animation: ${openAnimation} 0.5s cubic-bezier(0.12, 2, 0.67, 0.98) forwards;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 25%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(
      to right,
      ${props => transparentize(1, props.theme.accentGreen)} 0%,
      ${props => rgba(props.theme.accentGreen, 1)} 10%,
      ${props => rgba(props.theme.accentGreen, 1)} 90%,
      ${props => transparentize(1, props.theme.accentGreen)} 100%
    );
    z-index: 3;
    margin: 0;
    transform-origin: 50% 100%;
    animation: ${infiniteProgress} 2s cubic-bezier(0.7, 0.01, 0.37, 1) infinite;
  }
`;

const BigCard = ({ title, children, loadingBarShown, ...other }) => (
  <Card {...other}>
    <CardHeader>
      {title}
      {loadingBarShown && <LoadingBar />}
    </CardHeader>
    {children}
  </Card>
);

BigCard.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  loadingBarShown: PropTypes.bool
};

export default BigCard;
