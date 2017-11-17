import { LogoutPage } from "./logout";
import * as React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

export const LoginForm = () => (
  <div className="login-form">
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          {" "}
          Log in to Story
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button
              color="teal"
              fluid
              size="large"
              as={(props: {}) => <Link to="/" {...props} />}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? &nbsp;
          <Link to="/register">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

export { LogoutPage } from "./logout";
