
export default class Component {
  constructor (type, props) {
    this.type     = type;
    this.props    = props;  
    this.parent   = null;
    this.children = [];
  }
}