import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancerStoreCreator,
  Middleware,
  Dispatch,
  MiddlewareAPI
} from "redux";
import { reducer, StateType } from "../reducers";
import { epic } from "../epics";
import { createEpicMiddleware } from "redux-observable";
import { POJOfier } from "./pojofier";

const epicMiddleware = createEpicMiddleware(epic);

const middlewares: (
  next: StoreEnhancerStoreCreator<StateType>
) => StoreEnhancerStoreCreator<StateType> = applyMiddleware(
  POJOfier,
  epicMiddleware
);

const configureStore = (initialState: StateType) =>
  createStore<StateType>(reducer, initialState, compose(middlewares));

export default configureStore;
