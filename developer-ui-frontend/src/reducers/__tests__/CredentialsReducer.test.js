/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import credentialsReducer, { initialState } from "../CredentialsReducer";
import {
  exampleCredentialsFetchedAction,
  exampleCredentialsFetchedAction2,
  exampleCredentialsFetchedAction3,
  exampleNewCredentialAction
} from "__mocks__/actionMocks";
import {
  credentialsAfterFirstGet,
  credentialsAfterDeletedCred,
  credentialsAfterNewCred
} from "__mocks__/storeMocks/credentialMocks";

describe("CredentialsReducer", () => {
  it("should have initial state on empty call", () => {
    expect(credentialsReducer()).toEqual(initialState);
  });

  it("should not change state on unknown action types", () => {
    expect(credentialsReducer(undefined, { type: "NOT_EXISTING" })).toEqual(
      initialState
    );
  });

  test('> CREDENTIALS_FETCHED with "empty store" (no credentials yet) saves every credential', () => {
    expect(
      credentialsReducer(initialState, exampleCredentialsFetchedAction)
    ).toEqual(credentialsAfterFirstGet);
  });

  test("> CREDENTIALS_FETCHED with nothing new doesn't change state", () => {
    expect(
      credentialsReducer(
        credentialsAfterFirstGet,
        exampleCredentialsFetchedAction2
      )
    ).toEqual(credentialsAfterFirstGet);
  });

  test("> CREDENTIALS_FETCHED with less credentials than saved deletes missing credentials", () => {
    expect(
      credentialsReducer(
        credentialsAfterFirstGet,
        exampleCredentialsFetchedAction3
      )
    ).toEqual(credentialsAfterDeletedCred);
  });

  test("> NEW_CREDENTIAL should add the new auth-id to credentials->allIds", () => {
    expect(
      credentialsReducer(initialState, exampleNewCredentialAction).get("allIds")
    ).toEqual(credentialsAfterNewCred.get("allIds"));
  });

  test("> NEW_CREDENTIAL should add the credential to credentials->byId", () => {
    expect(
      credentialsReducer(initialState, exampleNewCredentialAction).get("byId")
    ).toEqual(credentialsAfterNewCred.get("byId"));
  });
});
