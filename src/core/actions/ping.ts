export const PING = "PING";
export type PingAction = {
  type: "PING";
};
export const ping = (): PingAction => ({ type: PING });

export const PONG = "PONG";
export type PongAction = {
  type: "PONG";
};
export const pong = (): PongAction => ({ type: PONG });
