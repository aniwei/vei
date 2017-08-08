import Context  from '../context';
import types    from '../jsx/types';


const dataType = {
  '[object Null]':      1,
  '[object Undefined]': 2,
  '[object Boolean]':   3,
  '[object Number]':    4,
  '[object String]':    5,
  '[object Symbol]':    6,
  '[object Function]':  7,
  '[object Array]':     8,
};

const typeOf = (object) => {
  const undefined = void 0;

  if (object === undefined) {
    return 0;
  }

  return dataType[toString.call(object)] || 9;
}

export default class Renderer {
  constructor (element, context) {
    this.context = new Context(context || {});
  }

  elementRender (element, context) {
    const children = element.children || [];

    if (children) {
      element.children = children.map(
        child => this.render(child, context)
      );
    }

    return element;
  }

  componentRender (element, context) {
    const { props, type, children } = element;
    const contextTypes = type.contextTypes || {};
    const defaultProps = type.defaultProps || {};

    const contextNames = Object.getOwnPropertyNames(contextTypes).map(name => { 
      return { name, propType: contextTypes[name] }
    });

    const component = new type(
      Object.assign({
        children
      }, defaultProps, props), 

      context.contextForNames(contextNames)
    );

    if (component.getChildContext) {
      const child = component.getChildContext();

      if (child) {
        context.relative(child);
      }
    }

    const elem = component.render();

    component.__element__ = elem;
    elem.__vnode__        = element;
    elem.__component__    = component;

    return this.render(elem, context);
  }

  render (element, context) {
    context = context || this.context;
    
    const type = typeOf(element);
    
    if (type > 8) {
      const { $$typeof } = element;

      switch ($$typeof) {
        case types.JSXComponent:
          return this.componentRender(element, context);
        case types.JSXElement:
          return this.elementRender(element, context);
        case types.JSXContainer:
          return this.elementRender(element, context);
        default:
          throw new Error(`There is not a legal element`);
      }
    }

    return element;
  }
}