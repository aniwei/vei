import Context from './context';

let context = new Context();

export default function render(vnode, options = {
  forceRegiste: true
}, callback) {  
  let root = mountVnode(vnode, context);
  
  if (options.forceRegiste) {
    const ctx = context.top().search('__view_this__');

    if ('__view_this__' in ctx) {
      Page(ctx.__view_this__);
    } else {
      throw new Error(`There is no Page registed!`);
    }
  }

  if (callback) {
    callback();
  }

  return root;
}

function mountVnode(vnode, ctx) {
  let { vtype } = vnode;

  switch (vtype) {
    case 1:
      return mountElement(vnode, ctx);
    case 2:
      return mountComponent(vnode, ctx);
    default:
      return mountElement(vnode, ctx); 
  }
} 


function mountElement (vnode, ctx) {
  const { children } = vnode;

  if (children) {
    vnode.children = children.map((child) => {
      return mountVnode(child, context);
    }).filter((child) => child);
  }

  return vnode;
}

function mountContext (inst, context) {
  let ctx;

  if (inst.getChildContext) {
    ctx = new Context(inst.getChildContext())

    if (ctx) {
      context.link(ctx);
      context = ctx;
    }
  }

  return context;
}

function mountComponent (vnode, ctx) {
  const { type, props, children, host } = vnode;
  const newProp = Object.assign({}, props);
  
  if (children) {
    newProp.children = children;
  } else {
    newProp.children = null;
  }


  const inst = new type(
    newProp, 
    context.contextForTypes(type.contextTypes)
  );
  
  vnode.instance = inst;
  context = mountContext(inst, ctx);

  const rendered = renderComponent(inst);

  inst.vnode = rendered;

  const vdom = mountVnode(inst.vnode, context);

  return inst;
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
