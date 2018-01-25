import { StateType } from "../../core/reducers";
import * as React from "react";
import { Link } from "react-router-dom";
import { InputHTMLAttributes, ReactElement } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { login } from "../../core/actions/auth";

const LoginFormComponent: React.StatelessComponent<
  {
    pending: boolean;
    loginError?: string;
  } & InjectedFormProps
> = props => {
  return (
    <div className="form">
      <form
        // This is unsatisfactory but I think is a problem with the redux-forms typings
        onSubmit={props.handleSubmit as any}
      >
        <h1>Login</h1>
        {props.loginError && <div className="err">{props.loginError}</div>}
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

        <button type="submit" disabled={props.pending}>
          {props.pending ? "Logging in..." : "Login"}
        </button>
      </form>

      <Link to="/register">
        <div>Register a new account</div>
      </Link>
    </div>
  );
};

const loginReduxForm = reduxForm({
  form: "login"
})(LoginFormComponent);

export const LoginForm = connect(
  (state: StateType) => ({
    pending: state.auth.loginPending,
    loginError: state.auth.loginError
  }),
  { onSubmit: login }
)(loginReduxForm as any);
