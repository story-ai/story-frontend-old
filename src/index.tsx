import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";

import Root from "./components/Root";
import { initial } from "./core/reducers";
import configureStore from "./core/store/configureStore";
import { loadState, saveState } from "./core/store/localStore";

const store = configureStore(loadState() || initial);
store.subscribe(() => {
  saveState(store.getState());
});

const rootEl = document.getElementById("root");
ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Root />
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
          <NextRootContainer />
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}
