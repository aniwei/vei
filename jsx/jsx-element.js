import kebaCase     from 'lodash.kebabcase';
import JSText       from './jsx-text';
import types        from './types';
import attributes   from './attributes';
import closeElement from './close-element';

class JSXElement {
  constructor (type, props, children) {
    this.type     = type;
    this.props    = props;
    this.$$typeof = types.JSXElement;
    this.children = children;
  }

  styleStringify (style) {
    const styleSheet  = [];
    const properties  = Object.getOwnPropertyNames(style);
    
    properties.forEach((property) => {
      styleSheet.push(
        `${kebaCase(key)}: ${style[property]}`
      );
    });
    
    return styleSheet.join('');
  }

  attrubuteStringify() {
    const props      = this.props;
    const attributes = Object.getOwnPropertyNames(props);

    return attributes.map((attr) => {
      var value = props[attr];
      var prop;

      attr = kebaCase(attr);
      prop = value;

      switch (attr) {
        case 'style':
          if (typeof prop === 'object') {
            return `style="${this.styleStringify(prop)}"`;
          }

          return `style="${prop}"`;
        default:
          return `${attr}="${prop}"`;
          
          break;
      }
    }).join(' ')
  }

  stringify () {
    const element     = this;
    const html        = [];

    if (element) {
      const children = element.children || [];
      
      html.push(`<${element.type}`);
      html.push(` ${this.attrubuteStringify()}>`);  

      if (closeElement[element.type]) {
        html.push(` />`);
      } else {
        html.push(children.map((child) => child.stringify ?
          child.stringify() : child ).join('')
        );
        html.push(`</${element.type}>`);
      }
    }

    return html.join('');
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


export default JSXElement;

