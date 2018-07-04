/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";
import { formatDateString } from "utils";
import { exampleLongMessageInStore } from "__mocks__/storeMocks/messageMocks";
import { initialState as exampleCredentialsInStore } from "reducers/CredentialsReducer";

/** Full store mocks (copied from Redux Dev Tools)
 * for integration tests and storybook stories, not for unit tests.
 **/

export const exampleEventBus = fromJS({
  pingInterval: 5000,
  pingTimerID: 23,
  reconnectEnabled: true,
  reconnectAttempts: 0,
  reconnectTimerID: null,
  maxReconnectAttempts: null,
  reconnectDelayMin: 1000,
  reconnectDelayMax: 5000,
  reconnectExponent: 2,
  randomizationFactor: 0.5,
  defaultHeaders: null,
  sockJSConn: {
    _listeners: {},
    readyState: 1,
    extensions: "",
    protocol: "",
    _server: "471",
    _origin: "http://localhost:9000",
    url: "http://localhost:8080/eventbus",
    _urlInfo: {
      nullOrigin: false,
      sameOrigin: false,
      sameScheme: true
    },
    _ir: null,
    _rto: 1252,
    _transUrl: "http://localhost:8080/eventbus",
    _transports: [null, null, null, null, null, null, null],
    _transportTimeoutId: null,
    _transport: {
      _listeners: {
        message: [null],
        close: [null]
      },
      url: "ws://localhost:8080/eventbus/471/1rg3wbgb/websocket",
      ws: {},
      unloadRef: "gitjojh0",
      transportName: "websocket"
    },
    transport: "websocket"
  },
  state: 1,
  handlers: {
    "device.HubTester": [null],
    "device.4746": [null]
  },
  replyHandlers: {}
});

export const exampleState = fromJS({
  devices: {
    byId: {
      "2347": {
        deviceId: "2347",
        lastActive: 1513736640000,
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
      "4711": {
        deviceId: "4711",
        lastActive: 1513736640000,
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
      "4717": {
        deviceId: "4717",
        lastActive: 1517393084000,
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
      "4727": {
        deviceId: "4727",
        lastActive: 1509894542000,
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
      "4729": {
        deviceId: "4729",
        lastActive: 1517393084000,
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
      "4731": {
        deviceId: "4731",
        lastActive: 1507035962000,
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
      "4732": {
        deviceId: "4732",
        lastActive: 1514133120000,
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
      "4746": {
        deviceId: "4746",
        lastActive: 1517393084000,
        currentlyActive: false,
        configuredSubscribed: true,
        isSubscribed: true,
        logs: ["4746-1517393523770", exampleLongMessageInStore.id],
        registrationInfo: {
          enabled: true,
          optional: {}
        },
        credentials: ["4746-c611002f97be4ddfb46dab94aa8fa70a"]
      },
      "4780": {
        deviceId: "4780",
        lastActive: 1513305180000,
        currentlyActive: false,
        configuredSubscribed: true,
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
        lastActive: 1517393529235,
        currentlyActive: true,
        configuredSubscribed: true,
        isSubscribed: true,
        logs: [
          "HubTester-1517393523766",
          "HubTester-1517393525393",
          "HubTester-1517393526182",
          "HubTester-1517393526807",
          "HubTester-1517393527505",
          "HubTester-1517393528120",
          "HubTester-1517393529235"
        ],
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
      "HubTester",
      "2347",
      "4711",
      "4717",
      "4727",
      "4729",
      "4731",
      "4732",
      "4746",
      "4780",
      "my-test-device"
    ]
  },
  logs: {
    byId: {
      "HubTester-1517393523766": {
        id: "HubTester-1517393523766",
        time: new Date("2018-01-31T10:12:03.766Z").getTime(),
        message: {
          type: "telemetry",
          deviceId: "HubTester",
          contentType: "application/json",
          content: '{"Foo": "Bar"}',
          applicationProperties: {
            device_id: "HubTester"
          }
        }
      },
      "HubTester-1517393525393": {
        id: "HubTester-1517393525393",
        time: new Date("2018-01-31T10:12:05.393Z").getTime(),
        message: {
          type: "telemetry",
          deviceId: "HubTester",
          contentType: "application/json",
          content: '{"Foo": "Bar"}',
          applicationProperties: {
            device_id: "HubTester"
          }
        }
      },
      "HubTester-1517393526182": {
        id: "HubTester-1517393526182",
        time: new Date("2018-01-31T10:12:06.182Z").getTime(),
        message: {
          type: "telemetry",
          deviceId: "HubTester",
          contentType: "application/json",
          content: '{"Foo": "Bar"}',
          applicationProperties: {
            device_id: "HubTester"
          }
        }
      },
      "HubTester-1517393526807": {
        id: "HubTester-1517393526807",
        time: new Date("2018-01-31T10:12:06.807Z").getTime(),
        message: {
          type: "telemetry",
          deviceId: "HubTester",
          contentType: "application/json",
          content: '{"Foo": "Bar"}',
          applicationProperties: {
            device_id: "HubTester"
          }
        }
      },
      "HubTester-1517393527505": {
        id: "HubTester-1517393527505",
        time: new Date("2018-01-31T10:12:07.505Z").getTime(),
        message: {
          type: "telemetry",
          deviceId: "HubTester",
          contentType: "application/json",
          content: '{"Foo": "Bar"}',
          applicationProperties: {
            device_id: "HubTester"
          }
        }
      },
      "HubTester-1517393528120": {
        id: "HubTester-1517393528120",
        time: new Date("2018-01-31T10:12:08.120Z").getTime(),
        message: {
          type: "telemetry",
          deviceId: "HubTester",
          contentType: "application/json",
          content: '{"Foo": "Bar"}',
          applicationProperties: {
            device_id: "HubTester"
          }
        }
      },
      "HubTester-1517393529235": {
        id: "HubTester-1517393529235",
        time: new Date("2018-01-31T10:12:09.235Z").getTime(),
        message: {
          type: "telemetry",
          deviceId: "HubTester",
          contentType: "application/json",
          content: '{"Foo": "Bar"}',
          applicationProperties: {
            device_id: "HubTester"
          }
        }
      },
      "4746-1517393523770": {
        id: "4746-1517393523770",
        time: new Date("2018-01-31T11:12:03.235Z").getTime(),
        message: {
          type: "event",
          deviceId: "4746",
          contentType: "application/json",
          content: '{"Temp": 21}',
          applicationProperties: {
            device_id: "4746"
          }
        }
      },
      [exampleLongMessageInStore.id]: exampleLongMessageInStore
    },
    allIds: [
      "HubTester-1517393523766",
      "HubTester-1517393525393",
      "HubTester-1517393526182",
      "HubTester-1517393526807",
      "HubTester-1517393527505",
      "HubTester-1517393528120",
      "HubTester-1517393529235",
      "4746-1517393523770",
      exampleLongMessageInStore.id
    ]
  },
  connection: {
    eventBus: exampleEventBus,
    eventBusConnected: true,
    hubConnected: true,
    fetchInProgress: {
      tenant: false,
      registrations: {
        global: false,
        byId: []
      },
      credentials: {
        global: false,
        byId: []
      }
    }
  },
  settings: {
    scrollAnimationActive: true,
    numberOfFeedLines: 50,
    logsSorting: {
      category: "unsorted",
      ascending: false
    }
  },
  filters: {
    byId: {
      "type-telemetry": {
        type: "Type",
        value: "telemetry",
        id: "type-telemetry"
      }
    },
    allIds: ["type-telemetry"]
  },
  logMemoryCalculation: {
    averageSizeOfLog: 160,
    maximumAmountOfLogs: 1250000,
    memCalcCounter: 2,
    totalThroughput: 7,
    bufferSize: 200
  },
  credentials: exampleCredentialsInStore,
  form: {
    filterSearchbar: {
      registeredFields: {
        filterSearch: {
          name: "filterSearch",
          type: "Field",
          count: 1
        },
        selectedDropdownItem: {
          name: "selectedDropdownItem",
          type: "Field",
          count: 1
        }
      }
    },
    settingsForm: {
      registeredFields: {
        settingsTextInput: {
          name: "settingsTextInput",
          type: "Field",
          count: 1
        },
        selectedSettingsItem: {
          name: "selectedSettingsItem",
          type: "Field",
          count: 1
        }
      },
      values: {
        selectedSettingsItem: "Number of Feed Lines"
      }
    },
    additionalSubscriptionsForm: {
      registeredFields: {
        additionalSubsRegistrySearch: {
          name: "additionalSubsRegistrySearch",
          type: "Field",
          count: 1
        }
      },
      values: {
        additionalSubsRegistrySearch: "",
        registrations: [
          {
            deviceId: "HubTester",
            configuredSubscribed: true
          },
          {
            deviceId: "2347",
            configuredSubscribed: false
          },
          {
            deviceId: "4711",
            configuredSubscribed: false
          },
          {
            deviceId: "4717",
            configuredSubscribed: false
          },
          {
            deviceId: "4727",
            configuredSubscribed: false
          },
          {
            deviceId: "4729",
            configuredSubscribed: false
          },
          {
            deviceId: "4731",
            configuredSubscribed: false
          },
          {
            deviceId: "4732",
            configuredSubscribed: false
          },
          {
            deviceId: "4746",
            configuredSubscribed: true
          },
          {
            deviceId: "4780",
            configuredSubscribed: false
          }
        ]
      },
      initial: {
        additionalSubsRegistrySearch: "",
        registrations: [
          {
            deviceId: "HubTester",
            configuredSubscribed: true
          },
          {
            deviceId: "2347",
            configuredSubscribed: false
          },
          {
            deviceId: "4711",
            configuredSubscribed: false
          },
          {
            deviceId: "4717",
            configuredSubscribed: false
          },
          {
            deviceId: "4727",
            configuredSubscribed: false
          },
          {
            deviceId: "4729",
            configuredSubscribed: false
          },
          {
            deviceId: "4731",
            configuredSubscribed: false
          },
          {
            deviceId: "4732",
            configuredSubscribed: false
          },
          {
            deviceId: "4746",
            configuredSubscribed: true
          },
          {
            deviceId: "4780",
            configuredSubscribed: false
          }
        ]
      }
    }
  }
});

export const exampleStateNotConnected = fromJS({
  devices: {
    byId: {
      "2347": {
        deviceId: "2347",
        lastActive: 1513736640000,
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
      "4711": {
        deviceId: "4711",
        lastActive: 1513736640000,
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
      "4717": {
        deviceId: "4717",
        lastActive: 1517394775000,
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
      "4727": {
        deviceId: "4727",
        lastActive: 1509894542000,
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
      "4729": {
        deviceId: "4729",
        lastActive: 1517394775000,
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
      "4731": {
        deviceId: "4731",
        lastActive: 1507035962000,
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
      "4732": {
        deviceId: "4732",
        lastActive: 1514133120000,
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
      "4746": {
        deviceId: "4746",
        lastActive: 1517394775000,
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
      "4780": {
        deviceId: "4780",
        lastActive: 1513305180000,
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
        lastActive: 1513736640000,
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
      "HubTester",
      "my-test-device",
      "2347",
      "4711",
      "4717",
      "4727",
      "4729",
      "4731",
      "4732",
      "4746",
      "4780"
    ]
  },
  logs: {
    byId: {},
    allIds: []
  },
  connection: {
    eventBus: null,
    eventBusConnected: false,
    hubConnected: false,
    fetchInProgress: {
      tenant: false,
      registrations: {
        global: false,
        byId: []
      },
      credentials: {
        global: false,
        byId: []
      }
    }
  },
  settings: {
    scrollAnimationActive: true,
    numberOfFeedLines: 50,
    logsSorting: {
      category: "unsorted",
      ascending: false
    }
  },
  filters: {
    byId: {},
    allIds: []
  },
  logMemoryCalculation: {
    averageSizeOfLog: null,
    maximumAmountOfLogs: null,
    memCalcCounter: 0,
    totalThroughput: 0,
    bufferSize: 200
  },
  credentials: exampleCredentialsInStore,
  form: {
    filterSearchbar: {
      registeredFields: {
        filterSearch: {
          name: "filterSearch",
          type: "Field",
          count: 1
        },
        selectedDropdownItem: {
          name: "selectedDropdownItem",
          type: "Field",
          count: 1
        }
      }
    },
    settingsForm: {
      registeredFields: {
        settingsTextInput: {
          name: "settingsTextInput",
          type: "Field",
          count: 1
        },
        selectedSettingsItem: {
          name: "selectedSettingsItem",
          type: "Field",
          count: 1
        }
      },
      values: {
        selectedSettingsItem: "Number of Feed Lines"
      }
    },
    additionalSubscriptionsForm: {
      registeredFields: {
        additionalSubsRegistrySearch: {
          name: "additionalSubsRegistrySearch",
          type: "Field",
          count: 1
        }
      },
      values: {
        additionalSubsRegistrySearch: "",
        registrations: [
          {
            deviceId: "HubTester",
            configuredSubscribed: false
          },
          {
            deviceId: "2347",
            configuredSubscribed: false
          },
          {
            deviceId: "4711",
            configuredSubscribed: false
          },
          {
            deviceId: "4717",
            configuredSubscribed: false
          },
          {
            deviceId: "4727",
            configuredSubscribed: false
          },
          {
            deviceId: "4729",
            configuredSubscribed: false
          },
          {
            deviceId: "4731",
            configuredSubscribed: false
          },
          {
            deviceId: "4732",
            configuredSubscribed: false
          },
          {
            deviceId: "4746",
            configuredSubscribed: false
          },
          {
            deviceId: "4780",
            configuredSubscribed: false
          }
        ]
      },
      initial: {
        additionalSubsRegistrySearch: "",
        registrations: [
          {
            deviceId: "HubTester",
            configuredSubscribed: false
          },
          {
            deviceId: "2347",
            configuredSubscribed: false
          },
          {
            deviceId: "4711",
            configuredSubscribed: false
          },
          {
            deviceId: "4717",
            configuredSubscribed: false
          },
          {
            deviceId: "4727",
            configuredSubscribed: false
          },
          {
            deviceId: "4729",
            configuredSubscribed: false
          },
          {
            deviceId: "4731",
            configuredSubscribed: false
          },
          {
            deviceId: "4732",
            configuredSubscribed: false
          },
          {
            deviceId: "4746",
            configuredSubscribed: false
          },
          {
            deviceId: "4780",
            configuredSubscribed: false
          }
        ]
      }
    }
  }
});
