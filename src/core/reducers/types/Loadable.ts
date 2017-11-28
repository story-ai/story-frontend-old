export interface Loadable<
  T = {
    [k: string]: T;
  }
> {
  readonly state: "LOADED" | "FAILED" | "PENDING";
  item: null | T;
}
