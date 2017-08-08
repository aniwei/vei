import kebabcase      from 'lodash.kebabcase';
import events         from '../events';


class Deserialize {
  constructor (component) {
    const json = {}

    this.component = component;
    this.json      = {
      [component.__vnode__.type]: json
    };

    this.deserialize(this.component, json);
  }

  deserialize (component, json, prefix) {
    const keys      = Object.getOwnPropertyNames(component.props || {});
    json            = json || {};
    prefix          = prefix ? `${prefix}` : '$';

    json = Object.assign(
      json,
      this.deserializeProperties(component.props, prefix),
      this.deserializeChildren(component.children, prefix)
    );
  }

  deserializeEventProperties (property, value) {
    const name = events[property];

    if (name) {
      
    }
  }

  deserializeStyleProperties (styles) {
    if (Array.isArray(styles)) {
      return styles.map(style => this.deserializeStyleProperties(styles)).join('');
    } else {
      if (!(typeof styles === 'object')) {
        throw new Error(`The style property must be an object`);
      }

      const properties = Object.getOwnPropertyNames(styles);

      return properties.map((name) => {
        const property = kebabcase(name);

        return `${property}: ${styles[name]};`;
      }).join('');
    }
  }

  deserializeChildren (children, prefix) {
    const json = {};

    children.map((child, index) => {
      const name = `${prefix ? `${prefix}_` : '' }${index}`;

      if (typeof child === 'object') {
        return this.deserialize(child, json, name)
      }
      
      return json[name] = child;
    });

    return json;
  }

  deserializeProperties (props, prefix) {
    const properties = Object.getOwnPropertyNames(props || {}); 
    const json       = {};

    properties.map(property => {
      const name = `${prefix}_${property}`;
      let value;

      value = property === 'style' ?
        this.deserializeStyleProperties(props[property]) :
        props[property];

      json[name] = value;
    });

    return json;
  }
}

export default function (component) {
  const deserialize = new Deserialize(component);

  return deserialize.json;
}