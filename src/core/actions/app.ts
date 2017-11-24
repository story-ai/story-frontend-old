export const APP_START_KICKED = "APP_START_KICKED";
export type AppStartKickedAction = {
  type: "APP_START_KICKED";
};
export const startApp = (): AppStartKickedAction => ({
  type: "APP_START_KICKED"
});

export const APP_STARTED = "APP_STARTED";
export type AppStartedAction = {
  type: "APP_STARTED";
};
export const setAppStarted = (): AppStartedAction => ({
  type: "APP_STARTED"
});

export const APP_START_FAILED = "APP_START_FAILED";
export type AppStartFailedAction = {
  type: "APP_START_FAILED";
  reason: string;
};
export const failAppStartup = (reason: string): AppStartFailedAction => ({
  type: APP_START_FAILED,
  reason: reason
});
