/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// SVG Imports
import CaretDown from "images/caretDownIcon.svg";

const ClickProxy = styled.span`
  ${props => !props.sticky && "cursor: pointer"};
  display: inline-flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  height: 4rem;
  align-content: center;
  background: #fff;
  border: 1px solid #ccc;
  font-weight: 500;
  padding: 0 1rem;
  color: #757575;
  transition: box-shadow 0.4s ease-out;
  ${props =>
    props.expanded &&
    `box-shadow: inset 0px -5px 5px 0px rgba(28, 33, 35, 0.14);`};
`;

const ActionButtonsWrapper = styled.span`
  display: inline-flex;
  z-index: 2;
  overflow: visible;
  align-items: center;
  white-space: nowrap;

  svg {
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;

    path {
      fill: #757575;
    }
  }
`;

const TitleContainer = styled.span`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
`;

const TitleIcon = styled(({ icon, ...props }) =>
  React.cloneElement(icon, props)
)`
  display: inline-block;
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
  overflow: visible;
  path {
    fill: ${props => props.theme.accentColor};
  }
`;

const AccordionSectionHeader = ({
  title,
  icon,
  expanded,
  toggleExpanded,
  children,
  sticky,
  ...other
}) => (
  <div>
    <HeaderContainer expanded={expanded} {...other}>
      <ClickProxy onClick={toggleExpanded} sticky={sticky} />
      <TitleContainer>
        {icon ? <TitleIcon icon={icon} /> : null}
        {title}
      </TitleContainer>
      <ActionButtonsWrapper>
        {(expanded || sticky) && children}
        {!sticky && (
          <CaretDown
            className={
              expanded ? "header-icon-right caret-rotated" : "header-icon-right"
            }
            onClick={toggleExpanded}
          />
        )}
      </ActionButtonsWrapper>
    </HeaderContainer>
  </div>
);

AccordionSectionHeader.propTypes = {
  expanded: PropTypes.bool,
  toggleExpanded: PropTypes.func,
  title: PropTypes.string.isRequired,
  sticky: PropTypes.bool,
  icon: PropTypes.element,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default AccordionSectionHeader;
