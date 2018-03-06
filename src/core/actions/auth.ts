import { TokenData } from "../epics/auth/century-sso";
import { MyAction } from "./MyAction";

export class LogoutRequested extends MyAction {
  type = LogoutRequested.type;

  static type: "LOGOUT_REQUESTED" = "LOGOUT_REQUESTED";
}

export class LogoutRequestSucceeded extends MyAction {
  type = LogoutRequestSucceeded.type;

  static type: "LOGOUT_REQUEST_SUCCEEDED" = "LOGOUT_REQUEST_SUCCEEDED";
}

export class LoginRequested extends MyAction {
  type = LoginRequested.type;

  static type: "LOGIN_REQUESTED" = "LOGIN_REQUESTED";

  constructor() {
    super();
  }
}

export class LoginRequestSucceeded extends MyAction {
  type = LoginRequestSucceeded.type;

  static type: "LOGIN_REQUEST_SUCCEEDED" = "LOGIN_REQUEST_SUCCEEDED";
  token: TokenData;

  constructor(token: TokenData) {
    super();
    this.token = token;
  }
}

export class AuthRequestFailed extends MyAction {
  type = AuthRequestFailed.type;

  static type: "AUTH_REQUEST_FAILED" = "AUTH_REQUEST_FAILED";
  e: string;

  constructor(e: string) {
    super();
    this.e = e;
  }
}

// export const LOGIN = "LOGIN";
// export type LoginAction = {
//   type: "LOGIN";
//   username: string;
//   password: string;
// };
// export const login = ({
//   username,
//   password
// }: {
//   username: string;
//   password: string;
// }): LoginAction => ({
//   type: LOGIN,
//   username,
//   password
// });

// export const RECEIVED_TOKEN = "RECEIVED_TOKEN";
// export type ReceivedTokenAction = {
//   type: "RECEIVED_TOKEN";
//   token: string;
// };
// export const receiveToken = (token: string): ReceivedTokenAction => ({
//   type: RECEIVED_TOKEN,
//   token
// });

export class Register extends MyAction {
  type = Register.type;

  static type: "REGISTER" = "REGISTER";
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordConfirmation: string;
  mailing_list: boolean;
  terms: boolean;
  referral_code?: string;
  constructor(input: {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    passwordConfirmation: string;
    mailing_list: boolean;
    terms: boolean;
    referral_code?: string;
  }) {
    super();
    this.username = input.username;
    this.password = input.password;
    this.firstname = input.firstname;
    this.lastname = input.lastname;
    this.passwordConfirmation = input.passwordConfirmation;
    this.mailing_list = input.mailing_list;
    this.terms = input.terms;
    this.referral_code = input.referral_code;
  }
}

export class RegisterFailed extends MyAction {
  type = RegisterFailed.type;

  static type: "REGISTER_FAILED" = "REGISTER_FAILED";
  e?: string;
  constructor(e?: string) {
    super();
    this.e = e;
  }
}

export class RegisterSucceeded extends MyAction {
  type = RegisterSucceeded.type;

  static type: "REGISTER_SUCCEEDED" = "REGISTER_SUCCEEDED";
}

export class GotToken extends MyAction {
  type = GotToken.type;

  static type: "GOT_TOKEN" = "GOT_TOKEN";
  token: string;

  constructor(token: string) {
    super();
    this.token = token;
  }
}
