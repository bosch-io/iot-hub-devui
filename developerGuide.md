# IoT Hub Developer UI Developer Guidelines

## Concepts

Currently, the IoT Hub Developer UI consists of two parts: The [React.js](https://reactjs.org/) Frontend and the Java [Spring](https://spring.io/)/[Vert.X](https://vertx.io/) Backend. In a future release we plan to abandon the Java backend and migrate to a Node.js based version. This will enable our migration to the [Electron Framework](https://electronjs.org/)

<h3 id='server'>
    <img src='./resources/serverIcon.svg' width='30'
    alt='Server Icon' align='absmiddle' />
    Java Spring/ Vert.X Backend
</h3>

The purpose of the server based part of the application is to serve the web frontend and to provide a connection to the IoT Hub APIs and a real time connection to the Messaging Network (AMQP 1.0). By default, it is run locally under port 8080.

##### Serving the Frontend

First and foremost, the server is providing a static endpoint under `/hubdev/ui` from which the bundled React.js frontend is served.

##### Messaging Connection (AMQP 1.0/ Websocket)

The connection to the IoT Hub messaging network is implemented using the [Official client from Eclipse Hono Project](https://www.eclipse.org/hono/):

This client creates both a telemetry and an event consumer and forwards all received messages using a [Vert.X/ Sock.js](https://vertx.io/docs/vertx-web/java/#_sockjs_event_bus_bridge) Websocket Connection on `/eventbus`.

The provided channels are `device` (e.g. `device.exampleDevice`) for telemetry/ event messages and `status` (e.g. `status.hubConnection`) for status information.

##### Device Registry Connection and IoT Hub Authenticaton (HTTP)

To follow Same-origin policy, all HTTP requests to the [IoT Hub Device Registry](https://apidocs.bosch-iot-suite.com/index.html?urls.primaryName=Bosch%20IoT%20Hub%20-%20Device%20Registry) are proxied by the backend, under `/hubdev/api` (e.g. `/hubdev/api/credentials/myTenantId?device-id=pi0`). This is also necessary because the API credentials to authorize as IoT Hub user are currently only available via application properties in the backend.

This HTTP endpoint is also used to provide the tenant-id to the frontend on `/hubdev/api/tenant`.

<h3 id='server'>
    <img src="./resources/ReactIcon.svg" width='30'
    alt='React Icon' align='absmiddle' />
    React.js Frontend
</h3>

The UI is written in [React.js](https://reactjs.org/) with a [Redux](https://redux.js.org/) State Container that uses [Immutable.js](http://facebook.github.io/immutable-js/).

##### State management concepts

We distinguish between three types of state: UI State, Application State and Form State.

- **UI State** is everything that affects just the View Layer e.g. animation state, display state of things like dropdown menus etc. This does **not** include display state of forms (like touched, focus etc.).
  UI State is either stored as component state directly inside the React component or using the React Context API.
- **Application State** is state that is relevant to the whole application e.g. device state or messages. This type of state is completely stored in Redux. This state is also partially cached in the localStorage of the browser.
- **Form State** is the state of the \<form>s in the application and managed through [Redux Form](https://redux-form.com)

##### Redux and Immutable.js

As mentioned above, [Redux](https://redux.js.org/) is used as the main state container/ state management.

- Side Effects are handled using [redux-thunk](https://github.com/reduxjs/redux-thunk) and [axios](https://github.com/axios/axios).
- The state shape is normalized to simplify the reducer logic, as described in the [official recipe for state normalization](https://redux.js.org/recipes/structuringreducers/normalizingstateshape).
  - The mapping between the nested API format of the IoT Hub APIs and the normalized Redux state is done using [Normalizr](https://github.com/paularmstrong/normalizr) which introduces normalize/denormalize functions that are based on schema definitions.
- The state itself is one big [Immutable.js](http://facebook.github.io/immutable-js/) Map data structure. These data structures guarantee that state is never mutated (_which is an anti pattern in Redux_) but also increase performance.

##### Styling

The styleguide can be classified as mixture between the Bosch Styleguide and Google's [Material Design](https://material.io/).

- Styles are written in [Sass](http://sass-lang.com/guide) for components that are not frequently reused (like actual menus) and with [styled-compnents](https://www.styled-components.com/) for common/ reused components.
- All layouts are based on Flexbox and sizing is done using rems ([The 62.5% Trick](https://snook.ca/archives/html_and_css/font-size-with-rem)) to guarantee **responsiveness**.
- Animations and transitions are mostly implemented using plain CSS transitions/animations except for places where unmounting transitions or Spring based animations are required. In these cases [React Motion](https://github.com/chenglou/react-motion) is used.
- Styles should be written in `.scss` and without vendor prefixes as webpack adds all vendor prefixes at compile time using [autoprefixer](https://github.com/postcss/autoprefixer)

<h3 id='server'>
    <img src="./resources/testingIcon.svg" width='30'
    alt='Testing Icon' align='absmiddle' />
    Testing
</h3>

The frontend is tested with the [Jest](https://jestjs.io/) Testing Framework, which provides a test runner, assertions, mocks, snapshot testing and much more.
[Enzyme](https://airbnb.io/enzyme/) is used for component testing.

## Setup

The IoT Hub Developer UI is optimized and bundled using [Webpack](https://webpack.js.org/) and transpiled to ES5 using [Babel](https://babeljs.io/).

Peculiarities of the bundler configuration imply the following:

- SVGs can be imported just like regular JS-Components ([react-svg-loader](https://github.com/boopathi/react-svg-loader/tree/master/packages/react-svg-loader) is used for inline-svg Components)

  ```js
  import Foo from "images/foo.svg"; // Inline svg import

  export default () => <Foo />;
  ```

- absolute paths with `src` as implicit root should be used (_see above_)
- The linting rules (`.eslint`) on level "error" have to be followed or the compilation will fail.
- Styles should be written in `.scss` and without vendor prefixes as webpack adds all vendor prefixes at compile time using [autoprefixer](https://github.com/postcss/autoprefixer) (_see above_)

### Development Environment

In order to run the Java backend as well as building the frontend, you will need the following software installed on your local machine:

- Node.js (>=v.8.9.4)
- Google Chrome
- Java (>=v8)
- A text editor/ IDE

For UI development it is strongly recommended to also install the [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) and the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=de) for Chrome.

Since the app will be migrated to Electron (which runs on v8), other browsers are no longer actively maintained.

### Development Scripts

`yarn dev`

> Starts the Webpack Dev Server on port 9000 with hot reloading functionalities.

`yarn test`

> Check if all Unit Tests pass - Uses Jest

`yarn watch`

> Runs the tests in watch-mode

`yarn storybook`

> starts an interactive component documentation server on port 9001

`yarn prod`

> builds the frontend and saves it under `target/classes/public`

### Storybook

[React Storybook](https://github.com/storybooks/storybook/tree/next/app/react) is used as interactive component documentation. It can also be used to develop a new component in isolation. Components that are reusable (located under `src/components/common`) should always be documented here.
