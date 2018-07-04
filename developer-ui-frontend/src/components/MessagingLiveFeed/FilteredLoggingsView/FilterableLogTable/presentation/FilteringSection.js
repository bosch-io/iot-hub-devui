/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import 'styles/filteringSection.scss';
import React from 'react';

import FilterIndicators from '../container/FilterIndicators';
import FilterForm from '../container/FilterForm';

/**
 * The filter form, including a "standard" text input form, a FilterDropdown component and any number of FilterIndicator
 * components. In case of an incorrect input, a ReactTooltip component gets displayed in this component for 1.5 seconds.
 *
 * @author Tim Weise
 * @version 0.1.0
 */
export default class FilteringSection extends React.Component {
  render() {
    return (
      <div>
        <div id="searchbar-container">
          <FilterForm />
        </div>
        <FilterIndicators />
      </div>
    );
  }
}
