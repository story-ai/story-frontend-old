import { StateType } from "../../core/reducers";
import * as React from "react";
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
import { InputHTMLAttributes } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { login } from "../../core/actions/auth";
import { InputField } from "../Forms/InputField";

import { LogoutPage } from "./logout";
import "./index.scss";

const LoginFormComponent: React.StatelessComponent<
  { pending: boolean; loginError?: string } & InjectedFormProps
> = props => {
  return (
    <Form size="large">
      <Segment stacked>
        {props.loginError !== undefined ? (
          <Message negative>{props.loginError}</Message>
        ) : null}
        <InputField
          name="username"
          fluid
          icon="user"
          iconPosition="left"
          disabled={props.pending}
          placeholder="E-mail address"
        />
        <InputField
          name="password"
          fluid
          icon="lock"
          iconPosition="left"
          disabled={props.pending}
          placeholder="Password"
          type="password"
        />

        <Button
          color="teal"
          fluid
          size="large"
          onClick={props.handleSubmit}
          disabled={props.pending}
        >
          {props.pending ? "Logging in..." : "Login"}
        </Button>
      </Segment>
    </Form>
  );
};

const loginReduxForm = reduxForm({
  form: "login"
})(LoginFormComponent);

const LoginForm = connect(
  (state: StateType) => ({
    pending: state.auth.loginPending,
    loginError: state.auth.loginError
  }),
  { onSubmit: login }
)(loginReduxForm as any);

export const LoginPageComponent: React.StatelessComponent<{
  onSubmit: (x: any) => any;
}> = props => {
  return (
    <div className="login-form">
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            {" "}
            Log in to Story
          </Header>
          <LoginForm />
          <Message>
            New to us? &nbsp;
            <Link to="/register">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export const LoginPage = connect(null, {
  onSubmit: login
})(LoginPageComponent);
export { LogoutPage } from "./logout";
