import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as StoryLogo from "../../img/s-tight.png";

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
          Store
        </h1>
      </div>
    </div>
  );
};

export const AppHeader = connect(null, {})(AppHeaderComponent);
