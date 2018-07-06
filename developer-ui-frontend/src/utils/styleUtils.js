/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
export const getThemeColor = props => {
  if (props.primary) {
    return props.theme.accentBlue;
  } else if (props.secondary) {
    return props.theme.accentGreen;
  } else if (props.danger) {
    return props.theme.accentRed;
  } else if (props.cancel) {
    return props.theme.disabledFontColorHiContrast;
  }
  return props.theme.disabledFontColor;
};
