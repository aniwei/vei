
export default function render(vnode, options, callback, parentContext = { context: {} }) {  
  const prev = vnode._component;
  let root;
  
  if (!prev) {
    root = mountVnode(vnode, parentContext);
  }
  
  if (callback) {
    callback();
  }

  root.__view_page__ = render.__view_page__;

  render.__view_page__ = null;

  return Page(root.__view_page__);
}

function mountVnode(vnode, parentContext) {
  let { vtype } = vnode;

  switch (vtype) {
    case 1:
      return mountElement(vnode, parentContext);
    case 2:
      return mountComponent(vnode, parentContext);
    default:
      return mountElement(vnode); 
  }
}


function mountElement (vnode, parentContext) {
  const { children } = vnode;

  if (children) {
    vnode.children = children.map((child) => {
      return mountVnode(child, parentContext);
    });
  }

  return vnode;
}

function mountComponent (vnode, parentContext) {
  const { type, props, children, host } = vnode;
  const newProp = Object.assign({}, props);
  let context;
  
  newProp.children = children && children.length > 0 ? 
    children : null;

  if (type.contextTypes) {
    context = childContext(parentContext, type.contextTypes);
  }

  const instance = new type(newProp, parentContext);
  vnode.instance = instance;

  instance.props          = newProp;
  instance.context        = parentContext;
  instance.__vnode__      = vnode;

  instance.__viewid__ = props.__viewid__;

  if (instance.__view_type__ === 'page') {
    
    instance.state = Object.assign({__viewid__: instance.__viewid__}, instance.state);

    if (!render.__view_page__) {
      render.__view_page__ = instance;
    }
  } 

  instance.__view_page__  = render.__view_page__;

  const rendered = renderComponent(instance);

  instance.vnode = rendered;

  const vdom = mountElement(instance.vnode, parentContext);

  return instance || vdom;
}

function renderComponent (instance) {
  const vnode = instance.render();

  if (!vnode || !vnode.vtype) {
    throw new Error(
      `@${type.name}#render:You may have returned undefined, an array or some other invalid object`
    );
  }

  return vnode;
}

function childContext (context, contextTypes) {
  const keys  = Object.getOwnPropertyNames(contextTypes);
  const proto = '__proto__';
  const cxt   = {};

  keys.forEach((key) => {
    cxt[key] = context[key];
  });

  cxt[proto] = context;

  context = ctx;

  return Object.assign(cxt);
}