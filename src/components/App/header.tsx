import * as React from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../core/actions/auth";

export const AppHeaderComponent: React.StatelessComponent<{
  logout: () => any;
}> = props => {
  return (
    <Menu inverted>
      <Container>
        <Menu.Item header as={(props: {}) => <Link to="/" {...props} />}>
          Story
        </Menu.Item>
        {/* <Menu.Item as={(props: {}) => <Link to="/page1" {...props} />}>
          Page 1
        </Menu.Item> */}

        <Menu.Item
          position="right"
          onClick={props.logout}
          as={(props: {}) => <Link to="/" {...props} />}
        >
          Logout
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export const AppHeader = connect(null, {
  logout
})(AppHeaderComponent);
