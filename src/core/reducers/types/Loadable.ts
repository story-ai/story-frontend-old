import { Map } from "story-backend-utils";

export type LoadableState = "LOADED" | "FAILED" | "PENDING" | "UNKNOWN";

export type Loadable<T = any> =
  | {
      state: "LOADED";
      item: T;
    }
  | {
      state: "FAILED";
      error: string;
    }
  | { state: "PENDING" | "UNKNOWN" };

export interface LoadableMap<T = any> {
  LOADED: Map<T>;
  FAILED: Map<string>;
  PENDING: string[];
}

export function BlankLoadableMap<T = any>(): LoadableMap<T> {
  return { LOADED: {}, FAILED: {}, PENDING: [] };
}

export function getLoadableFromMap<T>(
  map: LoadableMap<T>,
  id: string
): Loadable<T> {
  const status = getState(map, id);
  if (status === "LOADED") {
    return {
      state: status,
      item: map.LOADED[id]
    };
  } else if (status === "FAILED") {
    return {
      state: status,
      error: map.FAILED[id]
    };
  } else {
    return { state: status };
  }
}

export function getState<T>(map: LoadableMap<T>, id: string): LoadableState {
  if (id in map.LOADED) return "LOADED";
  if (id in map.FAILED) return "FAILED";
  if (map.PENDING.indexOf(id) >= 0) return "PENDING";

  return "UNKNOWN";
}

export function AddLoaded<T>(
  state: LoadableMap<T>,
  action: { items: Map<T> }
): LoadableMap<T> {
  // remove items from pending
  const PENDING = state.PENDING.filter(id => !(id in action.items));

  // add items to LOADED
  const LOADED: Map<T> = { ...state.LOADED, ...action.items };

  // remove from failures
  const FAILED: Map<string> = {};
  for (const id in state.FAILED) {
    if (!(id in action.items)) {
      FAILED[id] = state.FAILED[id];
    }
  }
  return { LOADED, PENDING, FAILED };
}

export function AddPending<T>(
  state: LoadableMap<T>,
  action: { ids?: string[] | undefined }
): LoadableMap<T> {
  let PENDING = state.PENDING;
  const LOADED: Map<T> = {};
  const FAILED: Map<string> = {};
  // remove items from LOADED
  if (action.ids !== undefined) {
    for (const id in state.LOADED) {
      if (action.ids.indexOf(id) < 0) {
        LOADED[id] = state.LOADED[id];
      }
    }
  }

  // If no IDs are given, we can assume that everything is being reloaded
  // so it's okay to just leave LOADED and FAILED empty
  if (typeof action.ids !== "undefined") {
    // add items to PENDING (but ensure uniqueness)
    PENDING = PENDING.concat(action.ids).filter(
      (id, i, a) => a.indexOf(id) === i
    );

    // remove from FAILED
    for (const id in state.FAILED) {
      if (action.ids.indexOf(id) < 0) {
        FAILED[id] = state.FAILED[id];
      }
    }
  }

  return { LOADED, PENDING, FAILED };
}

export function AddFailures<T>(
  state: LoadableMap<T>,
  action: { ids?: string[]; error?: string }
): LoadableMap<T> {
  console.error(action.error);
  if (action.ids === undefined) {
    return BlankLoadableMap();
  }

  // remove failures from pending
  const PENDING = state.PENDING.filter(id => action.ids!.indexOf(id) >= 0);

  // remove failures from LOADED
  const LOADED: Map<T> = {};
  for (const id in state.LOADED) {
    if (action.ids.indexOf(id) < 0) {
      LOADED[id] = state.LOADED[id];
    }
  }

  // add new failures (but ensure uniqueness)
  const newFailures: Map<string> = {};
  for (const id in action.ids) {
    newFailures[id] = action.error || "";
  }
  const FAILED = { ...state.FAILED, ...newFailures };

  return { LOADED, PENDING, FAILED };
}
