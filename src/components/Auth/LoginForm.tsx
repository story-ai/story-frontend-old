import * as React from "react";
import { InputHTMLAttributes, ReactElement } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { LoginRequested } from "../../core/actions/auth";
import { StateType } from "../../core/reducers";
import { i18n } from "../../strings/i18n";

const LoginFormComponent: React.StatelessComponent<{
  pending: boolean;
  loginError: string | undefined;
  login: () => LoginRequested;
}> = props => {
  return (
    <div className="form">
      <div className="inner">
        <h1>{i18n`Login Page Header`}</h1>
        {props.loginError && <div className="err">{props.loginError}</div>}
        <button disabled={props.pending} onClick={props.login}>
          {props.pending
            ? i18n`Login Submit Button (Pending)`
            : i18n`Login Submit Button`}
        </button>
        <span
          style={{
            marginTop: 20,
            color: "rgba(255,255,255,0.4)"
          }}
        >
          {i18n`Login Page Forgot Password Text`}
        </span>
      </div>

      <Link to="/register">
        <div>{i18n`Login Page Register Button`}</div>
      </Link>
    </div>
  );
};

export const LoginForm = connect(
  (state: StateType) => ({
    pending: state.auth.loginPending,
    loginError: state.auth.loginError
  }),
  {
    login: () => new LoginRequested()
  }
)(LoginFormComponent);
