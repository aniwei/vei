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

export default {
  bool:   (object) => typeOf(object) === 'bool',
  number: (object) => typeOf(object) === 'number',
  func:   (object) => typeOf(object) === 'func',
  object: (object) => typeOf(object) === 'object',
  array:  (object) => typeOf(object) === 'array',
  string: (object) => typeOf(object) === 'string',
  any:    () => true
};
