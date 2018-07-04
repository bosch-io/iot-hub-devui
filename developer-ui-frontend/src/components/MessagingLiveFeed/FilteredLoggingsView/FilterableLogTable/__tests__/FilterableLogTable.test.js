/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { shallow } from "enzyme";
import FilterableLogTable from "../FilterableLogTable";

describe("FilterableLogTable", () => {
  const testProps = {
    toggleDevicesPanel: jest.fn(),
    devicesPanelExpanded: true
  };
  it("renders correctly", () => {
    const wrapper = shallow(<FilterableLogTable {...testProps} />);
    expect(wrapper.length).toEqual(1);
  });
  it("toggles the DevicePanel on an expand button click", () => {
    const wrapper = shallow(<FilterableLogTable {...testProps} />);
    wrapper.find("div.expandButton").simulate("click");
    expect(testProps.toggleDevicesPanel).toHaveBeenCalled();
  });
});
