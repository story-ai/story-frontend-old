import { StoryTypes } from "story-backend-utils";

import { MyAction } from "./MyAction";

export class ActivateDiscount extends MyAction {
  type = ActivateDiscount.type;

  static type: "ACTIVATE_DISCOUNT" = "ACTIVATE_DISCOUNT";
  discount: StoryTypes.Discount;

  constructor(discount: StoryTypes.Discount) {
    super();
    this.discount = discount;
  }
}

export class DeactivateDiscounts extends MyAction {
  type = DeactivateDiscounts.type;
  static type: "DEACTIVATE_DISCOUNTS" = "DEACTIVATE_DISCOUNTS";
}
