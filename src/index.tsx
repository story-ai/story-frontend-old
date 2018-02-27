import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Root from "./components/Root";
import { initial } from "./core/reducers";
import configureStore from "./core/store/configureStore";

const store = configureStore(initial);

const rootEl = document.getElementById("root");
ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  rootEl
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./components/Root", () => {
    const newConfigureStore = require("./core/store/configureStore");
    const newStore = newConfigureStore.configureStore();
    const NextRootContainer = require<{
      default: typeof Root;
    }>("./components/Root").default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <NextRootContainer />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}
