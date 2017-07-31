let __view_page__;

export default function render(vnode, options, callback, parentContext = {}) {  
  const prev = vnode._component;
  let root;
  
  if (!prev) {
    root = mountPage(vnode, parentContext);
  }
  
  if (callback) {
    callback();
  }

  return Page(root);
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

function mountPage (vnode, parentContext) {
  const { type, props, children, host } = vnode;
  const newProp = Object.assign({}, props);
  
  newProp.children = children && children.length > 0 ? 
    children : null;

  const instance = new type(newProp, parentContext);

  __view_page__ = instance;

  vnode.instance = instance;  

  instance.props          = newProp;
  instance.context        = parentContext;
  instance.__view_page__  = __view_page__;

  const rendered = renderComponent(instance);

  instance.vnode = rendered;

  const vdom = mountElement(instance.vnode, parentContext);

  return instance || vdom;
}

function mountComponent (vnode, parentContext) {
  const { type, props, children, host } = vnode;
  const newProp = Object.assign({}, props);
  
  newProp.children = children && children.length > 0 ? 
    children : null;

  const instance = new type(newProp, parentContext);
  vnode.instance = instance;

  instance.props          = newProp;
  instance.context        = parentContext;
  instance.__view_page__  = __view_page__;

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