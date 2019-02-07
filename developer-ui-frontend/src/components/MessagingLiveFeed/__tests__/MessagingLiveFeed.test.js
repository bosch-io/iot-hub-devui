/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import { shallow } from "enzyme";
import MessagingLiveFeed from "../MessagingLiveFeed";
import { MessagingLiveFeedWrapped } from "../MessagingLiveFeed";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import toJson from "enzyme-to-json";

const mockStore = configureStore([]); // No middlewares used in these tests

describe("<MessagingLiveFeed />", () => {
  const testProps = {
    configuredSubscriptions: [],
    useWebsockets: jest.fn(),
    handleNewSub: jest.fn()
  };

  it("renders the connected part correctly", () => {
    // Initialize mockstore with empty state
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = shallow(
      <Provider store={store}>
        <MessagingLiveFeed />
      </Provider>
    );
    expect(wrapper.find(MessagingLiveFeed).length).toEqual(1);
  });
  it("renders the presentational part correctly", () => {
    const wrapper = shallow(<MessagingLiveFeedWrapped {...testProps} />);
    expect(wrapper.length).toEqual(1);
  });
});
