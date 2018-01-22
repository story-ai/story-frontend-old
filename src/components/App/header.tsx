import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../core/actions/auth";

export const AppHeaderComponent: React.StatelessComponent<{
  logout: () => any;
}> = props => {
  return (
    <div className="app-header">
      <div className="container">
        <h1>Story Store</h1>
      </div>
    </div>
  );
};

export const AppHeader = connect(null, {
  logout
})(AppHeaderComponent);
