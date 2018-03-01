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
      node.appendChild(renderDomNode(elem));
    },
  };

  function renderDomNode(elem) {
    if (typeof elem.type === 'function') {
      //component
      return;
    }

    if (typeof elem.type === 'string') {
      //dom
      return;
    }

    console.error("elem:", elem);
    throw new Error("Unable to render dom node from element");
  }
})();
