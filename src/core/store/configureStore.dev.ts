import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancerStoreCreator
} from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { State } from "../reducers/initialState";

const logger = createLogger();
const devExtension = (window as any).devToolsExtension;
const middlewares: (
  next: StoreEnhancerStoreCreator<State>
) => StoreEnhancerStoreCreator<State> = applyMiddleware(thunk, logger);

const configureStore = (initialState: State) => {
  const store = createStore<State>(
    rootReducer,
    initialState,
    compose(middlewares, devExtension ? devExtension() : (f: any) => f)
  );

  if ((<any>module).hot) {
    // Enable Webpack hot module replacement for reducers
    (<any>module).hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};

export default configureStore;
