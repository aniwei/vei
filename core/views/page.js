import View from './view';
import PropTypes from '../proptypes';

export default class Page extends View  {
  constructor (props, context) {   
    super(props, context);

    this.props    = props;
    this.context  = context;

    this.__view_type__ = 'page';

    this.__binding_this__();
    this.__binding_context__();
    this.__binding_view_methods__();
    this.__binding_data__();
    this.__already_binding_view__ = [];
    this.__already_binding_this__ = null;
  }

  getChildContext () {
    return {
      __view_this__: this
    }
  }

  setState (state, callback) {
    this.state = Object.assign(this.state, state);

    if (typeof callback === 'function') {
      callback();
    }
  }

  __binding_data__ () {
    Object.defineProperty(this, 'state', {
      set (state) {
        this.data = Object.assign(state, {
          __viewid__: this.props.__viewid__
        });

        if (this.setData) {
          this.setData(this.data);
        }
      },

      get () {
        return this.data;
      }
    });
  }

  __binding_context__ () {
    Object.defineProperty(this, 'getChildContext', {
      get () {
        const { getChildContext } = this.constructor.prototype;

        if (getChildContext) {
          return (...args) => {
            const context = getChildContext.apply(this, args);

            return Object.assign(context, {
              __view_this__: this
            });
          }
        }
      }
    })
  }

  __binding_this__ () {
    const onLoad = this.onLoad;
    const prototype = this;
    let others;

    Object.defineProperty(this, 'onLoad', {
      get () {

        return function (...args) {
          
          const proto = getEndPrototype(this);
          const string = '__proto__';

          if (!inPrototype(this, prototype)) {
            proto[string] = prototype;
          }

          if (!this.state) {
            this.__binding_data__();
          }

          onLoad.apply(this, args);

          if (others) {
            others.apply(this, args);
          }
        }
      },

      set (onLoad) {
        others = onLoad;
      }
    });

    const getEndPrototype = (proto) => {
      var endProto = Object.prototype;

      while (true) {
        if (proto.__proto__ === endProto) {
          return proto;
        }

        proto = proto.__proto__;
      }
    }

    const inPrototype = (proto, dist) => {
      while (proto.__proto__) {
        if (proto === dist) {
          return true;
        }

        proto = proto.__proto__;
      }
    }
  }

  __binding_view_methods__ () {
    Object.defineProperty(this, '__view_methods__', {
      set (methods) {
        const viewid = this.__view_id__;

        // if (this.__already_binding_view__.indexOf(this.__view_id__) === -1) {
          // this.__already_binding_view__.push(viewid);

          this.__binding_method__(methods); 
        // }
      }
    });
  }

  __binding_method__ (methods = []) {
    const viewid = this.__view_id__;

    methods.forEach((name) => {
      const method = this[name] || function () {};

      this[`${viewid}.${name}`] = (...args) => {
        method.apply(this, args);
      }
    });
  }
 }


