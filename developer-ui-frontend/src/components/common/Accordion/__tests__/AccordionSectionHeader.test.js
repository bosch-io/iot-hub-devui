/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { shallow, mount } from "enzyme";
import AccordionSectionHeader from "components/common/Accordion/AccordionSection/AccordionSectionHeader.js";
import CaretDown from "images/caretDownIcon.svg";
import styled from "styled-components";

// describe("AccordionSectionHeader", () => {

// });

describe("AccordionSectionHeader", () => {
  let props;
  let mountedAccordionSectionHeader;
  const accordionSectionHeader = () => {
    if (!mountedAccordionSectionHeader) {
      mountedAccordionSectionHeader = mount(
        <AccordionSectionHeader {...props} />
      );
    }
    return mountedAccordionSectionHeader;
  };

  beforeEach(() => {
    props = {
      title: undefined
    };
    mountedAccordionSectionHeader = undefined;
  });

  it("should be defined", () => {
    expect(AccordionSectionHeader).toBeDefined();
  });

  it("should render correctly", () => {
    const tree = shallow(
      <AccordionSectionHeader name="AccordionSectionHeader test" />
    );
    expect(tree).toMatchSnapshot();
  });

  it("always render a div", () => {
    const divs = accordionSectionHeader().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it.skip("should have a prop children", () => {
    const tree = shallow(
      <AccordionSectionHeader
        name="AccordionSectionHeader test"
        title="Title"
      />
    );
    expect(tree.props().children).toEqual(
      <styled.div name="AccordionSectionHeader test">
        <styled.div />
        <styled.span>Title</styled.span>
        <styled.div>
          <test-file-stub className="header-icon-right" />
        </styled.div>
      </styled.div>
    );
  });
});
