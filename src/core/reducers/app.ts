import {
  AppStartedAction,
  APP_START_FAILED,
  APP_START_KICKED,
  APP_STARTED,
  AppStartFailedAction,
  AppStartKickedAction
} from "../actions/app";

export interface StateType {
  readonly status: "Initial" | "Starting" | "Started" | "FailedToStart";
  readonly lastUpdatedOn: Date;
  readonly errorReason?: string;
}

export const initial: StateType = {
  status: "Initial",
  lastUpdatedOn: new Date()
};

export const reducer = (
  state = initial,
  action: AppStartedAction | AppStartFailedAction | AppStartKickedAction
): StateType => {
  switch (action.type) {
    case APP_START_KICKED:
      return {
        ...state,
        status: "Starting",
        lastUpdatedOn: new Date()
      };

    case APP_STARTED:
      return {
        ...state,
        status: "Started",
        lastUpdatedOn: new Date()
      };

    case APP_START_FAILED:
      return {
        ...state,
        status: "FailedToStart",
        lastUpdatedOn: new Date(),
        errorReason: action.reason
      };
  }
  return state;
};
