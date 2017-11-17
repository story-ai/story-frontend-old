import * as React from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const AppHeader: React.StatelessComponent<{}> = () => {
  return (
    <Menu inverted>
      <Container>
        <Menu.Item header as={(props: {}) => <Link to="/" {...props} />}>
          Story
        </Menu.Item>
        <Menu.Item as={(props: {}) => <Link to="/page1" {...props} />}>
          Page 1
        </Menu.Item>

        <Menu.Item
          position="right"
          as={(props: {}) => <Link to="/logout" {...props} />}
        >
          Logout
        </Menu.Item>
      </Container>
    </Menu>
  );
};
