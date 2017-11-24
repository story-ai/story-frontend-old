import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancerStoreCreator
} from "redux";
import { reducer, StateType } from "../reducers";
import { epic } from "../epics";
import { ping } from "../epics/ping";
import { createEpicMiddleware } from "redux-observable";

const epicMiddleware = createEpicMiddleware(epic);

const middlewares: (
  next: StoreEnhancerStoreCreator<StateType>
) => StoreEnhancerStoreCreator<StateType> = applyMiddleware(epicMiddleware);

const configureStore = (initialState: StateType) =>
  createStore<StateType>(reducer, initialState, compose(middlewares));

export default configureStore;
