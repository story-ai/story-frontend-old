import * as React from "react";
import { InputHTMLAttributes, ReactElement } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, InjectedFormProps, reduxForm } from "redux-form";

import { Register } from "../../core/actions/auth";
import { StateType } from "../../core/reducers";
import { i18n } from "../../strings/i18n";

const RegisterFormComponent: React.StatelessComponent<
  {
    pending: boolean;
    registerError: Error | string | undefined;
  } & InjectedFormProps
> = props => {
  return (
    <div className="form">
      <form
        className="inner"
        // This is unsatisfactory but I think is a problem with the redux-forms typings
        onSubmit={props.handleSubmit as any}
      >
        <h1>{i18n`Register Page Header`}</h1>
        {props.registerError && (
          <div className="err">
            {typeof props.registerError === "string"
              ? props.registerError
              : typeof props.registerError === "undefined"
                ? ""
                : props.registerError.message}
          </div>
        )}
        <div className="name">
          <Field
            name="firstname"
            disabled={props.pending}
            placeholder={i18n`Registration Placeholder - First Name`}
            component="input"
            type="text"
          />
          <Field
            name="lastname"
            disabled={props.pending}
            placeholder={i18n`Registration Placeholder - Last Name`}
            component="input"
            type="text"
          />
        </div>
        <Field
          name="username"
          disabled={props.pending}
          placeholder={i18n`Registration Placeholder - Email Address`}
          component="input"
          type="email"
        />
        <Field
          name="password"
          disabled={props.pending}
          placeholder={i18n`Registration Placeholder - Password`}
          component="input"
          type="password"
        />
        <Field
          name="passwordConfirmation"
          disabled={props.pending}
          placeholder={i18n`Registration Placeholder - Password Confirmation`}
          component="input"
          type="password"
        />
        <Field
          name="referral_code"
          disabled={props.pending}
          placeholder={i18n`Registration Placeholder - Referral Code`}
          component="input"
          type="text"
        />

        <div className="check-row">
          <Field name="terms" id="terms" component="input" type="checkbox" />
          <label htmlFor="employed">
            {i18n`T&C Registration Text ${(
              <a
                href="https://story-ai.com/terms"
                key="link"
              >{i18n`T&C Link Text`}</a>
            )}[Link]`}
          </label>
        </div>

        <div className="check-row">
          <Field
            name="mailing_list"
            id="mailing_list"
            component="input"
            type="checkbox"
          />
          <label htmlFor="mailing_list">
            {i18n`Mailing List Registration Text`}
          </label>
        </div>

        <button type="submit" disabled={props.pending}>
          {props.pending
            ? i18n`Registration Submit Button (Pending)`
            : i18n`Registration Submit Button`}
        </button>
      </form>
      <Link to="/login" className="switch-auth">
        <div>{i18n`Registration Page Login Link Text`}</div>
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
    onSubmit: (form: any) =>
      new Register({
        username: form.username,
        firstname: form.firstname,
        lastname: form.lastname,
        password: form.password,
        passwordConfirmation: form.passwordConfirmation,
        mailing_list: form.mailing_list,
        terms: form.terms,
        referral_code: form.referral_code
      })
  }
)(registerReduxForm as any);
