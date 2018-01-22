import {
  failClassRequest,
  succeedClassRequest,
  ALL_CLASSES_REQUESTED,
  AllClassesRequestAction,
  CLASSES_REQUEST_SUCCEEDED,
  ClassRequestAction,
  ClassRequestSucceededAction,
  REQUEST_ADD_TO_CLASS,
  AddToClassRequestAction,
  succeedAddToClassRequest,
  failAddToClassRequest,
  ADD_TO_CLASS_REQUEST_SUCCEEDED,
  AddToClassSucceededAction
} from "../actions/classes";
import {
  requestTeacher,
  succeedTeacherRequest,
  failTeacherRequest
} from "../actions/teachers";
import {
  failCourseRequest,
  requestCourse,
  succeedCourseRequest
} from "../actions/courses";
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

export const requestAllClasses = (action$: ActionsObservable<Action>) =>
  action$
    .ofType(ALL_CLASSES_REQUESTED)
    .flatMap((action: AllClassesRequestAction) => {
      type Result = {
        classes: {
          [k: string]: StoryTypes.Class;
        };
      };
      return Observable.from(axios.get<Result>(StoryServices.material));
    })
    .map(res => {
      if (res.status !== 200) throw res.data;
      if (typeof res.data.classes !== "object") {
        throw "Unexpected result shape " + JSON.stringify(res.data);
      }
      return succeedClassRequest(res.data.classes);
    })
    .catch(e => Observable.of(failClassRequest(null, e)));

export const addToClass = (
  action$: ActionsObservable<Action>,
  store: Store<StateType>
) =>
  action$
    .ofType(REQUEST_ADD_TO_CLASS)
    .flatMap((action: AddToClassRequestAction) => {
      console.log("Adding to course again");
      const user = store.getState().user;
      if (user.state !== "LOADED")
        return Observable.of(
          failAddToClassRequest(action.classId, "User not loaded")
        );

      return axios
        .put(
          `${StoryServices.material}/user/${user.item._id}/class`,
          { classId: action.classId, stripeToken: action.token },
          {
            headers: {
              Authorization: `Bearer ${store.getState().auth.token}`
            }
          }
        )
        .then(
          res =>
            res.status === 200
              ? succeedAddToClassRequest(action.classId)
              : failAddToClassRequest(
                  action.classId,
                  res.data.message || res.statusText
                )
        )
        .catch(e => {
          const message =
            (e.response && e.response.data && e.response.data.message) ||
            e.message;
          console.log(e);
          return failAddToClassRequest(action.classId, message);
        });
    });

export const reloadAfterAddingToClass = (
  action$: ActionsObservable<Action>,
  store: Store<StateType>
) =>
  action$
    .ofType(ADD_TO_CLASS_REQUEST_SUCCEEDED)
    .flatMap((action: AddToClassSucceededAction) => {
      return [requestStudyGroupList(), requestUser()];
    });
