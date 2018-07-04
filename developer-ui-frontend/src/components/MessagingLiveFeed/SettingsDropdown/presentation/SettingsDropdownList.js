/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { SETTINGS_CATEGORIES } from '_APP_CONSTANTS';
import SettingsDropdownEntry from '../container/SettingsDropdownEntry';

export default class SettingsDropdownList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSettingsItem: null
    };
    this.changeSelectedSetting = this.changeSelectedSetting.bind(this);
  }

  changeSelectedSetting(entry) {
    const selectedItemRef = this.props.selectedItemRef.getRenderedComponent();
    this.setState({ selectedSettingsItem: entry });
    // Take the DOM value as selected <option> in <select>
    selectedItemRef.value = entry;
    // Simulate an actual click on the selected <option> of the hidden <select>
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: false
    });
    const changeEvent = new Event('change', {
      bubbles: true
    });
    selectedItemRef.options[selectedItemRef.selectedIndex].dispatchEvent(
      clickEvent
    );
    selectedItemRef.dispatchEvent(changeEvent);
  }

  render() {
    const { toggleDropdownMenu, toggleEditingView } = this.props;
    return (
      <ul>
        {SETTINGS_CATEGORIES.filter(
          category => category.type === 'formConfig'
        ).map((category, index) => (
          <SettingsDropdownEntry
            categoryName={category.name}
            type={category.type}
            key={category.type + index}
            toggleDropdownMenu={toggleDropdownMenu}
            toggleEditingView={toggleEditingView}
            changeSelectedDropdown={en => this.changeSelectedSetting(en)}
          />
        ))}
        {SETTINGS_CATEGORIES.filter(
          category => category.type === 'checkboxConfig'
        ).map((category, index) => (
          <SettingsDropdownEntry
            categoryName={category.name}
            type={category.type}
            key={category.type + index}
            toggleDropdownMenu={toggleDropdownMenu}
            toggleEditingView={toggleEditingView}
          />
        ))}
      </ul>
    );
  }
}

SettingsDropdownList.propTypes = {
  toggleDropdownMenu: PropTypes.func,
  toggleEditingView: PropTypes.func,
  selectedItemRef: PropTypes.object
};
