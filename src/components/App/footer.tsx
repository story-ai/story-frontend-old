import * as React from "react";
import { Menu, Container } from "semantic-ui-react";

export const AppFooter: React.StatelessComponent<{}> = () => {
  return (
    <Menu inverted borderless>
      <Container>
        <Menu.Item position="right">Copyright 2017 Story AI</Menu.Item>
      </Container>
    </Menu>
  );
};
