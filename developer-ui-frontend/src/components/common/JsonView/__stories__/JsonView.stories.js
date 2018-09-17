/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import "styles/app.scss";
import "styles/stories.scss";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import JsonView, { JsonReadOnlyView, JsonEditor } from "../index";
// Use MemoryRouter as a Router Mock to be able to use the <Link/>s inside TooltipMenuOption
import { MemoryRouter } from "react-router";

const exampleJson = {
  widget: {
    debug: "on",
    window: {
      title: "Sample Konfabulator Widget",
      name: "main_window",
      width: 500,
      height: 500
    },
    image: {
      src: "Images/Sun.png",
      name: "sun1",
      hOffset: 250,
      vOffset: 250,
      alignment: "center"
    },
    text: {
      data: "Click Here",
      size: 36,
      style: "bold",
      name: "text1",
      hOffset: 250,
      vOffset: 100,
      alignment: "center",
      onMouseUp: "sun1.opacity = (sun1.opacity / 100) * 90;"
    }
  }
};

class JsonViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inEditingMode: false
    };
    this.setEditingMode = this.setEditingMode.bind(this);
  }

  setEditingMode(newMode) {
    this.setState({ inEditingMode: newMode });
  }

  render() {
    const { inEditingMode } = this.state;
    return (
      <div className="styleguide-card">
        <h1>Json Editor</h1>
        <button
          type="button"
          className="toggleJsonViewBtn"
          onClick={() => this.setEditingMode(!inEditingMode)}>
          Toggle Edit Mode
        </button>
        <div className="json-editor-container">
          <JsonView
            value={exampleJson}
            isFetching={false}
            inEditingMode={inEditingMode}>
            <JsonReadOnlyView />
            <JsonEditor
              onCancel={() => this.setEditingMode(false)}
              onSubmit={() => this.setEditingMode(false)}
              editorConfig={{ statusBar: false }}
              dynamicHeight
            />
          </JsonView>
        </div>
      </div>
    );
  }
}

storiesOf("Styleguide", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add(
    "JsonView",
    withInfo({ propTables: [JsonView, JsonReadOnlyView, JsonEditor] })(() => (
      <JsonViewDemo />
    ))
  );
