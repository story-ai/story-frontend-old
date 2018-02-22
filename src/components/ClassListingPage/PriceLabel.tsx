import * as React from "react";
import { StoryTypes } from "story-backend-utils";

export const PriceLabel: React.StatelessComponent<{
  price: number;
  discount?: StoryTypes.Discount;
}> = ({ price, discount }) => {
  if (price <= 0) {
    return <span>Free!</span>;
  }

  if (discount === undefined || discount.value <= 0) {
    return (
      <span>
        {price.toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP"
        })}
      </span>
    );
  }

  return (
    <span>
      <span className="strikethrough">
        {price.toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP"
        })}
      </span>
      &nbsp;
      <PriceLabel price={price - discount.value} />
    </span>
  );
};
