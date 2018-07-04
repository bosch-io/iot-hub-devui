/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { randomDate } from "utils";
import { fromJS } from "immutable";

export const hubDevPresetRegistrations = fromJS({
  byId: {
    2347: {
      deviceId: "2347",
      lastActive: new Date(2017, 11, 20, 3, 24, 0).getTime(),
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      registrationInfo: {
        enabled: true,
        optional: {}
      },
      credentials: ["2347-df534b6c45634615b68896c6d42479bc"]
    },
    4711: {
      deviceId: "4711",
      lastActive: new Date(2017, 11, 20, 3, 24, 0).getTime(),
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      registrationInfo: {
        enabled: true,
        optional: {}
      },
      credentials: ["4711-1abd104378cc43a3b729f309b0af36f6"]
    },
    4717: {
      deviceId: "4717",
      lastActive: new Date().getTime(),
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      registrationInfo: {
        enabled: true,
        optional: {}
      },
      credentials: ["4717-24b586f992a347a4b1f954258dfd9cf9"]
    },
    4727: {
      deviceId: "4727",
      lastActive: new Date(2017, 10, 5, 16, 9, 2).getTime(),
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      registrationInfo: {
        enabled: true,
        optional: {}
      },
      credentials: ["4727-f251b7c503b248569c6e883325c8e0d2"]
    },
    4729: {
      deviceId: "4729",
      lastActive: new Date().getTime(),
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      registrationInfo: {
        enabled: true,
        optional: {}
      },
      credentials: ["4729-7d243e0ae00e42d0815ac87ddfb753e3"]
    },
    4731: {
      deviceId: "4731",
      lastActive: new Date(2017, 9, 3, 15, 6, 2).getTime(),
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      registrationInfo: {
        enabled: true,
        optional: {}
      },
      credentials: ["4731-6310711012df48fb9a1006c67766a295"]
    },
    4732: {
      deviceId: "4732",
      lastActive: new Date(2017, 11, 24, 17, 32, 0).getTime(),
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      registrationInfo: {
        enabled: true,
        optional: {}
      },
      credentials: ["4732-1d2430358ea54afbb2150ee5e57a70fc"]
    },
    4746: {
      deviceId: "4746",
      lastActive: new Date().getTime(),
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      registrationInfo: {
        enabled: true,
        optional: {}
      },
      credentials: ["4746-c611002f97be4ddfb46dab94aa8fa70a"]
    },
    4780: {
      deviceId: "4780",
      lastActive: new Date(2017, 11, 15, 3, 33, 0).getTime(),
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      registrationInfo: {
        enabled: true,
        optional: {}
      },
      credentials: ["4780-4cb2dd19ecd54c15a510d7e9c261ec0d"]
    },
    HubTester: {
      deviceId: "HubTester",
      lastActive: new Date(2017, 11, 20, 3, 24, 0).getTime(),
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      registrationInfo: {
        enabled: true,
        optional: {}
      },
      credentials: ["HubTester-a8016401d65d4c6783aaf1efe2f466a7"]
    },
    "my-test-device": {
      deviceId: "my-test-device",
      lastActive: new Date(2018, 2, 20, 9, 33, 0).getTime(),
      currentlyActive: false,
      configuredSubscribed: false,
      isSubscribed: false,
      logs: [],
      registrationInfo: {
        enabled: true,
        optional: {}
      },
      credentials: ["my-test-device-f8a0fcb9943c4842a3a2536d8e9c6f4a"]
    }
  },
  allIds: [
    "2347",
    "4711",
    "4717",
    "4727",
    "4729",
    "4731",
    "4732",
    "4746",
    "4780",
    "HubTester",
    "my-test-device"
  ]
});

export const createExampleSubWOLogs = (id, lastActive, currActive) =>
  fromJS({
    deviceId: id || (Math.random() * 1000000).toString(),
    lastActive: lastActive || randomDate(),
    currentlyActive: currActive || Math.random() >= 0.5,
    configuredSubscribed: true,
    isSubscribed: true,
    logs: [],
    registrationInfo: {
      enabled: true,
      optional: {}
    },
    credentials: []
  });

export const createExampleReg = (id, lastActive, currActive) =>
  fromJS({
    deviceId: id || (Math.random() * 1000000).toString(),
    lastActive: lastActive || randomDate(),
    currentlyActive: currActive || Math.random() >= 0.5,
    configuredSubscribed: true,
    isSubscribed: false,
    logs: [],
    registrationInfo: {
      enabled: true,
      optional: {}
    },
    credentials: []
  });

export const hubDevPresetSubscriptions = [
  {
    configuredSubscribed: false,
    currentlyActive: false,
    deviceId: "HubTester",
    isSubscribed: false,
    lastActive: 1513736640000,
    logs: [],
    registrationInfo: {
      enabled: true,
      optional: {}
    },
    credentials: []
  },
  {
    configuredSubscribed: false,
    currentlyActive: false,
    deviceId: "my-test-device",
    isSubscribed: false,
    lastActive: 1521534780000,
    logs: [],
    registrationInfo: {
      enabled: true,
      optional: {}
    },
    credentials: []
  }
];
