import Children from '../children';

export default class Provider {
  constructor (props, context) {
    this.props = props;
    this.context = context;
  }

  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return Children.only(this.props.children)
  }
}