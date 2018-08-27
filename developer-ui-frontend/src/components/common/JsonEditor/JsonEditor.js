/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import { JsonEditor as Editor } from "jsoneditor-react";
import ace from "brace";
import "styles/jsonEditor.scss";
import "brace/mode/json";
// import "brace/theme/tomorrow_night_blue";
import "./customAceTheme";

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

export default class JsonEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Editor
        value={exampleJson}
        search={false}
        navigationBar={false}
        ace={ace}
        mode="code"
        theme="ace/theme/prism_duo_tone"
      />
    );
  }
}
