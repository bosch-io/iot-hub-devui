/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { schema, denormalize } from "normalizr";
import { Map, OrderedMap } from "immutable";
import { SHA1, SHA256, SHA512 } from "crypto-js";
import Base64 from "crypto-js/enc-base64";

export const calculateSecretId = (secret, authId) =>
  `${authId}-${Base64.stringify(SHA1(JSON.stringify(secret)))}`;

const getHashFunctionByName = name => {
  switch (name) {
    // case "sha-1":
    //   return plain => Base64.stringify(SHA1(plain));
    case "sha-256":
      return plain => Base64.stringify(SHA256(plain));
    case "sha-512":
      return plain => Base64.stringify(SHA512(plain));
    default:
      return new Error("Unsupported Hash Function Name provided");
  }
};

export const hashSecret = data => {
  let hashedSecret = {};
  const { hashMethod, password, salt, ...other } = data;
  let pw = "";
  const hashFn = getHashFunctionByName(hashMethod);
  if (salt) {
    pw = hashFn(atob(salt) + password);
  } else {
    pw = hashFn(password);
  }
  hashedSecret = {
    "hash-function": hashMethod,
    "pwd-hash": pw,
    ...other
  };
  if (salt) {
    hashedSecret.salt = salt;
  }
  return hashedSecret;
};

export const Secret = new schema.Entity(
  "secrets",
  {},
  {
    idAttribute: (value, parent) => calculateSecretId(value, parent["auth-id"]),
    processStrategy: (value, parent) => ({
      ...value,
      secretId: calculateSecretId(value, parent["auth-id"])
    })
  }
);

export const Credential = new schema.Entity(
  "credentials",
  {
    secrets: [Secret]
  },
  {
    idAttribute: "auth-id",
    processStrategy: value => {
      const { "device-id": deviceId, ...reducedVal } = value; // eslint-disable-line
      return reducedVal;
    }
  }
);

export const Registration = new schema.Entity(
  "devices",
  {},
  {
    idAttribute: "device-id",
    processStrategy: value => {
      const { "device-id": deviceId, ...registrationInfo } = value;
      return {
        deviceId,
        registrationInfo: { ...registrationInfo }
      };
    }
  }
);

/**
 * The denormalize method of normalizr doesn't undo all the steps that were applied
 * with the processingStrategy. This method fixes the missing transformations to
 * get back to the original API format.
 *
 * @param {string} deviceId The Id of the device for which the credential is denormalized
 * @param {string} authId The Id of the credential that is denormalized
 * @param {Map} credentials The normalized, immutable Map of credentials (stored under "byId")
 * @param {Map} secrets The normalized, immutable Map of secrets (stored under "byId")
 */
export const denormalizeCredential = (
  deviceId,
  authId,
  credentials,
  secrets
) => {
  const entities = Map({
    credentials,
    secrets
  });
  let denormalized = denormalize(
    { credentials: [authId] },
    { credentials: [Credential] },
    entities
  ).credentials[0];
  // Delete the secretIds (secretIds are only used inside Redux, the API
  // does not treat secrets as seperate entities!)
  if (denormalized.get("secrets")) {
    denormalized = denormalized.update("secrets", secretDenormalized =>
      secretDenormalized.map(
        s => (s && s.get("secretId") ? s.delete("secretId") : s)
      )
    );
  }

  // Return it as OrderedMap, with the device-id (This way the device-id is always the first key)
  return OrderedMap()
    .set("device-id", deviceId)
    .merge(denormalized);
};
