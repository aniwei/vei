import JSXContainer from './jsx-container';

function only (children) {
  return new JSXContainer(null, children);
}

export default {
  only
}