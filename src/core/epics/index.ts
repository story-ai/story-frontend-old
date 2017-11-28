import { requestAllClasses } from "./classes";
import { requestTeachers } from "./teachers";
import { combineEpics } from "redux-observable";

export const epic = combineEpics(requestAllClasses, requestTeachers);
