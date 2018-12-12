/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { fromJS } from "immutable";

export const credentialsAfterFirstGet = fromJS({
  byId: {
    "newDevice-97fff113f84b4d91a208889d13236fa8": {
      type: "hashed-password",
      "auth-id": "newDevice-97fff113f84b4d91a208889d13236fa8",
      enabled: true,
      secrets: [
        "newDevice-97fff113f84b4d91a208889d13236fa8-vDUuwVzGTvVNZzVok28gimAZmQg="
      ]
    },
    "newDevice-f6ca6710e78043568ddf86b70bb4f010": {
      type: "hashed-password",
      "auth-id": "newDevice-f6ca6710e78043568ddf86b70bb4f010",
      enabled: true,
      secrets: [
        "newDevice-f6ca6710e78043568ddf86b70bb4f010-YRJcUBaw5IRyRP02Y5K3XF9aX1w=",
        "newDevice-f6ca6710e78043568ddf86b70bb4f010-A1CZP43xxSViySDKW+u5q/z3KdQ="
      ]
    }
  },
  allIds: [
    "newDevice-97fff113f84b4d91a208889d13236fa8",
    "newDevice-f6ca6710e78043568ddf86b70bb4f010"
  ],
  secrets: {
    byId: {
      "newDevice-97fff113f84b4d91a208889d13236fa8-vDUuwVzGTvVNZzVok28gimAZmQg=": {
        "hash-function": "sha-512",
        "pwd-hash":
          "b821b1b6e19c9223f00c67d1a140efa26c41d70de72b88b514712a269437446235fbe5170d80da071b6b7f738e070462ac4fc0786f1b47738ff064761c03befb",
        secretId:
          "newDevice-97fff113f84b4d91a208889d13236fa8-vDUuwVzGTvVNZzVok28gimAZmQg="
      },
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-YRJcUBaw5IRyRP02Y5K3XF9aX1w=": {
        "pwd-hash":
          "QOnuX1H2FykBfS94voqoKfreuLXSZqXkzjYbxpx4N+TDACDLBMlGcms6I6NviFn1IOnOAOEzf0Wh+vslEnXbdw==",
        "hash-function": "sha-512",
        secretId:
          "newDevice-f6ca6710e78043568ddf86b70bb4f010-YRJcUBaw5IRyRP02Y5K3XF9aX1w="
      },
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-A1CZP43xxSViySDKW+u5q/z3KdQ=": {
        "hash-function": "sha-512",
        "pwd-hash":
          "YpD78SGHQaYypz2GkPp+qghndcfmVQx/Sk8a4EpNMkUwqEHSHiIL0k8cs57DJOyYxg6ydU47ltP4tI4YBWJ30g==",
        secretId:
          "newDevice-f6ca6710e78043568ddf86b70bb4f010-A1CZP43xxSViySDKW+u5q/z3KdQ="
      }
    },
    allIds: [
      "newDevice-97fff113f84b4d91a208889d13236fa8-vDUuwVzGTvVNZzVok28gimAZmQg=",
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-YRJcUBaw5IRyRP02Y5K3XF9aX1w=",
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-A1CZP43xxSViySDKW+u5q/z3KdQ="
    ]
  }
});

export const credentialsAfterDeletedCred = fromJS({
  byId: {
    "newDevice-f6ca6710e78043568ddf86b70bb4f010": {
      type: "hashed-password",
      "auth-id": "newDevice-f6ca6710e78043568ddf86b70bb4f010",
      enabled: true,
      secrets: [
        "newDevice-f6ca6710e78043568ddf86b70bb4f010-YRJcUBaw5IRyRP02Y5K3XF9aX1w=",
        "newDevice-f6ca6710e78043568ddf86b70bb4f010-A1CZP43xxSViySDKW+u5q/z3KdQ="
      ]
    }
  },
  allIds: ["newDevice-f6ca6710e78043568ddf86b70bb4f010"],
  secrets: {
    byId: {
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-YRJcUBaw5IRyRP02Y5K3XF9aX1w=": {
        "pwd-hash":
          "QOnuX1H2FykBfS94voqoKfreuLXSZqXkzjYbxpx4N+TDACDLBMlGcms6I6NviFn1IOnOAOEzf0Wh+vslEnXbdw==",
        "hash-function": "sha-512",
        secretId:
          "newDevice-f6ca6710e78043568ddf86b70bb4f010-YRJcUBaw5IRyRP02Y5K3XF9aX1w="
      },
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-A1CZP43xxSViySDKW+u5q/z3KdQ=": {
        "hash-function": "sha-512",
        "pwd-hash":
          "YpD78SGHQaYypz2GkPp+qghndcfmVQx/Sk8a4EpNMkUwqEHSHiIL0k8cs57DJOyYxg6ydU47ltP4tI4YBWJ30g==",
        secretId:
          "newDevice-f6ca6710e78043568ddf86b70bb4f010-A1CZP43xxSViySDKW+u5q/z3KdQ="
      }
    },
    allIds: [
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-YRJcUBaw5IRyRP02Y5K3XF9aX1w=",
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-A1CZP43xxSViySDKW+u5q/z3KdQ="
    ]
  }
});

export const credentialsAfterNewCred = fromJS({
  byId: {
    "newDevice-f6ca6710e78043568ddf86b70bb4f010": {
      enabled: true,
      "auth-id": "newDevice-f6ca6710e78043568ddf86b70bb4f010",
      type: "hashed-password",
      secrets: [
        "newDevice-f6ca6710e78043568ddf86b70bb4f010-owispKt9ltqmX3LG83FxrIrdy/0="
      ]
    }
  },
  allIds: ["newDevice-f6ca6710e78043568ddf86b70bb4f010"],
  secrets: {
    byId: {
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-owispKt9ltqmX3LG83FxrIrdy/0=": {
        "hash-function": "sha-512",
        "pwd-hash":
          "tzmMe0PvXf4mFeY5NTR6g+ICy3beuof/h8TV9Wws3dNRPEt+bWmf2T1pdYIFK+xHB2vBnJ0qoawxREzFwdzMmA==",
        secretId:
          "newDevice-f6ca6710e78043568ddf86b70bb4f010-owispKt9ltqmX3LG83FxrIrdy/0="
      }
    },
    allIds: [
      "newDevice-f6ca6710e78043568ddf86b70bb4f010-owispKt9ltqmX3LG83FxrIrdy/0="
    ]
  }
});
