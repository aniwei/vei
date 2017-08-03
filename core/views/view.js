import PropTypes from '../proptypes';

export default class View {
  static contextTypes = {
    __view_this__: PropTypes.object
  };

  constructor (props, context) {
    this.props    = props;
    this.context  = context;

    if (!props) {
      throw new Error('View Constructor:props may be undefined or null');
    }

    this.__view_id__        = props.__viewid__;
    this.__view_type__      = 'view';
  }
}
