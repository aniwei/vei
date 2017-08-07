export default class Context {
  constructor (context = {}) {
    this.parent   = null;
    this.context  = context;
    this.children = [];
  }

  relative (context) {
    if (context) {
      const child = new Context(context);
      
      this.children.push(child);

      child.parent = this;
    }
  }
  
  contextForNames (names) {
    const context = {};
    names = Array.isArray(names) ? names : [names];

    names.forEach((object) => {
      const name  = object.name;
      const value = this.contextForName(name);

      object.propType(name, value);

      if (!(value === undefined)) {
        context[name] = value;
      }
    });

    return context;
  } 

  contextForName (name) {
    let node = this;

    while (node) {
      const value = this.context[name];

      if (name in this.context) {
        return value;
      }

      node = node.parent;
    }
  }
}
