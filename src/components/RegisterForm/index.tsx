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

export const RegisterForm = () => (
  <div className="register-form">
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          {" "}
          Register for Story
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
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
            />

            <Button
              color="teal"
              fluid
              size="large"
              as={(props: {}) => <Link to="/login" {...props} />}
            >
              Sign up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? &nbsp;
          <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);
