import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancerStoreCreator,
  Action
} from "redux";
import { createLogger } from "redux-logger";
import { reducer, StateType } from "../reducers";
import { createEpicMiddleware } from "redux-observable";
import { epic } from "../epics";

const logger = createLogger();
const devExtension = (window as any).devToolsExtension;
const epicMiddleware = createEpicMiddleware(epic);

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const middlewares: (
  next: StoreEnhancerStoreCreator<StateType>
) => StoreEnhancerStoreCreator<StateType> = applyMiddleware(
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
