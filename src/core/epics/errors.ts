import {
  ADD_TO_CLASS_REQUEST_FAILED,
  AddToClassFailedAction
} from "../actions/classes";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs";
import axios from "axios";
import { Action, Store } from "redux";
import { StoryServices } from "../../config";
import { StoryTypes } from "story-backend-utils";
import { StateType } from "../reducers";
import { requestStudyGroupList } from "../actions/study_groups";
import { requestUser } from "../actions/user";

export const alertOnError = (action$: ActionsObservable<Action>) =>
  action$
    .ofType(ADD_TO_CLASS_REQUEST_FAILED)
    .flatMap((action: AddToClassFailedAction) => {
      console.log("Being called");
      alert(action.error);
      return [];
      // return Observable.from(axios.get<Result>(StoryServices.material));
    });
