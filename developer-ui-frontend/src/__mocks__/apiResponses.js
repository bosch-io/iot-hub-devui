/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
export const exampleGetAuthIds = {
  total: 2,
  credentials: [
    {
      "device-id": "newDevice",
      type: "hashed-password",
      "auth-id": "newDevice-97fff113f84b4d91a208889d13236fa8",
      enabled: true,
      secrets: [
        {
          "hash-function": "sha-512",
          "pwd-hash":
            "b821b1b6e19c9223f00c67d1a140efa26c41d70de72b88b514712a269437446235fbe5170d80da071b6b7f738e070462ac4fc0786f1b47738ff064761c03befb"
        }
      ]
    },
    {
      "device-id": "newDevice",
      type: "hashed-password",
      "auth-id": "newDevice-f6ca6710e78043568ddf86b70bb4f010",
      enabled: true,
      secrets: [
        {
          "pwd-hash":
            "QOnuX1H2FykBfS94voqoKfreuLXSZqXkzjYbxpx4N+TDACDLBMlGcms6I6NviFn1IOnOAOEzf0Wh+vslEnXbdw==",
          "hash-function": "sha-512"
        },
        {
          "hash-function": "sha-512",
          "pwd-hash":
            "YpD78SGHQaYypz2GkPp+qghndcfmVQx/Sk8a4EpNMkUwqEHSHiIL0k8cs57DJOyYxg6ydU47ltP4tI4YBWJ30g=="
        }
      ]
    }
  ]
};
