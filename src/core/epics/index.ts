import { ping } from "./ping";
import { requestAllClasses } from "./classes";
import { combineEpics } from "redux-observable";

export const epic = combineEpics(ping, requestAllClasses);
