import "./index.scss";

import * as React from "react";
import { StateType } from "../../core/reducers";
import { connect } from "react-redux";
import { CenturyTypes, StoryTypes } from "story-backend-utils";
import {
  ActivateDiscount,
  DeactivateDiscounts
} from "../../core/actions/discounts";

type StateProps =
  | {
      loaded: true;
      discounts: StoryTypes.Discount[];
      activeDiscount?: StoryTypes.Discount;
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
    if (!this.props.loaded || this.props.discounts.length < 1) return null;
    const { discounts, activeDiscount } = this.props;
    return (
      <div className="discount-chest">
        <div
          className="open-button"
          onClick={() => this.setState({ open: !this.state.open })}
        />
        <div className={`discount-list ${this.state.open ? "" : "hidden"}`}>
          <div className="top">
            <h3>Your Discounts</h3>
          </div>
          <div className="bottom">
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
                        Deactivate
                      </a>
                    ) : (
                      <a href="#" onClick={() => this.props.activate(x)}>
                        Activate
                      </a>
                    )}]
                  </li>
                );
              })}
            </ul>
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
      discounts: state.user.meta.item.discounts
    };
  },
  {
    activate: (d: StoryTypes.Discount) => new ActivateDiscount(d),
    deactivate: () => new DeactivateDiscounts()
  }
)(DiscountChestComponent);
