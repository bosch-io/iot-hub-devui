/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { shallow } from "enzyme";
import Accordion from "components/common/Accordion/Accordion.js";

describe("Accordion", () => {
  it("should be defined", () => {
    expect(Accordion).toBeDefined();
  });
  it("should render correctly", () => {
    const tree = shallow(<Accordion />);
    expect(tree).toMatchSnapshot();
  });
});
