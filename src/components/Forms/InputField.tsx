import * as React from "react";
import { Form, FormFieldProps } from "semantic-ui-react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
const AnyField = Field as any;

export const InputFieldComponent: React.StatelessComponent<any> = ({
  input,
  ...otherProps
}) => {
  return <Form.Input {...otherProps} {...input} />;
};

export const InputField: React.StatelessComponent<
  { name: string } & FormFieldProps
> = props => {
  return <AnyField {...props} component={InputFieldComponent} />;
};
