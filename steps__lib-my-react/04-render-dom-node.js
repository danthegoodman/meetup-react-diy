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
      let component = new elem.type(elem.props);
      let renderedElem = component.render();
      let node = renderDomNode(renderedElem);
      return node;
    }

    if (typeof elem.type === 'string') {
      let node = document.createElement(elem.type);
      applyProps(node, elem);
      applyChildren(node, elem);
      return node;
    }

    console.error("elem:", elem);
    throw new Error("Unable to render dom node from element");
  }
})();
