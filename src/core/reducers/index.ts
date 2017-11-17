import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";
import { State } from "./initialState";

const rootReducer = combineReducers<State>({
  app: appReducer,
  form: formReducer
});

export default rootReducer;
