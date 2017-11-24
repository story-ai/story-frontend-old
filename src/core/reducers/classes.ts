import {
  CLASSES_REQUEST_FAILED,
  CLASSES_REQUEST_SUCCEEDED,
  CLASSES_REQUESTED,
  ClassRequestAction,
  ClassRequestFailedAction,
  ClassRequestSucceededAction
} from "../actions/materials";

export type StateType = {
  classes: {
    [id: string]: {
      readonly state: "LOADED" | "FAILED" | "PENDING";
      item: null | {
        [k: string]: any;
      };
    };
  };
};

export const initial: StateType = {
  classes: {}
};

export const reducer = (
  state: StateType = initial,
  action:
    | ClassRequestAction
    | ClassRequestFailedAction
    | ClassRequestSucceededAction
): StateType => {
  const stateCopy = Object.assign({}, state);

  switch (action.type) {
    case CLASSES_REQUEST_FAILED:
      console.error(action.error);
      if (action.ids === null) {
        return { classes: {} };
      }
      for (const id of action.ids) {
        state.classes[id] = {
          state: "PENDING",
          item: null
        };
      }
      break;

    case CLASSES_REQUEST_SUCCEEDED:
      for (const item of Object.keys(action.items)) {
        state.classes[item] = {
          state: "LOADED",
          item: action.items[item]
        };
      }
      break;

    case CLASSES_REQUESTED:
      for (const id of action.ids) {
        state.classes[id] = {
          state: "PENDING",
          item: null
        };
      }
      break;
  }
  return state;
};
