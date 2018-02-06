import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancerStoreCreator
} from "redux";
import { createEpicMiddleware } from "redux-observable";

import { epic } from "../epics";
import { reducer, StateType } from "../reducers";
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
