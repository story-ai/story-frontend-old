import "./index.scss";

import * as React from "react";
import { Omit, connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import VisibilitySensor = require("react-visibility-sensor");

import { CourseListing, CourseListingProps } from "./CourseListing";
import { ExpandCourse } from "../../core/actions/app";
import { StateType } from "../../core/reducers";

type CourseListingRouteProps = Omit<
  CourseListingProps,
  "price" | "owned" | "active"
> & {
  // expand: () => ExpandCourse;
};

export const CourseListingRoute: React.StatelessComponent<
  CourseListingRouteProps
> = props => {
  const owned = props.studyGroupId !== undefined;
  const price =
    props.course.price - (props.discount ? props.discount.value : 0);

  return (
    <Route path={`/course/${props.course._id}`}>
      {({ match, location }) => {
        const active = !!match;
        const courseContent = (
          <CourseListing
            {...props}
            active={active}
            price={price}
            owned={owned}
          />
        );
        return (
          <div className="listing-container">
            <VisibilitySensor
              onChange={props.visibilityChanged}
              offset={{ top: 100 }}
            />
            {active ? (
              <div>{courseContent}</div>
            ) : (
              <Link
                to={`/course/${props.course._id}`}
                // onClick={props.expand}
              >
                {courseContent}
              </Link>
            )}
          </div>
        );
      }}
    </Route>
  );
};

// export const CourseListingRoute = connect(
//   (state: StateType, ownProps: CourseListingProps) => ({ ...ownProps }),
//   {
//     expand: () => new ExpandCourse(5)
//   },
//   CourseListingRouteComponent
// );
