/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { shallow } from "enzyme";
import AccordionSection from "components/common/Accordion/AccordionSection/AccordionSection.js";
import AccordionSectionHeader from "components/common/Accordion/AccordionSection/AccordionSectionHeader.js";
import AccordionSectionBody from "components/common/Accordion/AccordionSection/AccordionSectionBody.js";

describe("AccordionSection", () => {
  it("should be defined", () => {
    expect(AccordionSection).toBeDefined();
  });
  it("should render correctly", () => {
    const tree = shallow(
      <AccordionSection name="accordionSection test" expanded />
    );
    expect(tree).toMatchSnapshot();
  });
  it.skip("should have a prop className", () => {
    const tree = shallow(
      <AccordionSection name="accordionSection test" className="test" />
    );
    expect(tree.props().className).toEqual("test");
  });
  it.skip("should have a prop children", () => {
    const tree = shallow(
      <AccordionSection
        name="accordionSection test"
        children={[AccordionSectionHeader, AccordionSectionBody]}
      />
    );
    expect(tree.props().children).toEqual([
      AccordionSectionHeader,
      AccordionSectionBody
    ]);
  });
});
