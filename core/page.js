import View from './view';

export default class Page extends View  {
  constructor (props, context) {   
    super(props, context);

    this.props    = props   || {};
    this.context  = context || {};

    this.__view_type__ = 'page';

    defineStateProperty(this);
    bindingThisPrototype(this);
  }

  setState (state) {
    this.setData(state);
  }

  onLoad () {}

  onShow () {}
 }



function defineProperty (dist, property, descriptor) {
  Object.defineProperty(dist, property, descriptor);
}

function defineStateProperty (dist) {
  defineProperty(dist, 'state', {
    set (state) { this.data = state},
    get () { return this.data }
  })
}

function bindingThisPrototype (dist) {
  const proto = dist.constructor.prototype;
  const onLoad = dist.onLoad;

  defineProperty(dist, 'onLoad', {
    get () {
      const name = '__proto__';

      return function () {
        const object = bindingPrototype(this);
        
        object[name] = proto;

        onLoad.apply(this, arguments);
      }
    }
  })
}

function bindingPrototype (object) {
  var proto       = object;
  var ObjectProto = Object.prototype;

  while (true) {
    if (proto.__proto__ === ObjectProto) {
      return proto;
    }

    proto = proto.__proto__;
  }
}