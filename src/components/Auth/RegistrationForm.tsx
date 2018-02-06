import { StateType } from "../../core/reducers";
import * as React from "react";
import { Link } from "react-router-dom";
import { InputHTMLAttributes, ReactElement } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { Register } from "../../core/actions/auth";

const RegisterFormComponent: React.StatelessComponent<
  {
    pending: boolean;
    registerError: string | undefined;
  } & InjectedFormProps
> = props => {
  return (
    <div className="form">
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
      <Link to="/login">
        <div>I already have an account</div>
      </Link>
    </div>
  );
};

const registerReduxForm = reduxForm({
  form: "register"
})(RegisterFormComponent as any);

export const RegistrationForm = connect(
  (state: StateType) => ({
    pending: state.auth.loginPending,
    registerError: state.auth.registerError
  }),
  {
    onSubmit: ({
      username,
      password,
      passwordConfirmation
    }: {
      [k: string]: string;
    }) => new Register(username, password, passwordConfirmation)
  }
)(registerReduxForm as any);
