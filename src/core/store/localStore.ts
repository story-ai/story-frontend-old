export const loadState = () => {
  try {
    const localState = localStorage.getItem("state");
    if (localState === null) return undefined;
    return JSON.parse(localState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    // ignore errors
  }
};
