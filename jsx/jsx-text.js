import types from './types';

class JSXText {
  constructor (text) {
    this.text     = text;
    this.$$typeof = types.JSXText;
  }

  stringify () {
    return this.text;
  }
}

export default JSXText;