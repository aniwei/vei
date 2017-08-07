import JSXElement   from './jsx-element';
import JSXComponent from './jsx-component';

export default function createElement (type, props, children) {
  if (typeof type === 'function') {
    return new JSXComponent(type, props, children);
  } else {
    return new JSXElement(type, props, children);
  }
}
