/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Children, cloneElement, Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import enhanceWithClickOutside from "react-click-outside";

/* eslint-disable react/no-multi-comp */
const Container = styled.div`
  position: relative;
  ${props => `
    left: ${props.left}px;
    width: ${props.right - props.left}px;
    top: ${props.top}px;
    height: ${props.bottom - props.top}px;
  `};

  &:after {
    content: "";
    top: calc(169% + 1px);
    left: calc(50% + ((1.414213 * 1.5rem) / 2));
    z-index: 3;
    position: absolute;
    width: 0;
    height: 0;
    box-sizing: border-box;
    border: 0.75rem solid;
    transform-origin: 0 0;
    box-shadow: -1px 1px 1px 0 rgba(0, 0, 0, 0.12);
    border-color: transparent transparent #fff #fff;
    transition: transform 0.3s, opacity 0.3s, border-color 0.3s ease-in-out;
    ${props =>
      props.open
        ? `
        transform: rotate(135deg) translateY(0rem);
        opacity: 1;
      }`
        : `transform: rotate(135deg) translateY(1rem);
  opacity: 0;`};
  }
`;

const MenuContainer = styled.div`
  transition: transform 0.3s, opacity 0.3s;
  position: absolute;
  background: #fff;
  border-radius: 0 0 0.2em 0.2em;
  width: 20rem;
  height: ${props => `${props.numberChilds * 4}rem`};
  right: calc(100% - 4.5rem);
  top: 169%;
  z-index: 3;
  pointer-events: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  & > div {
    position: relative;
    overflow: hidden;
    height: 100%;
  }

  ${props =>
    props.open
      ? `
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto`
      : `
  pointer-events: none;
  transform: translateY(-1rem);
  opacity: 0;
  `};
`;

class MenuContainerEnhanced extends Component {
  handleClickOutside(e) {
    const { open, toggleOpen } = this.props;
    if (open) {
      toggleOpen();
      e.stopPropagation();
    }
  }
  render() {
    const { open, children, numberChilds } = this.props;
    return (
      <MenuContainer numberChilds={numberChilds} open={open}>
        {children}
      </MenuContainer>
    );
  }
}
MenuContainerEnhanced.propTypes = {
  open: PropTypes.bool,
  toggleOpen: PropTypes.func,
  numberChilds: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

MenuContainerEnhanced = enhanceWithClickOutside(MenuContainerEnhanced);

const MenuOptionsList = styled.ul`
  cursor: pointer;
  position: absolute;
  width: 100%;
  transform: translateX(0);
  transition: transform 0.3s;
  pointer-events: inherit;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

class TooltipMenu extends Component {
  componentDidMount() {
    this.ButtonAncor = document.getElementById(this.props.ancorId);
    this.MenuPortal = document.getElementById("menu-portal");
  }

  render() {
    const { open, toggleOpen, children } = this.props;
    if (this.ButtonAncor) {
      const {
        left,
        top,
        right,
        bottom
      } = this.ButtonAncor.getBoundingClientRect();
      return ReactDOM.createPortal(
        <Container
          left={left}
          top={top}
          right={right}
          bottom={bottom}
          open={open}>
          <MenuContainerEnhanced
            numberChilds={Children.count(children)}
            toggleOpen={toggleOpen}
            open={open}>
            <MenuOptionsList>
              {/* Spread the props to all children */}
              {Children.map(children, child =>
                cloneElement(child, { open, toggleOpen })
              )}
            </MenuOptionsList>
          </MenuContainerEnhanced>
        </Container>,
        this.MenuPortal
      );
    }
    return null;
  }
}

TooltipMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  ancorId: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default TooltipMenu;
