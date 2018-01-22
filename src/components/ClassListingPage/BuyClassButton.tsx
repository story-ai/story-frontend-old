import { requestAddToClass } from "../../core/actions/classes";
import { StateType } from "../../core/reducers";
import * as React from "react";
import { StoryTypes, CenturyTypes } from "story-backend-utils";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { Loadable } from "../../core/reducers/types/Loadable";
import { STRIPE_KEY } from "../../config";

export const BuyClassButtonComponent: React.StatelessComponent<{
  class: StoryTypes.Class;
  user: Loadable<CenturyTypes.User>;
  requestAddToClass: typeof requestAddToClass;
}> = props => {
  if (props.user.state !== "LOADED") {
    return <div />;
  }
  return (
    <span>
      {props.class.price.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP"
      })}
      {" - "}
      <StripeCheckout
        token={t => props.requestAddToClass(t.id, props.class._id)}
        name={"Story"}
        description={props.class.name}
        amount={props.class.price * 100}
        currency="USD"
        zipCode={true}
        email={props.user.item.contact.emails[0].address}
        bitcoin={true}
        stripeKey={STRIPE_KEY}
      >
        <a href="#">Buy Now</a>
      </StripeCheckout>
    </span>
  );
};

export const BuyClassButton = connect(
  (state: StateType, props: { class: StoryTypes.Class }) => ({
    user: state.user,
    ...props
  }),
  { requestAddToClass }
)(BuyClassButtonComponent);
