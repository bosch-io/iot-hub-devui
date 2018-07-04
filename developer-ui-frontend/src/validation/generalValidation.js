/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
/**
*  runs all given validation functions on the value. If concatErrors is true, an array of all errors is returned,
*  if it is false, the validation stops on the first error and returns that error.
**/

export const applyValidations = (values, fieldName, validFns, concatErrors)  => {
  const errors = {};
  errors[fieldName] = [];
  let error = null;
  validFns.some(validFn => {
    error = validFn(values);
    if(error) {
      errors[fieldName].push(error);
      if (!concatErrors) {
        return true; // Stop iterating over the validFns
      }
    }
    return false; // Continue iterating over the validFns
  });

  return errors;
};
