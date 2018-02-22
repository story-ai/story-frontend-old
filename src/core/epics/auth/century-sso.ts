export enum LoginStatus {
  errNoOrg = "ERR_NO_ORG",
  errNoTarget = "ERR_NO_TARGET",
  loggedIn = "LOGGED_IN",
  loggedOut = "LOGGED_OUT"
}

export interface TokenData {
  accessToken: string;
  tokenData: {
    context: {
      organisations: { organisation: string; roles: string[] }[];
      roles: string[];
      isTest: boolean;
    };
    exp: number;
    iat: number;
    sub: string;
  };
  sessionId: string;
  status?: LoginStatus;
}

export interface SingleSignOnClientArgs {
  appServer?: string;
  appKey: string;
  onUpdate: (data: TokenData) => void;
  redirectUrl?: string;
}

export class SingleSignOnClient {
  public appServer: string = "https://app.century.tech";
  public appKey: string;
  public onUpdate: (data: TokenData) => void;
  public redirectUrl?: string;

  private iframe: HTMLIFrameElement;
  private popup?: Window;

  public constructor(data: SingleSignOnClientArgs) {
    if (data.appServer) {
      this.appServer = data.appServer;
    }

    if (data.redirectUrl) {
      this.redirectUrl = data.redirectUrl;
    }

    if (data.appKey) {
      this.appKey = data.appKey;
    } else {
      throw Error("Missing property appKey");
    }

    if (data.onUpdate) {
      this.onUpdate = data.onUpdate;
    } else {
      throw Error("Missing callback onUpdate");
    }

    // Listen on data sent by the iframe
    window.addEventListener("message", evt => {
      // console.log("New message!", evt);
      if (evt.data && evt.data.ctekAuth) {
        if (this.popup) {
          this.popup.close();
        }

        this.onUpdate(evt.data.ctekAuth);
      }
    });

    this.iframe = this.createIframe();
  }

  /**
   * Opens a modal or redirect the user to the login page
   */
  public login(): void {
    const loginUrl = this.appServer + "/login/";
    let newWin;

    /**
     * We're having some issues with the storage update event. I'm disabling this for now
     */
    // const newWin = window.open(
    //   loginUrl + "?redirect=about:blank",
    //   "centuryAuth",
    //   "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes,width=550,height=700"
    // );
    const redirect = this.redirectUrl ? this.redirectUrl : window.location.href;
    window.location.assign(loginUrl + "?redirect=" + redirect);

    // if we can't open the window, redirect to the login page
    // if (!newWin || newWin.closed || typeof newWin.closed == "undefined") {
    // document.location.href = loginUrl + "?redirect=" + document.location.href;
    // } else {
    //   newWin.onbeforeunload = () => {
    //     this.popup = undefined;
    //   };
    //   this.popup = newWin;
    // }
  }

  /**
   * Deletes the current token from the CENTURY domain. It will trigger a call on the onUpdate method
   */
  public logout(): void {
    this.iframe.contentWindow.postMessage(
      { ctekAuth: { action: "logout" } },
      "*"
    );
  }

  private createIframe(): HTMLIFrameElement {
    const iframe = document.createElement("iframe");

    iframe.width = "0";
    iframe.height = "0";
    iframe.frameBorder = "0";
    iframe.style.display = "none";
    iframe.src = `${this.appServer}/login/expose-sso.html?org=${
      this.appKey
    }&target=${document.location.href}`;

    document.body.appendChild(iframe);

    return iframe;
  }
}
