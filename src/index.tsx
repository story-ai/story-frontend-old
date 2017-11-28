// tslint:disable-next-line:no-unused-variable
import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { initial } from "./core/reducers";
import configureStore from "./core/store/configureStore";
import Root from "./components/Root";
import { AppContainer } from "react-hot-loader";
import { combineReducers } from "redux";

const store = configureStore(initial);

ReactDom.render(<Root store={store} />, document.getElementById("app"));

if ((module as any).hot) {
  (module as any).hot.accept("./components/Root", () => {
    const NextRootContainer = require("./components/Root").default;

    ReactDom.render(
      <NextRootContainer store={store} />,
      document.getElementById("app")
    );
  });
}
