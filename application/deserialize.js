import kebabcase      from 'lodash.kebabcase';
import events         from '../events';

function deserializeStyleProperties (styles) {
  if (Array.isArray(styles)) {
    return styles.map(style => deserializeStyleProperties(styles)).join('');
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

function deserializeEventProperties (property, value) {
  const name = events[property];

  if (name) {

  }
}

function deserializeProperties (props, prefix) {
  const properties = Object.getOwnPropertyNames(props || {}); 
  const json       = {};

  properties.map(property => {
    const name = `${prefix}.attr.${property}`;
    let value;

    value = property === 'style' ?
      deserializeStyleProperties(props[property]) :
      props[property];

    json[name] = value;
  });

  return json;
}

function deserializeChildren (children, prefix) {
  const json = {};

  children.map((child, index) => {
    const name = `${prefix}.child_${index}`;

    if (typeof child === 'object') {
      return deserialize(child, json, name)
    }
    
    return json[name] = child;
  });

  return json;
}

function deserialize (component, json, prefix) {
    json            = json || {};
    prefix          = prefix ? `${prefix}.${component.type}` : component.type;
    const keys      = Object.getOwnPropertyNames(component.props || {});

    json = Object.assign(
      json,
      deserializeProperties(component.props, prefix),
      deserializeChildren(component.children, prefix)
    );

    return json;
}

export default deserialize;