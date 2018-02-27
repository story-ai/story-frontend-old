import * as React from "react";
import { CenturyTypes } from "story-backend-utils";
import { i18n } from "../../strings/i18n";

export class StrandHeading extends React.Component<{
  item: CenturyTypes.Course["strands"][0];
  bought: boolean;
}> {
  render() {
    const name = this.props.item.name;
    return (
      <li>
        {i18n`Strand Name ${name}[name], ${
          this.props.item.nuggets.length
        }[number of nuggets]`}
      </li>
    );
  }
}
