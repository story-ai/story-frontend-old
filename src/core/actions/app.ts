export const APP_START = "APP_START";
export type AppStartAction = {
  type: "APP_START";
};
export const startApp = (): AppStartAction => ({
  type: APP_START
});
