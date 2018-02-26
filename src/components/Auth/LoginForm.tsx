import * as React from "react";
import { InputHTMLAttributes, ReactElement } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { LoginRequested } from "../../core/actions/auth";
import { StateType } from "../../core/reducers";

const LoginFormComponent: React.StatelessComponent<{
  pending: boolean;
  loginError: string | undefined;
  login: () => LoginRequested;
}> = props => {
  return (
    <div className="form">
      <div className="inner">
        <h1>Login</h1>
        {props.loginError && <div className="err">{props.loginError}</div>}
        {/* <Field
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
        /> */}
        <button disabled={props.pending} onClick={props.login}>
          {props.pending ? "Logging in..." : "Login"}
        </button>
        <span
          style={{
            marginTop: 20,
            color: "rgba(255,255,255,0.4)"
          }}
        >
          Forgot your password? Let us help in the live chat below.
        </span>
      </div>

      <Link to="/register">
        <div>Register a new account</div>
      </Link>
    </div>
  );
};

// const loginReduxForm = reduxForm({
//   form: "login"
// })(LoginFormComponent);

export const LoginForm = connect(
  (state: StateType) => ({
    pending: state.auth.loginPending,
    loginError: state.auth.loginError
  }),
  {
    login: () => new LoginRequested()
  }
)(LoginFormComponent);
