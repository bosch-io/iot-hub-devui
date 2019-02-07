/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { shallow } from "enzyme";
import Button from "components/common/buttons/Button.js";

describe("Button", () => {
  it("should be defined", () => {
    expect(Button).toBeDefined();
  });
  it("should render correctly", () => {
    const tree = shallow(<Button name="button test" />);
    expect(tree).toMatchSnapshot();
  });
});
