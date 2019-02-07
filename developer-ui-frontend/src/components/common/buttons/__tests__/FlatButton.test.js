/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { shallow } from "enzyme";
import FlatButton from "components/common/buttons/FlatButton.js";
import CopyIcon from "images/copyClipboardIcon.svg";

describe("FlatButton", () => {
  it("should be defined", () => {
    expect(FlatButton).toBeDefined();
  });
  it("should render correctly", () => {
    const tree = shallow(<FlatButton name="button test" />);
    expect(tree).toMatchSnapshot();
  });
  it("should have a prop primary", () => {
    const tree = shallow(<FlatButton name="button test" primary />);
    expect(tree.props().primary).toEqual(1);
  });
  it("should have a prop secondary", () => {
    const tree = shallow(<FlatButton name="button test" secondary />);
    expect(tree.props().secondary).toEqual(1);
  });
  it("should have a prop danger", () => {
    const tree = shallow(<FlatButton name="button test" danger />);
    expect(tree.props().danger).toEqual(1);
  });
  it("should have a prop submitAnimation", () => {
    const tree = shallow(<FlatButton name="button test" submitAnimation />);
    expect(tree.props().submitAnimation).toEqual(true);
  });
  it("should have a prop type", () => {
    const tree = shallow(<FlatButton name="button test" type="submit" />);
    expect(tree.props().type).toEqual("submit");
  });
  it("should call mock function when button is clicked", () => {
    const mockFn = jest.fn();
    const tree = shallow(<FlatButton name="button test" onClick={mockFn} />);
    tree.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
  it.skip("Compared values have no visual difference but may have different properties", () => {
    const tree = shallow(<FlatButton name="button test" children={CopyIcon} />);
    expect(JSON.stringify(tree.props().children)).toEqual(
      JSON.stringify(<span>{CopyIcon} </span>)
    );
  });
});
