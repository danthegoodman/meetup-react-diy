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
      return {
        type: componentOrTag,
        props: props,
        children: children,
      }
    }
  };

  window.ReactDOM = {
    render: function (elem, node) {
      throw new Error("TODO");
    },
  };
})();
