import { Epic } from "redux-observable";

import { AllActions } from "../../actions";
import { ClassRequestSucceeded } from "../../actions/classes";
import { TeachersRequested } from "../../actions/teachers";
import { StateType } from "../../reducers";

export const updateTeachersOnClassReceived: Epic<AllActions, StateType> = (
  action$,
  state$
) =>
  action$
    .ofType<ClassRequestSucceeded>(ClassRequestSucceeded.type)
    .withLatestFrom(state$.map(s => s.teachers))
    .map(([action, knownTeachers]) => {
      // add all teachers we are becoming aware of
      let teacherIds: string[] = [];
      for (const classId in action.items) {
        teacherIds = teacherIds.concat(action.items[classId].teachers);
      }

      // filter out teachers we already knew (or have asked about)
      teacherIds = teacherIds.filter(
        t => !(t in knownTeachers.LOADED || t in knownTeachers.PENDING)
      );

      // fetch any that are still unknown
      return new TeachersRequested(teacherIds);
    });
