import { Epic } from "redux-observable";

import { AllActions } from "../../actions";
import { ClassRequestSucceeded } from "../../actions/classes";
import { CoursesRequested } from "../../actions/courses";
import { StateType } from "../../reducers";

export const updateCoursesOnClassReceived: Epic<AllActions, StateType> = (
  action$,
  state$
) =>
  action$
    .ofType<ClassRequestSucceeded>(ClassRequestSucceeded.type)
    .withLatestFrom(state$.map(s => s.courses))
    .map(([action, knownCourses]) => {
      // add all courses we are hearing about now
      let courseIds: string[] = [];
      for (const classId in action.items) {
        // GET study groups for each class
        courseIds = courseIds.concat(action.items[classId].courses);
      }

      // filter out courses we already knew about
      courseIds = courseIds.filter(
        t =>
          !(t in knownCourses.century.LOADED || t in knownCourses.meta.LOADED)
      );

      return new CoursesRequested(courseIds);
    });
