import types from './types';

class JSXComponent {
  constructor (type, props, children) {
    this.type     = type;
    this.props    = props;
    this.children = children;

    this.type.toString = function () {
      return type.name;
    }

    this.$$typeof = types.JSXComponent;
  }

  stringify () {
    
  }

  flatten () {
    let list = [this];

    if (this.children.length > 0) {
      this.children.forEach(function (child) {
        if (!child.flatten) {
          return list.push(child);
        }

        var flat = child.flatten();

        list = list.concat(flat);
      });
    }

    return list;
  }

  map (callback) {
    var flat;

    if (typeof callback === 'function') {
      flat = this.flatten();

      return flat.map(callback);
    }
  }

  forEach (callback) {
    this.map(callback);
  }
}

export default JSXComponent;