import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { CenturyTypes, StoryTypes } from "story-backend-utils";

import { STRIPE_KEY } from "../../config";
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
  studyGroupId: string | undefined;
  price: number;
  discount?: StoryTypes.Discount;
};

export const CourseButton: React.StatelessComponent<
  CourseButtonProps
> = props => {
  if (props.owned) {
    return (
      <a
        href={
          props.firstVisit
            ? "https://app.century.tech/learn/my-path"
            : `https://app.century.tech/learn/study-groups/${
                props.studyGroupId
              }`
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="action-button">Start course</button>
      </a>
    );
  }

  const button = (
    <button className="action-button">
      Unlock Course (<PriceLabel
        price={props.course.price}
        discount={props.discount}
      />)
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
