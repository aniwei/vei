import types from './types';

class JSXExpression {
  constructor (name, type) {
    this.name     = name;
    this.type     = type;

    this.$$typeof = types.JSXExpression;
  }

  stringify () {
    return this.name;
  }
}

export default JSXExpression;