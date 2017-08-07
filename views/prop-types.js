const toString = Object.prototype.toString;
const types = {
  '[object Object]': 'object',
  '[object Array]': 'array',
  '[object Boolean]': 'bool',
  '[object Function]': 'func',
  '[object String]': 'string',
  '[object number]': 'number'
}

function typeOf (object) {
  const type = toString.call(object);

  return types[type];
}

const propTypes = {};

[
  'bool',
  'number',
  'func',
  'object',
  'array',
  'string'
].forEach(type => {
  propTypes[type] = function (name, object) {
    const t     = typeOf(object);
    const value = t === type;
    
    if (!value) {
      console.error(`${name} is expected type is bool, but gets the ${t}`);
    }

    return value;
  }

});

export default propTypes;