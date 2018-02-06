import { MyAction } from "./MyAction";

export class ReloadAll extends MyAction {
  type = ReloadAll.type;

  static type: "RELOAD_ALL" = "RELOAD_ALL";
}
