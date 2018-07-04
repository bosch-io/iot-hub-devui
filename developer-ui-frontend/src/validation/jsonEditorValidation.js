/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
export const noEmptyKeys = obj =>
  Object.keys(obj).filter(
    key => !key || key === "undefined" || key.length === 0
  ).length > 0
    ? "No empty keys allowed"
    : undefined;
