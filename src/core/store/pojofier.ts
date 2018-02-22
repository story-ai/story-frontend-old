import { Dispatch } from "react-redux";
import { Middleware, MiddlewareAPI } from "redux";

import { MyAction } from "../actions";

export const POJOfier: Middleware = <StateType>({
  getState
}: MiddlewareAPI<StateType>) => (next: Dispatch<StateType>) => action => {
  if (action instanceof MyAction) {
    const plain = JSON.parse(JSON.stringify(action));
    return next(plain);
  }
  return next(action);
};
