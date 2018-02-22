import { StoryTypes } from "story-backend-utils";

import { AllActions } from "../actions";
import { ActivateDiscount, DeactivateDiscounts } from "../actions/discounts";

export type StateType = {
  active?: StoryTypes.Discount;
};

export const initial: StateType = {};

export const reducer = (
  state: StateType = initial,
  action: AllActions
): StateType => {
  switch (action.type) {
    case ActivateDiscount.type:
      return { active: action.discount };

    case DeactivateDiscounts.type:
      return {};
  }
  return state;
};
