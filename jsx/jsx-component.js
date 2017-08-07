import types from './types';

class JSXComponent {
  constructor (type, props, children) {
    this.type     = type;
    this.props    = props;
    this.children = children;

    this.type.toString = function () {
      return this.type.name;
    }

    this.$$typeof = types.JSXComponent;
  }

  stringify () {
    
  }
}

export default JSXComponent;