import types from './types';

class JSXContainer {
  constructor (props, children) {
    this.type     = '#jsx-container';
    this.props    = props || null;
    this.$$typeof = types.JSXContainer;
    this.children = children;
  }

  stringify () {
    const children = this.children || [];
    const html = [];

    return children.map(child => child.stringify()).join('');
  }
}

export default JSXContainer;