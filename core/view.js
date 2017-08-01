

export default class View {
  constructor (props, context) {
    this.props    = props;
    this.context  = context;

    this.__view_type__ = 'view';

    defineViewIdPorperty(this);
    defineViewPageProperty(this);
  }
}

function defineViewIdPorperty (dist) {
  defineProperty(dist, '__viewid__', {
    get () {
      return this.__view_id__;
    },

    set (id) {
      this.__view_id__ = id;
    }
  });
}

function defineViewPageProperty (dist) {
  defineProperty(dist, '__view_page__', {
    get () {
      return this.__view_page_this__;
    },

    set (viewPage) {
      const methods = this.__view_events_methods__ || [];
      const classid = this.__view_classid__;
      const viewid  = this.__viewid__;

      this.__view_page_this__ = viewPage;

      if (methods.length > 0) {
        methods.forEach((name) => {
          const method = (this[name] || function () {}).bind(this);

          this.__view_page_this__[`${classid}.${viewid}.${name}`] = function (...args) {
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