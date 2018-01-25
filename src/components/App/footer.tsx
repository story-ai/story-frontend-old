import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../core/actions/auth";

export const AppFooterComponent: React.StatelessComponent<{
  logout: typeof logout;
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
          Logout
        </Link>
        Copyright {new Date().getFullYear()} Story AI
      </div>
    </div>
  );
};

export const AppFooter = connect(null, {
  logout
})(AppFooterComponent);
