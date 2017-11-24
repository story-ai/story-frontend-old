import { PING, PONG, PingAction, PongAction } from "../actions/ping";

export type StateType = {
  isPinging: boolean;
};

export const initial: StateType = { isPinging: false };

export const reducer = (
  state: StateType = initial,
  action: PingAction | PongAction
): StateType => {
  switch (action.type) {
    case PING:
      return { isPinging: true };

    case PONG:
      return { isPinging: false };

    default:
      return state;
  }
};
