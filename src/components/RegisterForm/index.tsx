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
import { register } from "../../core/actions/auth";
import { InputField } from "../Forms/InputField";
import "./index.scss";

const RegistrationFormComponent: React.StatelessComponent<
  { pending: boolean; registerError?: string } & InjectedFormProps
> = props => {
  return (
    <Form size="large">
      <Segment stacked>
        {props.registerError !== undefined ? (
          <Message negative>{props.registerError}</Message>
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
        <InputField
          name="passwordConfirmation"
          fluid
          icon="lock"
          iconPosition="left"
          disabled={props.pending}
          placeholder="Password Confirmation"
          type="password"
        />

        <Button
          color="teal"
          fluid
          size="large"
          onClick={props.handleSubmit}
          disabled={props.pending}
        >
          {props.pending ? "Signing up..." : "Sign up"}
        </Button>
      </Segment>
    </Form>
  );
};

const registerReduxForm = reduxForm({
  form: "register"
})(RegistrationFormComponent);

const RegistrationForm = connect(
  (state: StateType) => ({
    pending: state.auth.loginPending,
    registerError: state.auth.registerError
  }),
  { onSubmit: register }
)(registerReduxForm as any);

export const RegisterForm = () => (
  <div className="register-form">
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          {" "}
          Register for Story
        </Header>
        <RegistrationForm />
        <Message>
          Already have an account? &nbsp;
          <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);
