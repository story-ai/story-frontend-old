import { i18n } from "../../strings/i18n";
import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { CenturyTypes, StoryTypes } from "story-backend-utils";

import { STRIPE_KEY, STRINGS } from "../../config";
import { BuyCourseRequested } from "../../core/actions/courses";
import { PriceLabel } from "./PriceLabel";

export type CourseButtonProps = {
  owned: boolean;
  email: string;
  buy: (
    courseId: string,
    token?: string,
    discount?: StoryTypes.Discount
  ) => BuyCourseRequested;
  course: StoryTypes.StoryCourseFields & CenturyTypes.Course;
  firstVisit: boolean;
  specialCourse: boolean;
  studyGroupId: string | undefined;
  price: number;
  discount?: StoryTypes.Discount;
};

export const CourseButton: React.StatelessComponent<
  CourseButtonProps
> = props => {
  if (props.owned) {
    let link;
    if (props.firstVisit && !props.specialCourse) {
      link = "https://app.century.tech/learn/my-path";
    } else {
      link = `https://app.century.tech/learn/study-groups/${
        props.studyGroupId
      }`;
    }
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button className="action-button">{i18n`Start Course Action Button`}</button>
      </a>
    );
  }
  const priceLabel = (
    <PriceLabel
      price={props.course.price}
      discount={props.discount}
      key="price"
    />
  );

  const button = (
    <button className="action-button">
      {i18n`Buy Course Action Button ${priceLabel}[Course Price]`}
    </button>
  );

  if (props.price <= 0) {
    return (
      <div
        onClick={() =>
          props.buy(
            props.course._id,
            // don't bother sending a Stripe token if it's free
            undefined,
            // don't use up our discount unless the original price was non-zero
            props.course.price > 0 ? props.discount : undefined
          )
        }
      >
        {button}
      </div>
    );
  }

  return (
    <StripeCheckout
      token={t => props.buy(props.course._id, t.id, props.discount)}
      name={"Story"}
      description={props.course.name}
      amount={props.price * 100}
      currency="GBP"
      zipCode={true}
      email={props.email}
      stripeKey={STRIPE_KEY}
    >
      {button}
    </StripeCheckout>
  );
};
