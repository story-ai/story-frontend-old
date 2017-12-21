import { requestAddToClass } from "../../core/actions/classes";
import { StateType } from "../../core/reducers";
import * as React from "react";
import { StoryTypes } from "story-backend-utils";
import { connect } from "react-redux";
import { TeacherHeading } from "./TeacherHeading";
import { CourseHeading } from "./CourseHeading";
import {
  Loadable,
  LoadableMap,
  getLoadableFromMap
} from "../../core/reducers/types/Loadable";

export const ClassListingComponent: React.StatelessComponent<
  Loadable<StoryTypes.Class> & {
    owned: boolean;
    reload: () => any;
    teachers: LoadableMap<StoryTypes.Teacher>;
    courses: LoadableMap<StoryTypes.Course>;
    requestAddToClass: any;
  }
> = props => {
  if (props.state === "LOADED") {
    const details = props.item;
    const teachers = details.teachers.map(tid =>
      getLoadableFromMap(props.teachers, tid)
    );
    const courses = details.courses.map(cid =>
      getLoadableFromMap(props.courses, cid)
    );

    return (
      <div
        style={{
          boxShadow: "2px 2px 5px 3px rgba(0,0,0,0.5)",
          margin: 10,
          padding: 10
        }}
      >
        <h2>
          {details.name} ({props.owned ? (
            "Owned"
          ) : (
            <span>
              {details.price.toLocaleString("en-GB", {
                style: "currency",
                currency: "GBP"
              })}
              {" - "}
              <a
                href="#"
                onClick={() => props.requestAddToClass(props.item._id)}
              >
                Buy Now
              </a>
            </span>
          )})
        </h2>
        <div>
          <h3>Teachers:</h3>
          <ul>
            {teachers.map(
              t =>
                t.state === "LOADED" ? (
                  <TeacherHeading key={t.item._id} item={t.item} />
                ) : null
            )}
          </ul>
        </div>
        <div>
          <h3>Courses Covered:</h3>
          <ul>
            {courses.map(
              t =>
                t.state === "LOADED" ? (
                  <CourseHeading key={t.item._id} item={t.item} />
                ) : null
            )}
          </ul>
        </div>
      </div>
    );
  }

  if (props.state === "FAILED") {
    return <div>{props.error}</div>;
  }

  return <div>Loading...</div>;
};

export const ClassListing = connect(
  (
    state: StateType,
    props: { id: string; reload: () => void; owned: boolean }
  ) => ({
    teachers: state.teachers,
    courses: state.courses,
    ...props,
    ...getLoadableFromMap(state.classes, props.id)
  }),
  { requestAddToClass }
)(ClassListingComponent);
