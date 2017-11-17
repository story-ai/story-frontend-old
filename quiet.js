const quieten = function(global) {
  var console_log = global.console.log;
  var console_warn = global.console.warn;

  global.console.warn = function() {
    if (
      !(
        arguments.length == 1 &&
        typeof arguments[0] === "string" &&
        arguments[0].match(/^\[(HMR|WDS)\]/)
      )
    ) {
      console_warn.apply(global.console, arguments);
    }
  };

  global.console.log = function() {
    if (
      !(
        arguments.length == 1 &&
        typeof arguments[0] === "string" &&
        arguments[0].match(/^\[(HMR|WDS)\]/)
      )
    ) {
      console_log.apply(global.console, arguments);
    }
  };
};

// quieten(window);
