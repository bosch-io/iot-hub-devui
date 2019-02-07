/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { shallow } from "enzyme";
import OutlineButton from "components/common/buttons/OutlineButton.js";
import CopyIcon from "images/copyClipboardIcon.svg";

describe("OutlineButton", () => {
  it("should be defined", () => {
    expect(OutlineButton).toBeDefined();
  });
  it("should render correctly", () => {
    const tree = shallow(<OutlineButton name="button test" />);
    expect(tree).toMatchSnapshot();
  });
  it("should have a prop primary", () => {
    const tree = shallow(<OutlineButton name="button test" primary />);
    expect(tree.props().primary).toEqual(true);
  });
  it("should have a prop secondary", () => {
    const tree = shallow(<OutlineButton name="button test" secondary />);
    expect(tree.props().secondary).toEqual(true);
  });
  it("should have a prop danger", () => {
    const tree = shallow(<OutlineButton name="button test" danger />);
    expect(tree.props().danger).toEqual(true);
  });
  it("should have a prop cancel", () => {
    const tree = shallow(<OutlineButton name="button test" cancel />);
    expect(tree.props().cancel).toEqual(true);
  });
  it.skip("should have a prop icon", () => {
    const tree = shallow(<OutlineButton name="button test" icon={CopyIcon} />);
    expect(tree.props().icon).toEqual(CopyIcon);
  });
  it("should call mock function when button is clicked", () => {
    const mockFn = jest.fn();
    const tree = shallow(<OutlineButton name="button test" onClick={mockFn} />);
    tree.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
  it.skip("Compared values have no visual difference but may have different properties", () => {
    const tree = shallow(
      <OutlineButton name="button test" children={CopyIcon} />
    );
    expect(JSON.stringify(tree.props().children)).toEqual(
      JSON.stringify(<span>{CopyIcon} </span>)
    );
  });
});
