import PropTypes from '../proptypes';
import View from '../views/view';
import createElement from '../create-element';
import render from '../render';

import actionCreators from './action-creators';
import update from '../update';

export default function connect (mapStateToProps, mapDispatchToProps) {
  let mapDispatch;
  
  const mapState = mapStateToProps || function () { return {} };

  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps;
  }

  mapDispatch = mapDispatch || function () { return {} };

  if (typeof mapDispatchToProps === 'object') {
    mapDispatch = actionCreators(mapDispatchToProps);
  }

  return function (PageView) {
    class Connect extends View {
      static contextTypes = {
        store: PropTypes.object
      }

      constructor (props, context) {
        super(props, context);
      }

      onSubscribe (__view_this__) {
        const { store } = this.context;
        const state = mapState(store.getState() || {}, this.props);
        const dispatch = mapDispatch(store.dispatch);
        const newState = Object.assign(state, dispatch);

        __view_this__.setState(newState, () => {
          Object.assign(__view_this__.props, newState);
          
          render(__view_this__.render(), {
            forceRegiste: false
          });
        });
      }

      onLoad (__view_this__) {
        const { store } = this.context;

        if (!store || !store.getState) {
          throw new Error('There is not a store object!');
        }

        store.subscribe(() => {
          this.onSubscribe(__view_this__);
        });

        this.onSubscribe(__view_this__);
      }

      render () {
        const { store } = this.context;
        const state = store.getState();

        return (
          <PageView {...state} onLoad={this.onLoad.bind(this)} />
        );
      }
    }

    const originalOnLoad = PageView.prototype.onLoad;
    const originalUnOnLoad = PageView.prototype.unOnLoad;

    PageView.prototype.onLoad = function (...args) {
      const { onLoad } = this.props;

      onLoad(this);
      originalOnLoad.apply(this, ...args);
    }

    PageView.prototype.onUnLoad = function (...args) {
      const { onUnLoad } = this.props;

      onUnLoad(this);
      originalOnUnLoad.apply(this, ...args);
    }

    return Connect;
  }
}