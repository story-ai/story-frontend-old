export type AppStartKickedAction = {
  type: "APP_START_KICKED";
};

export type AppStartedAction = {
  type: "APP_STARTED";
};

export type AppStartFailedAction = {
  type: "APP_START_FAILED";
  reason: string;
};

export type AppStartAction =
  | AppStartedAction
  | AppStartFailedAction
  | AppStartKickedAction;

export const startApp = (): AppStartKickedAction => ({
  type: "APP_START_KICKED"
});

export const setAppStarted = (): AppStartedAction => ({
  type: "APP_STARTED"
});

export const failAppStartup = (reason: string): AppStartFailedAction => ({
  type: "APP_START_FAILED",
  reason: reason
});
