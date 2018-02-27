import * as React from "react";
import { StoryTypes } from "story-backend-utils";
import { LOCALE } from "../../config";
import { i18n } from "../../strings/i18n";

export const PriceLabel: React.StatelessComponent<{
  price: number;
  discount?: StoryTypes.Discount;
}> = ({ price, discount }) => {
  if (price <= 0) {
    return <span>{i18n`Free Price Description`}</span>;
  }

  const priceString = price.toLocaleString(LOCALE, {
    style: "currency",
    currency: "GBP"
  });

  if (discount === undefined || discount.value <= 0) {
    return <span>{priceString}</span>;
  }

  return (
    <span>
      <span className="strikethrough">{priceString}</span>
      &nbsp;
      <PriceLabel price={price - discount.value} />
    </span>
  );
};
