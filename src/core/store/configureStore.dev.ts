import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancerStoreCreator
} from "redux";
import { createLogger } from "redux-logger";
import { createEpicMiddleware } from "redux-observable";

import { epic } from "../epics";
import { reducer, StateType } from "../reducers";
import { POJOfier } from "./pojofier";

const logger = createLogger({
  collapsed: (getState, action, logEntry) =>
    logEntry === undefined || !logEntry.error,
  predicate: (getState, action) => action.type.indexOf("@@") < 0
});
const devExtension = (window as any).devToolsExtension;
const epicMiddleware = createEpicMiddleware(epic);

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares: (
  next: StoreEnhancerStoreCreator<StateType>
) => StoreEnhancerStoreCreator<StateType> = applyMiddleware(
  POJOfier,
  epicMiddleware,
  logger
);

const configureStore = (initialState: StateType) => {
  const store = createStore<StateType>(
    reducer,
    initialState,
    composeEnhancers(middlewares)
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
