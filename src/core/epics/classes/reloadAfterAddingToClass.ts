import {
  ADD_TO_CLASS_REQUEST_SUCCEEDED,
  AddToClassSucceededAction
} from "../../actions/classes";
import { ActionsObservable } from "redux-observable";
import { Action, Store } from "redux";
import { StateType } from "../../reducers";
import { requestStudyGroupList } from "../../actions/study_groups";
import { requestUser } from "../../actions/user";

export const reloadAfterAddingToClass = (
  action$: ActionsObservable<Action>,
  store: Store<StateType>
) =>
  action$
    .ofType(ADD_TO_CLASS_REQUEST_SUCCEEDED)
    .flatMap((action: AddToClassSucceededAction) => {
      return [requestStudyGroupList(), requestUser()];
    });
