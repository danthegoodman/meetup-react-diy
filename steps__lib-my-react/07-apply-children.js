"use strict";
(function () {
  window.React = {
    Component: class Component {
      constructor(props) {
        this.props = props;
        this.state = {};
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

  function applyProps(node, elem) {
    const props = elem.props || {};
    const propKeys = Object.keys(props);

    for (let key of propKeys) {
      if (key === 'className') {
        node.className = props[key];
      } else if (key === 'value') {
        node.value = props[key];
      } else if (key === 'onChange') {
        node.oninput = props[key];
        node.onchange = props[key];
      } else if (key.match(/^on[A-Z]/)) {
        node[key.toLowerCase()] = props[key];
      } else {
        node.setAttribute(key, props[key]);
      }
    }
  }

  function applyChildren(rootNode, elem) {
    const childElems = elem.children;

    for (let ndx = 0; ndx < childElems.length; ndx++) {
      rootNode.appendChild(renderDomNode(childElems[ndx]));
    }
  }

})();
