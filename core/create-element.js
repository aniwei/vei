import { VirtualNode, VirtualText } from 'vei-vdom';

export default function createElement(type, props, children, host) {
  // 2 为自定义vnode  
  const vtype = type.prototype && 
                type.prototype.render ? 2 : 1;

  switch (type) {
    case '#text':
      return new VirtualText(type, props, 3);
    
    default:
      return new VirtualNode(type, props, children, vtype, host);
  }
}