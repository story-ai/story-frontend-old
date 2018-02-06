import { StateSubject } from "redux-observable";
import { AjaxResponse } from "rxjs";

import { StateType } from "./reducers";

export function AjaxResponseToJson<T>(res: AjaxResponse): T {
  if (res.status !== 200) throw new Error(res.responseText);

  try {
    return JSON.parse(res.response) as T;
  } catch (e) {
    throw new Error("Unexpected result shape");
  }
}

export function centuryAuthHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`
  };
}

export const getTokenStream = (state$: StateSubject<StateType>) =>
  state$
    .map(s => s.auth.token)
    .distinctUntilChanged()
    .filter<string | undefined, string>(
      (token): token is string => token !== undefined
    )
    .do(t => console.log("Got a new token!"));
