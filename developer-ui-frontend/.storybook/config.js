import React from "react";
import { configure, addDecorator, setAddon } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import infoAddon, { setDefaults } from "@storybook/addon-info";

// Global decorator for styling and centering
const style = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "auto",
  backgroundImage: "linear-gradient(60deg, #29323c 0%, #485563 100%)"
};
const innerStyle = {
  margin: "auto"
};
const StyledDecorator = storyFn => (
  <div style={style}>
    <div style={innerStyle}>{storyFn()}</div>
  </div>
);
addDecorator(StyledDecorator);

// addon-info
setDefaults({
  header: true
});
setAddon(infoAddon);

// Configure React Storybook to look for files in src/components with .stories.js and load them dynamically
const req = require.context("../src/components", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Further storybook customization
setOptions({
  name: "Bosch IoT Hub Developer UI Docs",
  url: "https://docs.bosch-iot-hub.com/",
  showAddonPanel: false
});

configure(loadStories, module);
