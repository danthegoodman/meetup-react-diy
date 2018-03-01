"use strict";
(function () {
  window.React = {
    Component: class Component {
      constructor() {
      }

      setState(partialState) {
        throw new Error("TODO");
      }
    },

    createElement: function (componentOrTag, props, ...children) {
      throw new Error("TODO");
    }
  };

  window.ReactDOM = {
    render: function (elem, node) {
      throw new Error("TODO");
    },
  };
})();
