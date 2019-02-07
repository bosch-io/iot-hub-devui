/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { shallow } from "enzyme";
import AccordionSectionBody from "components/common/Accordion/AccordionSection/AccordionSectionBody.js";

describe("AccordionSectionBody", () => {
  it("should be defined", () => {
    expect(AccordionSectionBody).toBeDefined();
  });
  it("should render correctly", () => {
    const tree = shallow(<AccordionSectionBody />);
    expect(tree).toMatchSnapshot();
  });
  it.skip("should have a prop scroll", () => {
    const tree = shallow(<AccordionSectionBody />);
    expect(tree.props().scroll).toEqual(true);
  });
  it.skip("should have a prop onResize", () => {
    const tree = shallow(<AccordionSectionBody />);
    expect(typeof tree.props().onResize).toBe("function");
  });
});
