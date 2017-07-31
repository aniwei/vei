export default class View {
  constructor (props, context) {
    this.props    = props;
    this.context  = context;

    defineViewPageProperty(this);
  }
}

function defineViewPageProperty (dist) {
  defineProperty(dist, '__view_page__', {
    get () {
      return this.__view_page_this__;
    },

    set (viewPage) {
      const methods = this.__view_events_methods__ || [];
      const classid = this.__view_classid__;

      this.__view_page_this__ = viewPage;

      if (methods.length > 0) {
        methods.forEach((name) => {
          const method = (this[name] || function () {}).bind(this);

          this.__view_page_this__[`${classid}.${name}`] = function (...args) {
            method(...args);
          }
        });
      }
    }
  })
}

function defineProperty (dist, property, descriptor) {
  Object.defineProperty(dist, property, descriptor);
}