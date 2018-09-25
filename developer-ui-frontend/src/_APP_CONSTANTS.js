/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
export const FILTER_CATEGORIES = ["Type", "Device Id", "Content-Type"];

export const SETTINGS_CATEGORIES = [
  { name: "Number of Feed Lines", type: "formConfig" },
  { name: "Buffer Size", type: "formConfig" },
  { name: "Auto Scroll Animation", type: "checkboxConfig" }
];

export const CREDENTIAL_OPTIONS = [
  "Add Secret",
  "Delete Secret",
  "Delete Credential"
];

export const CREDENTIAL_TYPES = {
  PASSWORD: "pw",
  CERTIFICATE: "cert"
};

// Defines the interval (in messages) to recalculate the current average memory consumption of one log (In LoggingStore and LogTable).
export const AVERAGE_MEMCALC_INTERVAL = 5;

export const HYPERLINK_MINLENGTH = 85;

export const RESTSERVER_URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:8080/hubdev/api"
    : "http://localhost:8080/hubdev/api";

export const WSSERVER_URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:8080/hubdev/eventbus"
    : "http://localhost:8080/hubdev/eventbus";
