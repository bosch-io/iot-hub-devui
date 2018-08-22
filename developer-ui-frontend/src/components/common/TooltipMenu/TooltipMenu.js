/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Children, cloneElement, Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import enhanceWithClickOutside from "react-click-outside";

/* eslint-disable react/no-multi-comp */
const Container = styled.div`
  position: relative;
  height: 1.5rem;
`;

const MenuButtonContainer = styled.div`
  display: inline-block;
`;

const MenuButtonIcon = styled(({ icon, ...props }) =>
  React.cloneElement(icon, props)
)`
  cursor: pointer;
  z-index: 2;
  transition: transform 0.3s;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 1rem;

  path {
    fill: #757575;
  }
`;

const MenuContainer = styled.div`
  transition: transform 0.3s, opacity 0.3s;
  position: absolute;
  background: #fff;
  border-radius: 0 0 0.2em 0.2em;
  width: 20rem;
  height: ${props => `${props.numberChilds * 4}rem`};
  right: calc(100% - 5rem);
  top: 169%;
  z-index: 3;
  pointer-events: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  &:before {
    content: "";
    right: 0.7rem;
    z-index: 3;
    position: absolute;
    width: 0;
    height: 0;
    margin-left: -0.5em;
    top: 1px;
    right: 0.7rem;
    box-sizing: border-box;
    border: 0.75rem solid;
    transform-origin: 0 0;
    transform: rotate(135deg);
    box-shadow: -1px 1px 1px 0 rgba(0, 0, 0, 0.12);
    transition: border-color 0.3s ease-in-out;
    border-color: transparent transparent #fff #fff;
  }
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
  pointer-events: inherit`
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

const TooltipMenu = ({
  open,
  toggleOpen,
  menuIconTooltipId,
  menuIcon,
  children
}) => (
  <Container>
    <MenuButtonContainer>
      <MenuButtonIcon
        icon={menuIcon}
        onClick={toggleOpen}
        data-tip
        data-for={menuIconTooltipId}
      />
    </MenuButtonContainer>
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
  </Container>
);

TooltipMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  menuIcon: PropTypes.element,
  menuIconTooltipId: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default TooltipMenu;
