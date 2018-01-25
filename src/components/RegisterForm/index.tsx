import { StateType } from "../../core/reducers";
import * as React from "react";
import { Link } from "react-router-dom";
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
    <div className="auth-container">
      <div className="auth-content">
        <div className="row">
          <div className="logo" />
          <form
            // This is unsatisfactory but I think is a problem with the redux-forms typings
            onSubmit={props.handleSubmit as any}
          >
            <h1>Register </h1>
            {props.registerError && (
              <div className="err">{props.registerError}</div>
            )}
            <Field
              name="username"
              disabled={props.pending}
              placeholder="E-mail address"
              component="input"
              type="email"
            />
            <Field
              name="password"
              disabled={props.pending}
              placeholder="Password"
              component="input"
              type="password"
            />
            <Field
              name="passwordConfirmation"
              disabled={props.pending}
              placeholder="Password Confirmation"
              component="input"
              type="password"
            />

            <button type="submit" disabled={props.pending}>
              {props.pending ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>
      <div className="auth-footer">
        <div>
          <a href="https://story-ai.com">Story</a>
        </div>
        <div>
          <a href="https://century.tech">Powered by CENTURY Tech</a>
        </div>
      </div>
    </div>
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
    <div>Register for Story</div>
    <RegistrationForm />
    <div>
      Already have an account? &nbsp;
      <Link to="/login">Login</Link>
    </div>
  </div>
);
