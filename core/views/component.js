import View from './view';
import PropTypes from '../proptypes';


export default class Component extends View {
  static contextTypes = {
    __view_this__: PropTypes.object
  };

  constructor (props, context) {
    super(props, context);

    this.props    = props;
    this.context  = context;

    if (!props) {
      throw new Error('Component Constructor:props may be undefined or null');
    }

    this.__view_id__        = props.__viewid__;
    this.__view_type__      = 'component';

    this.__binding_view_methods__();
  }

  __binding_view_methods__ () {
    Object.defineProperty(this, '__view_methods__', {
      set (methods) {
        const { __view_this__ } = this.context;
        const viewid = this.__view_id__;

        // if (__view_this__.__already_binding_view__.indexOf(this.__view_id__) === -1) {
          __view_this__.__already_binding_view__.push(viewid);

          this.__binding_method__(methods); 
        // }
      }
    });
  }

  __binding_method__ (methods = []) {
    const { __view_this__ } = this.context;
    const viewid = this.__view_id__;

    methods.forEach((name) => {
      const method = this[name] || function () {};

      __view_this__[`${viewid}.${name}`] = (...args) => {
        method.apply(this, args);
      }
    });
  }
}
