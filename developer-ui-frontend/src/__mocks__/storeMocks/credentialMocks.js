/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";

export const hubDevPresetCredentials = fromJS({
  byId: {
    "2347-df534b6c45634615b68896c6d42479bc": {
      authId: "2347-df534b6c45634615b68896c6d42479bc",
      type: "hashed-password",
      secrets: ["2347-df534b6c45634615b68896c6d42479bc-1"]
    },
    "4711-1abd104378cc43a3b729f309b0af36f6": {
      authId: "4711-1abd104378cc43a3b729f309b0af36f6",
      type: "hashed-password",
      secrets: ["4711-1abd104378cc43a3b729f309b0af36f6-1"]
    },
    "4717-24b586f992a347a4b1f954258dfd9cf9": {
      authId: "4717-24b586f992a347a4b1f954258dfd9cf9",
      type: "hashed-password",
      secrets: ["4717-24b586f992a347a4b1f954258dfd9cf9-1"]
    },
    "4727-f251b7c503b248569c6e883325c8e0d2": {
      authId: "4727-f251b7c503b248569c6e883325c8e0d2",
      type: "hashed-password",
      secrets: [
        "4727-f251b7c503b248569c6e883325c8e0d2-1",
        "4727-f251b7c503b248569c6e883325c8e0d2-2"
      ]
    },
    "4729-7d243e0ae00e42d0815ac87ddfb753e3": {
      authId: "4729-7d243e0ae00e42d0815ac87ddfb753e3",
      type: "hashed-password",
      secrets: ["4729-7d243e0ae00e42d0815ac87ddfb753e3-1"]
    },
    "4731-6310711012df48fb9a1006c67766a295": {
      authId: "4731-6310711012df48fb9a1006c67766a295",
      type: "hashed-password",
      secrets: ["4731-6310711012df48fb9a1006c67766a295-1"]
    },
    "4732-1d2430358ea54afbb2150ee5e57a70fc": {
      authId: "4732-1d2430358ea54afbb2150ee5e57a70fc",
      type: "hashed-password",
      secrets: ["4732-1d2430358ea54afbb2150ee5e57a70fc-1"]
    },
    "4746-c611002f97be4ddfb46dab94aa8fa70a": {
      authId: "4746-c611002f97be4ddfb46dab94aa8fa70a",
      type: "hashed-password",
      secrets: ["4746-c611002f97be4ddfb46dab94aa8fa70a-1"]
    },
    "4780-4cb2dd19ecd54c15a510d7e9c261ec0d": {
      authId: "4780-4cb2dd19ecd54c15a510d7e9c261ec0d",
      type: "hashed-password",
      secrets: ["4780-4cb2dd19ecd54c15a510d7e9c261ec0d-1"]
    },
    "HubTester-a8016401d65d4c6783aaf1efe2f466a7": {
      authId: "HubTester-a8016401d65d4c6783aaf1efe2f466a7",
      type: "hashed-password",
      secrets: ["HubTester-a8016401d65d4c6783aaf1efe2f466a7-1"]
    },
    "my-test-device-f8a0fcb9943c4842a3a2536d8e9c6f4a": {
      authId: "my-test-device-f8a0fcb9943c4842a3a2536d8e9c6f4a",
      type: "hashed-password",
      secrets: ["my-test-device-f8a0fcb9943c4842a3a2536d8e9c6f4a-1"]
    }
  },
  allIds: [
    "2347-df534b6c45634615b68896c6d42479bc",
    "4711-1abd104378cc43a3b729f309b0af36f6",
    "4717-24b586f992a347a4b1f954258dfd9cf9",
    "4727-f251b7c503b248569c6e883325c8e0d2",
    "4729-7d243e0ae00e42d0815ac87ddfb753e3",
    "4731-6310711012df48fb9a1006c67766a295",
    "4732-1d2430358ea54afbb2150ee5e57a70fc",
    "4746-c611002f97be4ddfb46dab94aa8fa70a",
    "4780-4cb2dd19ecd54c15a510d7e9c261ec0d",
    "HubTester-a8016401d65d4c6783aaf1efe2f466a7",
    "my-test-device-f8a0fcb9943c4842a3a2536d8e9c6f4a"
  ],
  secrets: {
    byId: {
      "2347-df534b6c45634615b68896c6d42479bc-1": {
        secretId: "2347-df534b6c45634615b68896c6d42479bc-1",
        "hash-function": "sha-512",
        "pwd-hash":
          "b27fa26912256f92565faa2e4bdd0c4a39c5cc13a698df360c28c8c4f243e8fa653bb13fe28fd3a7942e69fbbeca9441903de0066af49c55f2ff97e8e67e7e63"
      },
      "4711-1abd104378cc43a3b729f309b0af36f6-1": {
        secretId: "4711-1abd104378cc43a3b729f309b0af36f6-1",
        "hash-function": "sha-1",
        "pwd-hash": "35619072dbac1a8e6ea9e9c0288efc0fbe8648de"
      },
      "4717-24b586f992a347a4b1f954258dfd9cf9-1": {
        secretId: "4717-24b586f992a347a4b1f954258dfd9cf9-1",
        "hash-function": "sha-256",
        "pwd-hash":
          "fa639a9a5db0a932f92399ee41d28e54332c6b2c808aa6f6a49a3fe0f652aa4d"
      },
      "4727-f251b7c503b248569c6e883325c8e0d2-1": {
        secretId: "4727-f251b7c503b248569c6e883325c8e0d2-1",
        "hash-function": "sha-256",
        "pwd-hash":
          "d8d701617d21ae1a0f413c3eb95219ca52fe91484a35fa5c56897a408048dd04"
      },
      "4727-f251b7c503b248569c6e883325c8e0d2-2": {
        secretId: "4727-f251b7c503b248569c6e883325c8e0d2-2",
        "hash-function": "sha-256",
        "pwd-hash":
          "2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b"
      },
      "4729-7d243e0ae00e42d0815ac87ddfb753e3-1": {
        secretId: "4729-7d243e0ae00e42d0815ac87ddfb753e3-1",
        "hash-function": "sha-256",
        "pwd-hash":
          "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4"
      },
      "4731-6310711012df48fb9a1006c67766a295-1": {
        secretId: "4731-6310711012df48fb9a1006c67766a295-1",
        "hash-function": "sha-256",
        "pwd-hash":
          "ac10be4bc110d34370d1ac6977e78fe122a3babaa4641a7977bbfff61b4b6dcd"
      },
      "4732-1d2430358ea54afbb2150ee5e57a70fc-1": {
        secretId: "4732-1d2430358ea54afbb2150ee5e57a70fc-1",
        "hash-function": "sha-256",
        "pwd-hash":
          "33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2"
      },
      "4746-c611002f97be4ddfb46dab94aa8fa70a-1": {
        secretId: "4746-c611002f97be4ddfb46dab94aa8fa70a-1",
        "hash-function": "sha-256",
        "pwd-hash":
          "a148bc748f1ebb46168f5b542c17a4d9046171e0c7ffdfdcb858597600940e3f"
      },
      "4780-4cb2dd19ecd54c15a510d7e9c261ec0d-1": {
        secretId: "4780-4cb2dd19ecd54c15a510d7e9c261ec0d-1",
        "hash-function": "sha-1",
        "pwd-hash": "46babe61e2ca39c790c4524f4ba42e78a4cdece9"
      },
      "HubTester-a8016401d65d4c6783aaf1efe2f466a7-1": {
        secretId: "HubTester-a8016401d65d4c6783aaf1efe2f466a7-1",
        "hash-function": "sha-1",
        "pwd-hash": "752bb3ff18055fefcddfcd87881fce12273ddf47"
      },
      "my-test-device-f8a0fcb9943c4842a3a2536d8e9c6f4a-1": {
        secretId: "my-test-device-f8a0fcb9943c4842a3a2536d8e9c6f4a-1",
        "hash-function": "sha-1",
        "pwd-hash": "5395ebfd174b0a5617e6f409dfbb3e064e3fdf0a"
      }
    },
    allIds: [
      "2347-df534b6c45634615b68896c6d42479bc-1",
      "4711-1abd104378cc43a3b729f309b0af36f6-1",
      "4717-24b586f992a347a4b1f954258dfd9cf9-1",
      "4727-f251b7c503b248569c6e883325c8e0d2-1",
      "4727-f251b7c503b248569c6e883325c8e0d2-2",
      "4729-7d243e0ae00e42d0815ac87ddfb753e3-1",
      "4731-6310711012df48fb9a1006c67766a295-1",
      "4732-1d2430358ea54afbb2150ee5e57a70fc-1",
      "4746-c611002f97be4ddfb46dab94aa8fa70a-1",
      "4780-4cb2dd19ecd54c15a510d7e9c261ec0d-1",
      "HubTester-a8016401d65d4c6783aaf1efe2f466a7-1",
      "my-test-device-f8a0fcb9943c4842a3a2536d8e9c6f4a-1"
    ]
  }
});

export const credentialsAfterFirstGet = fromJS({
  byId: {
    "newDevice-97fff113f84b4d91a208889d13236fa8": {
      "device-id": "newDevice",
      type: "hashed-password",
      "auth-id": "newDevice-97fff113f84b4d91a208889d13236fa8",
      enabled: true,
      secrets: [
        "newDevice-97fff113f84b4d91a208889d13236fa8-WnOldvb69rJO0Z7url47bd6JAOE="
      ]
    },
    "newDevice-f6ca6710e78043568ddf86b70bb4f010": {
      "device-id": "newDevice",
      type: "hashed-password",
      "auth-id": "newDevice-f6ca6710e78043568ddf86b70bb4f010",
      enabled: true,
      secrets: [
        "newDevice-f6ca6710e78043568ddf86b70bb4f010-S8Vfl1A7sOnLRHG51JrBlU9pSys=",
        "newDevice-f6ca6710e78043568ddf86b70bb4f010-BrMRGJOGcYME9RFlUghBJi7RBNM="
      ]
    }
  },
  allIds: [
    "newDevice-97fff113f84b4d91a208889d13236fa8",
    "newDevice-f6ca6710e78043568ddf86b70bb4f010"
  ],
  secrets: {
    byId: {
      "newDevice-97fff113f84b4d91a208889d13236fa8-WnOldvb69rJO0Z7url47bd6JAOE=": {
        secretId:
          "newDevice-97fff113f84b4d91a208889d13236fa8-WnOldvb69rJO0Z7url47bd6JAOE=",
        "hash-function": "sha-512",
        "pwd-hash":
          "b821b1b6e19c9223f00c67d1a140efa26c41d70de72b88b514712a269437446235fbe5170d80da071b6b7f738e070462ac4fc0786f1b47738ff064761c03befb"
      },
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-S8Vfl1A7sOnLRHG51JrBlU9pSys=": {
        secretId:
          "newDevice-f6ca6710e78043568ddf86b70bb4f010-S8Vfl1A7sOnLRHG51JrBlU9pSys=",
        "pwd-hash":
          "QOnuX1H2FykBfS94voqoKfreuLXSZqXkzjYbxpx4N+TDACDLBMlGcms6I6NviFn1IOnOAOEzf0Wh+vslEnXbdw==",
        "hash-function": "sha-512"
      },
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-BrMRGJOGcYME9RFlUghBJi7RBNM=": {
        secretId:
          "newDevice-f6ca6710e78043568ddf86b70bb4f010-BrMRGJOGcYME9RFlUghBJi7RBNM=",
        "hash-function": "sha-512",
        "pwd-hash":
          "YpD78SGHQaYypz2GkPp+qghndcfmVQx/Sk8a4EpNMkUwqEHSHiIL0k8cs57DJOyYxg6ydU47ltP4tI4YBWJ30g=="
      }
    },
    allIds: [
      "newDevice-97fff113f84b4d91a208889d13236fa8-WnOldvb69rJO0Z7url47bd6JAOE=",
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-S8Vfl1A7sOnLRHG51JrBlU9pSys=",
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-BrMRGJOGcYME9RFlUghBJi7RBNM="
    ]
  }
});

export const credentialsAfterDeletedCred = fromJS({
  byId: {
    "newDevice-f6ca6710e78043568ddf86b70bb4f010": {
      "device-id": "newDevice",
      type: "hashed-password",
      "auth-id": "newDevice-f6ca6710e78043568ddf86b70bb4f010",
      enabled: true,
      secrets: [
        "newDevice-f6ca6710e78043568ddf86b70bb4f010-S8Vfl1A7sOnLRHG51JrBlU9pSys=",
        "newDevice-f6ca6710e78043568ddf86b70bb4f010-BrMRGJOGcYME9RFlUghBJi7RBNM="
      ]
    }
  },
  allIds: ["newDevice-f6ca6710e78043568ddf86b70bb4f010"],
  secrets: {
    byId: {
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-S8Vfl1A7sOnLRHG51JrBlU9pSys=": {
        secretId:
          "newDevice-f6ca6710e78043568ddf86b70bb4f010-S8Vfl1A7sOnLRHG51JrBlU9pSys=",
        "pwd-hash":
          "QOnuX1H2FykBfS94voqoKfreuLXSZqXkzjYbxpx4N+TDACDLBMlGcms6I6NviFn1IOnOAOEzf0Wh+vslEnXbdw==",
        "hash-function": "sha-512"
      },
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-BrMRGJOGcYME9RFlUghBJi7RBNM=": {
        secretId:
          "newDevice-f6ca6710e78043568ddf86b70bb4f010-BrMRGJOGcYME9RFlUghBJi7RBNM=",
        "hash-function": "sha-512",
        "pwd-hash":
          "YpD78SGHQaYypz2GkPp+qghndcfmVQx/Sk8a4EpNMkUwqEHSHiIL0k8cs57DJOyYxg6ydU47ltP4tI4YBWJ30g=="
      }
    },
    allIds: [
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-S8Vfl1A7sOnLRHG51JrBlU9pSys=",
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-BrMRGJOGcYME9RFlUghBJi7RBNM="
    ]
  }
});

export const credentialsAfterNewCred = fromJS({
  byId: {
    "newDevice-f6ca6710e78043568ddf86b70bb4f010": {
      "device-id": "newDevice",
      enabled: true,
      "auth-id": "newDevice-f6ca6710e78043568ddf86b70bb4f010",
      type: "hashed-password",
      secrets: []
    }
  },
  allIds: ["newDevice-f6ca6710e78043568ddf86b70bb4f010"],
  secrets: {
    byId: {},
    allIds: []
  }
});
