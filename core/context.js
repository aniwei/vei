export default class Context {
  constructor (ctx) {
    this.parent   = null;
    this.children = [];
    this.context  = ctx || {};
  }

  link (ctx) {
    if (ctx instanceof Context) {
      this.children.push(ctx);

      ctx.parent  = this;
    }
  }

  contextForTypes (contextTypes) {
    const keys = Object.getOwnPropertyNames(contextTypes || {});

    return this.get(keys);
  }

  get (keys) {
    const context = {};

    if (!Array.isArray(keys)) {
      keys = [keys];
    }

    keys.forEach((key) => {
      context[key] = this.one(key);
    });

    return context;
  } 

  one (name) {
    let node = this;

    while (node) {
      const value = this.context[name];

      if (name in this.context) {
        return value;
      }

      node = node.parent;
    }
  }

  top () {
    let node = this;

    while (node.parent) {
      node = node.parent ;
    }

    return node;
  }

  search (name) {
    let context = {};

    if (name in this.context) {
      context[name] = this.context[name];

      return context;
    }

    this.children.some((child) => {
      return context = child.search(name);      
    });

    return context
  }
}
