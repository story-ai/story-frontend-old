declare module "react-visibility-sensor" {
  class VisibilitySensor extends React.Component<{
    onChange?: (isVisible: boolean) => any;
    active?: boolean;
    partialVisibility?: boolean;
    offset?: { top?: number; bottom?: number; left?: number; right?: number };
    minTopValue?: number;
    intervalCheck?: boolean;
    intervalDelay?: number;
    scrollCheck?: boolean;
    scrollDelay?: number;
    scrollThrottle?: number;
    resizeCheck?: boolean;
    resizeDelay?: number;
    resizeThrottle?: number;
    // containment: (optional) element to use as a viewport when checking visibility. Default behaviour is to use the browser window as viewport.
    delayedCall?: boolean;
    // children: React. | {isVisible: ?boolean, visibilityRect: Object} => any;
  }> {}
  export = VisibilitySensor;
}
