export const LOGOUT = "LOGOUT";
export type LogoutAction = {
  type: "LOGOUT";
};
export const logout = (): LogoutAction => ({
  type: LOGOUT
});

export const LOGIN = "LOGIN";
export type LoginAction = {
  type: "LOGIN";
  username: string;
  password: string;
};
export const login = (username: string, password: string): LoginAction => ({
  type: LOGIN,
  username,
  password
});

export const RECEIVED_TOKEN = "RECEIVED_TOKEN";
export type ReceivedTokenAction = {
  type: "RECEIVED_TOKEN";
  token: string;
};
export const receiveToken = (token: string): ReceivedTokenAction => ({
  type: RECEIVED_TOKEN,
  token
});

export const REGISTER = "REGISTER";
export type RegisterAction = {
  type: "REGISTER";
  username: string;
  password: string;
};
export const register = (
  username: string,
  password: string
): RegisterAction => ({
  type: REGISTER,
  username,
  password
});