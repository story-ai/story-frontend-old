import { requestAddToClass } from "../../core/actions/classes";
import { StoryTypes, CenturyTypes } from "story-backend-utils";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { STRIPE_KEY } from "../../config";
import { StateType } from "../../core/reducers";
import * as React from "react";
import { TeacherHeading } from "./TeacherHeading";
import { CourseHeading } from "./CourseHeading";
import { BuyClassButton } from "./BuyClassButton";
import {
  Loadable,
  LoadableMap,
  getLoadableFromMap
} from "../../core/reducers/types/Loadable";

import "./index.scss";

export const ClassListingComponent: React.StatelessComponent<
  Loadable<StoryTypes.Class> & {
    requestAddToClass: typeof requestAddToClass;
    owned: boolean;
    user: Loadable<CenturyTypes.User>;
    reload: () => any;
    teachers: LoadableMap<StoryTypes.Teacher>;
    courses: LoadableMap<StoryTypes.Course>;
  }
> = props => {
  if (props.state === "LOADED" && props.user.state === "LOADED") {
    const details = props.item;
    const teachers = details.teachers.map(tid =>
      getLoadableFromMap(props.teachers, tid)
    );
    const courses = details.courses.map(cid =>
      getLoadableFromMap(props.courses, cid)
    );

    const listing = (
      <div className={`class-listing ${props.owned && "bought"}`}>
        <div className="picture">
          <i />
        </div>

        <div className="content">
          <h2>
            {details.name}
            {!props.owned &&
              " (" +
                props.item.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD"
                }) +
                ") "}
          </h2>

          {/* <div>
            Teachers:&nbsp;
            {teachers
              .map(
                t =>
                  t.state === "LOADED" &&
                  t.item.personal.name.first + " " + t.item.personal.name.last
              )
              .join(", ")}
          </div>

          <div>
            Courses Covered:&nbsp;
            {courses.map(t => t.state === "LOADED" && t.item.name).join(", ")}
          </div> */}
        </div>
        {/* <div>
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
        </div> */}
      </div>
    );

    if (props.owned) {
      return listing;
    } else {
      return (
        <StripeCheckout
          token={t => props.requestAddToClass(t.id, props.item._id)}
          name={"Story"}
          description={props.item.name}
          amount={props.item.price * 100}
          currency="USD"
          zipCode={true}
          email={props.user.item.contact.emails[0].address}
          bitcoin={true}
          stripeKey={STRIPE_KEY}
        >
          {listing}
        </StripeCheckout>
      );
    }
  }

  if (props.state === "FAILED") {
    return <div>{props.error}</div>;
  }
  if (props.user.state === "FAILED") {
    return <div>{props.user.error}</div>;
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
    user: state.user,
    ...props,
    ...getLoadableFromMap(state.classes, props.id)
  }),
  { requestAddToClass }
)(ClassListingComponent);
