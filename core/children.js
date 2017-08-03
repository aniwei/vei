import VeiDOM from 'vei-vdom';

const { VirtualBox } = VeiDOM;

export default {
  only (children) {
    children = children || [];

    if (children.length === 1) {
      return new VirtualBox(children);
    }
  }
}