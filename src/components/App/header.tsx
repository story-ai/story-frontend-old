import * as React from "react";
import { connect } from "react-redux";

import * as StoryLogo from "../../img/s-tight.png";
import { i18n } from "../../strings/i18n";

export const AppHeaderComponent: React.StatelessComponent<{
  // logout: () => any;
}> = props => {
  return (
    <div className="app-header">
      <div className="container">
        <h1>
          <img
            src={StoryLogo}
            style={{
              maxHeight: 36,
              marginRight: 15
            }}
          />
          {i18n`App Header`}
        </h1>
      </div>
    </div>
  );
};

export const AppHeader = connect(null, {})(AppHeaderComponent);
