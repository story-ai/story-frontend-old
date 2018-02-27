import "./index.scss";

import * as React from "react";
import { connect } from "react-redux";
import { StoryTypes } from "story-backend-utils";

import {
  ActivateDiscount,
  DeactivateDiscounts
} from "../../core/actions/discounts";
import { StateType } from "../../core/reducers";
import { i18n } from "../../strings/i18n";

type StateProps =
  | {
      loaded: true;
      discounts: StoryTypes.Discount[];
      activeDiscount?: StoryTypes.Discount;
      referral_code: string;
    }
  | { loaded: false };

export class DiscountChestComponent extends React.Component<
  StateProps & {
    activate: (d: StoryTypes.Discount) => ActivateDiscount;
    deactivate: () => DeactivateDiscounts;
  }
> {
  state = {
    open: false
  };

  render() {
    if (!this.props.loaded) return null;
    const { discounts, activeDiscount, referral_code } = this.props;
    const referral_code_text = (
      <span className="code" key="referral_code">
        {referral_code}
      </span>
    );
    return (
      <div className="discount-chest">
        <div
          className="open-button"
          onClick={() => this.setState({ open: !this.state.open })}
        />
        <div className={`discount-list ${this.state.open ? "" : "hidden"}`}>
          <div className="top">
            <h3>{i18n`Discount Box Title`}</h3>
          </div>
          <div className="bottom">
            {discounts.length > 0 ? (
              <ul>
                {discounts.map(x => {
                  const active =
                    activeDiscount !== undefined &&
                    x.name === activeDiscount.name;
                  console.log(active);
                  return (
                    <li key={x.name}>
                      <span>{x.name}</span>:{" "}
                      {x.value.toLocaleString("en-GB", {
                        style: "currency",
                        currency: "GBP"
                      })}{" "}
                      - [
                      {active ? (
                        <a href="#" onClick={() => this.props.deactivate()}>
                          {i18n`Deactivate Discount Link`}
                        </a>
                      ) : (
                        <a href="#" onClick={() => this.props.activate(x)}>
                          {i18n`Activate Discount Link`}
                        </a>
                      )}]
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="no-discount-text">{i18n`No Discounts Text`}</p>
            )}
            <p className="code-text">
              {i18n`Referral Bonus Description ${referral_code_text}[Referral Code]`}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export const DiscountChest = connect(
  (state: StateType, props: {}): StateProps => {
    if (state.user.meta.state !== "LOADED") {
      return { loaded: false };
    }
    return {
      loaded: true,
      activeDiscount: state.discounts.active,
      discounts: state.user.meta.item.discounts,
      referral_code: state.user.meta.item.referral_code
    };
  },
  {
    activate: (d: StoryTypes.Discount) => new ActivateDiscount(d),
    deactivate: () => new DeactivateDiscounts()
  }
)(DiscountChestComponent);
