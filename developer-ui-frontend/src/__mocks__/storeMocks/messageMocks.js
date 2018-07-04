/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import { calculateLogId } from "utils";

export const exampleLongMessage = {
  timestamp: new Date("2018-01-31T16:00:21.755Z").getTime(),
  body: JSON.stringify({
    type: "event",
    deviceId: "HubTester",
    contentType: "application/json",
    content: `{
"total": 25,
"limit": 10,
"skip": 0,
  "data": [
    {
      "_id": "5968fcad629fa84ab65a5247",
      "first_name": "Sabrina",
      "last_name": "Mayert",
      "address": "69756 Wendy Junction",
      "phone": "1-406-866-3476 x478",
      "email": "donny54@yahoo.com",
      "updatedAt": "2017-07-14T17:17:33.010Z",
      "createdAt": "2017-07-14T17:17:33.010Z",
      "__v": 0
    },
    {
      "_id": "5968fcad629fa84ab65a5246",
      "first_name": "Taryn",
      "last_name": "Dietrich",
      "address": "42080 Federico Greens",
      "phone": "(197) 679-7020 x98462",
      "email": "betty_schaefer1@gmail.com",
      "updatedAt": "2017-07-14T17:17:33.006Z",
      "createdAt": "2017-07-14T17:17:33.006Z",
      "__v": 0
    }
  ]
}`,
    applicationProperties: {
      device_id: "HubTester"
    }
  })
};

export const exampleLongMessageInStore = {
  id: calculateLogId(exampleLongMessage),
  time: exampleLongMessage.timestamp,
  message: JSON.parse(exampleLongMessage.body)
};

export const exampleShortMessage = {
  timestamp: new Date("2018-01-31T16:00:21.755Z").getTime(),
  body: JSON.stringify({
    type: "event",
    deviceId: "4746",
    contentType: "application/json",
    content: `{"temp": 9 }`,
    applicationProperties: {
      device_id: "4746"
    }
  })
};

export const exampleShortMessageInStore = {
  id: calculateLogId(exampleShortMessage),
  time: exampleShortMessage.timestamp,
  message: JSON.parse(exampleShortMessage.body)
};
