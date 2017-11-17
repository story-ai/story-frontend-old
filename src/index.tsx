// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { setAppStarted, startApp } from "./core/actions/app";
import initialState from "./core/reducers/initialState";
import configureStore from "./core/store/configureStore";
import Root from "./components/Root";
import { AppContainer } from "react-hot-loader";
const store = configureStore(initialState);

ReactDom.render(<Root store={store} />, document.getElementById("app"));

// store.dispatch(startApp());
// window.setTimeout(() => store.dispatch(setAppStarted()), 2000);

if ((module as any).hot) {
  (module as any).hot.accept("./components/Root", () => {
    const NextRootContainer = require("./components/Root").default;

    ReactDom.render(
      <NextRootContainer store={store} />,
      document.getElementById("app")
    );
  });
}
