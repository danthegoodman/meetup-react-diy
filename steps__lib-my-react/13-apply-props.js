"use strict";
(function () {
  window.React = {
    Component: class Component {
      constructor(props) {
        this.props = props;
        this.state = {};
      }

      setState(partialState) {
        const newState = Object.assign({}, this.state, partialState);
        this.state = newState;

        const prevElem = this._elem;
        const prevNode = this._node;
        const newElem = this.render();
        const newNode = renderDomNode(newElem, prevElem, prevNode);
        this._elem = newElem;
        if (newNode !== prevNode) {
          prevNode.parentNode.replaceChild(newNode, prevNode);
          this._node = newNode;
        }
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

  function renderDomNode(elem, prevElem, prevNode) {
    if (typeof elem === 'string') {
      if (prevNode && prevElem === elem) return prevNode;
      return document.createTextNode(elem);
    }

    if (typeof elem.type === 'function') {
      let component;
      if (prevElem && prevElem.type === elem.type && prevElem.component) {
        component = prevElem.component;
        component.props = elem.props;
      } else {
        component = new elem.type(elem.props);
      }
      elem.component = component;

      let renderedElem = component.render();
      let node = renderDomNode(renderedElem);
      component._elem = renderedElem;
      component._node = node;
      return node;
    }

    if (typeof elem.type === 'string') {
      let node;
      if (prevNode && prevElem && elem.type === prevElem.type) {
        node = prevNode;
      } else {
        node = document.createElement(elem.type);
      }
      applyProps(node, elem, prevElem);
      applyChildren(node, elem, prevElem);
      return node;
    }

    console.error("elem:", elem);
    throw new Error("Unable to render dom node from element");
  }

  function applyProps(node, elem, prevElem) {
    const props = elem.props || {};
    const prevProps = prevElem ? prevElem.props || {} : {};

    const propKeys = Object.keys(props);
    const prevUnseenKeys = new Set(Object.keys(prevProps));

    for (let key of propKeys) {
      prevUnseenKeys.delete(key);
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

    for (let key of prevUnseenKeys) {
      if (key === 'className') {
        delete node.className;
      } else if (key === 'value') {
        delete node.value;
      } else if (key === 'onChange') {
        delete node.oninput;
        delete node.onchange;
      } else if (key.match(/^on[A-Z]/)) {
        delete node[key.toLowerCase()];
      } else {
        node.removeAttribute(key);
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
