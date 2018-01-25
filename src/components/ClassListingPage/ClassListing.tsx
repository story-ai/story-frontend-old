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

        <div className="content ">
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

          <div className="detail">
            <div className="courses">
              <h3>Courses Covered</h3>

              <ul>
                {courses.map(
                  t =>
                    t.state === "LOADED" ? (
                      <CourseHeading
                        bought={props.owned}
                        key={t.item._id}
                        item={t.item}
                      />
                    ) : null
                )}
              </ul>
              {/* {courses.map(t => t.state === "LOADED" && <p>{t.item.name}</p>)} */}
            </div>
            <div className="teachers">
              <h3>Teachers</h3>
              <ul>
                {teachers.map(
                  t =>
                    t.state === "LOADED" && (
                      <li>
                        {t.item.personal.name.first} {t.item.personal.name.last}
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );

    if (props.owned) {
      return <div className="listing-container">{listing}</div>;
    } else {
      return (
        <div className="listing-container">
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
        </div>
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
