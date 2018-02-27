import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { LogoutRequested } from "../../core/actions/auth";
import { i18n } from "../../strings/i18n";

const currentYear = new Date().getFullYear();

export const AppFooterComponent: React.StatelessComponent<{
  logout: () => LogoutRequested;
}> = props => {
  return (
    <div className="app-footer">
      <div className="container">
        {/* <Menu.Item
          position="right"
          onClick={props.logout}
          as={(props: {}) => <Link to="/" {...props} />}
        >
          Logout
        </Menu.Item> */}
        <Link to="/" onClick={props.logout} className="logout">
          {i18n`Logout Link Text`}
        </Link>
        {i18n`Copyright Notice ${currentYear}[Year]`}
      </div>
    </div>
  );
};

export const AppFooter = connect(null, {
  logout: () => new LogoutRequested()
})(AppFooterComponent);
