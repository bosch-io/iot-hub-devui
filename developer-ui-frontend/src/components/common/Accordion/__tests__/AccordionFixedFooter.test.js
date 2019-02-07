/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { shallow } from "enzyme";
import AccordionFixedFooter from "components/common/Accordion/AccordionFixedFooter.js";

const foo = i => j => i * j;
const foo2 = foo(2);
const bar = () => ({ baz: foo2, boz: 1 });

describe("AccordionFixedFooter", () => {
  it("should be defined", () => {
    expect(AccordionFixedFooter).toBeDefined();
  });
  it("should render correctly", () => {
    const tree = shallow(<AccordionFixedFooter />);
    expect(tree).toMatchSnapshot();
  });
  it.skip("should have a prop children", () => {
    const obj = bar();
    const tree = shallow(
      <AccordionFixedFooter name="accordionSection test" children={obj} />
    );
    expect(tree.props().children).toEqual(foo2);
  });
});
