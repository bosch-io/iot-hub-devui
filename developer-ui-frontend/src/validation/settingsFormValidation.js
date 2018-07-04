/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
const TXTKEY = "settingsTextInput";
const SETKEY = "selectedSettingsItem";

export const unitNormalization = values => {
  let validatedValue;
  const standardFormatted =
    values[TXTKEY] && values[TXTKEY].replace(/\s/g, "").toLowerCase();
  if (standardFormatted && isNaN(standardFormatted)) {
    // input contains characters other than numbers, eventually a valid unit
    // Units are only allowed in the Buffer Size Form (and only if there is a leading number to the unit)
    if (standardFormatted.match(/\d+/)) {
      const inputNumber = parseInt(standardFormatted.match(/\d+/)[0], 10);
      const inputWONumbers = standardFormatted.replace(/[0-9]/g, "");
      const testedUnitStrings = ["gb", "mb", "kb", "byte", "b"];
      let unit = "";
      testedUnitStrings.forEach(testedUnit => {
        if (inputWONumbers === testedUnit) {
          unit = testedUnit;
        }
      });
      switch (unit) {
        case "gb":
          validatedValue = inputNumber * 1000;
          break;
        case "kb":
          validatedValue = inputNumber / 1000;
          break;
        case "mb":
          validatedValue = inputNumber;
          break;
        // Fall-through case
        case "byte":
        case "b":
          validatedValue = inputNumber / 1000000;
          break;
        default:
          validatedValue = "Unknown Unit, use Byte, kB or MB";
      }
    } else {
      // No numbers inside input text
      validatedValue = "Enter a number for the buffer size";
    }
  } else if (standardFormatted && !isNaN(standardFormatted)) {
    validatedValue = parseInt(standardFormatted, 10);
  } else if (!standardFormatted) {
    validatedValue = "No empty Settings allowed";
  }
  return validatedValue;
};

export const valueRequired = values =>
  !values[TXTKEY] ||
  values[TXTKEY] === "" ||
  !values[SETKEY] ||
  values[TXTKEY] === ""
    ? "No empty Settings allowed"
    : undefined;

export const noNegativeValues = values =>
  values[TXTKEY] && parseInt(values[TXTKEY], 10) < 0
    ? "Enter a valid number"
    : undefined;

export const notOver700 = values =>
  !isNaN(values[TXTKEY]) && parseInt(values[TXTKEY], 10) > 700
    ? "A buffer size bigger than 700MB is not recommended"
    : undefined;

export const notOver100 = values =>
  !isNaN(values[TXTKEY]) && parseInt(values[TXTKEY], 10) > 100
    ? "More than 100 entries in the feed is not recommended"
    : undefined;

export const notOver1000 = values =>
  !isNaN(values[TXTKEY]) && parseInt(values[TXTKEY], 10) > 1000
    ? "Maximum buffer size is 1GB"
    : undefined;

// Normalization for NumberOfFeedLines
export const onlyNumbers = value => value.replace(/[^\d]/g, "");
