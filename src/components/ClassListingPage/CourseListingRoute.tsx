import "./index.scss";

import * as React from "react";
import { Link, Route } from "react-router-dom";
import VisibilitySensor = require("react-visibility-sensor");

import { CourseListing, CourseListingProps } from "./CourseListing";
import { Omit } from "react-redux";

export const CourseListingRoute: React.StatelessComponent<
  Omit<CourseListingProps, "price" | "owned" | "active">
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
              <Link to={`/course/${props.course._id}`}>{courseContent}</Link>
            )}
          </div>
        );
      }}
    </Route>
  );
};
