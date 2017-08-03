
export default function (actionsCreators) {
  return dispatch => {
    const creators = {};

    if (typeof actionsCreators === 'function') {
      return (...args) => dispatch(actionsCreators.apply(null, args));
    }

    Object.getOwnPropertyNames(actionCreators).forEach((key) => {
      const actionCreator = actionsCreators[key];

      if (typeof actionCreator === 'function') {
        creators[key] = (...args) => dispatch(actionCreator.apply(null, args));
      }
    });

    return creators;
  }
}
