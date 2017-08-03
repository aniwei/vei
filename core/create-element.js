import { VirtualNode, VirtualText } from 'vei-vdom';

export default function createElement(type, props, children, host) {
  // 2 为自定义vnode  
  const vtype = typeof type === 'function' ? 2 : 1;

  switch (type) {
    case '#text':
      return new VirtualText('#text', props);
    
    default:
      return new VirtualNode(type, props, children, vtype, host);
  }
}