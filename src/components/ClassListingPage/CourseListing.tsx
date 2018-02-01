import "./index.scss";

import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { CenturyTypes, StoryTypes } from "story-backend-utils";

import { STRIPE_KEY } from "../../config";
import { StrandHeading } from "./StrandHeading";

export const CourseListing: React.StatelessComponent<{
  buy: (courseId: string, token: string) => void;
  email: string;
  reload: () => any;
  course: StoryTypes.StoryCourseFields & CenturyTypes.Course;
  studyGroupId: string | undefined;
}> = props => {
  const owned = props.studyGroupId !== undefined;
  const listing = (
    <div className={`course-listing ${owned && "bought"}`}>
      <div className="picture">
        <i />
        {/* TODO: Add a course picture from somewhere */}
      </div>

      <div className="content ">
        <h2>
          {props.course.name}
          {!owned &&
            " (" +
              props.course.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              }) +
              ") "}
        </h2>

        <div className="detail">
          <div className="courses">
            <h3>Courses Covered</h3>

            <ul>
              {props.course.strands.map(strand => (
                <StrandHeading bought={owned} key={strand.id} item={strand} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  if (owned) {
    return (
      <div className="listing-container">
        <a
          href={`https://app.century.tech/learn/study-groups/${
            props.studyGroupId
          }`}
        >
          {listing}
        </a>
      </div>
    );
  } else {
    return (
      <div className="listing-container">
        <StripeCheckout
          token={t => props.buy(props.course._id, t.id)}
          name={"Story"}
          description={props.course.name}
          amount={props.course.price * 100}
          currency="USD"
          zipCode={true}
          email={props.email}
          bitcoin={true}
          stripeKey={STRIPE_KEY}
        >
          {listing}
        </StripeCheckout>
      </div>
    );
  }
};
