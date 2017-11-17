import { AppStartAction } from "../actions/app";
import initialState, { AppState } from "./initialState";

const appReducer = (
  state = initialState.app,
  action: AppStartAction
): AppState => {
  switch (action.type) {
    case "APP_START_KICKED":
      return {
        ...state,
        status: "Starting",
        lastUpdatedOn: new Date()
      };

    case "APP_STARTED":
      return {
        ...state,
        status: "Started",
        lastUpdatedOn: new Date()
      };

    case "APP_START_FAILED":
      return {
        ...state,
        status: "FailedToStart",
        lastUpdatedOn: new Date(),
        errorReason: action.reason
      };
  }
  return state;
};

export default appReducer;
