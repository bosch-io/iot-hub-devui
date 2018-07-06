/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import "styles/app.scss";
import "styles/stories.scss";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import { FlatButton } from "../../buttons";
import {
  ConfigurationModal,
  ConfigurationModalHeader,
  ConfigurationModalFooter,
  ConfirmationModal
} from "../index";
import AddDeviceLogo from "images/addDeviceIcon.svg";

storiesOf("Styleguide", module).add(
  "Modals",
  withInfo({ propTables: [ConfigurationModal, ConfirmationModal] })(() => (
    <Playground />
  ))
);

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configModalShown: false,
      confirmModalShown: false
    };
    this.toggleConfigModal = this.toggleConfigModal.bind(this);
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
  }

  toggleConfigModal() {
    this.setState(state => ({ configModalShown: !state.configModalShown }));
  }

  toggleConfirmModal() {
    this.setState(state => ({ confirmModalShown: !state.confirmModalShown }));
  }

  render() {
    return (
      <div className="styleguide-card">
        <h1>Modals</h1>
        <FlatButton onClick={this.toggleConfirmModal} primary>
          Toggle Configuration Modal
        </FlatButton>
        <FlatButton onClick={this.toggleConfigModal} secondary>
          Toggle Confirmation Modal
        </FlatButton>
        <ConfirmationModal
          modalShown={this.state.confirmModalShown}
          subject={`Are you shure?`}
          toggleModal={this.toggleConfirmModal}
          confirm={() => {
            alert("Confirm Action triggered!");
          }}
          submitType="delete">
          {"Are you sure, you want to do this?"}
        </ConfirmationModal>
        <ConfigurationModal
          modalShown={this.state.configModalShown}
          toggleModal={this.toggleConfigModal}
          submitType="delete">
          <ConfigurationModalHeader
            subject={`Configuration Form`}
            subTitle={"Used for configuration"}
            icon={<AddDeviceLogo />}
          />
          <div style={{ flex: 1 }}>
            {"Configuration Form should be placed here"}
          </div>
          <ConfigurationModalFooter
            submitType="submit"
            toggleModal={this.toggleConfigModal}
            confirm={() => {
              alert("Configuration applied!");
            }}
          />
        </ConfigurationModal>
      </div>
    );
  }
}
