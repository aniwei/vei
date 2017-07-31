/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function VirtualText(text) {
  this.type = '#text';
  this.text = text;
  this.vtype = 11;
}

VirtualText.prototype = {
  stringify: function stringify() {
    var text = this.text.trim();

    return text ? this.text : text;
  }
};

module.exports = VirtualText;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = exports.render = exports.View = exports.Page = undefined;

var _core = __webpack_require__(2);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = exports.Page = _core2.default.Page;
var View = exports.View = _core2.default.View;
var render = exports.render = _core2.default.render;
var createElement = exports.createElement = _core2.default.createElement;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _page = __webpack_require__(3);

var _page2 = _interopRequireDefault(_page);

var _view = __webpack_require__(4);

var _view2 = _interopRequireDefault(_view);

var _render = __webpack_require__(5);

var _render2 = _interopRequireDefault(_render);

var _createElement = __webpack_require__(6);

var _createElement2 = _interopRequireDefault(_createElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  View: _view2.default,
  Page: _page2.default,
  render: _render2.default,
  createElement: _createElement2.default
};
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = function () {
  function Page(props, context) {
    _classCallCheck(this, Page);

    this.props = props || {};
    this.context = context || {};

    // 语法糖
    defineStateProperty(this);
    bindingThisPrototype(this);
  }

  _createClass(Page, [{
    key: 'setState',
    value: function setState(state) {
      this.setDate(state);
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Page;
}();

exports.default = Page;


function defineProperty(dist, property, descriptor) {
  Object.defineProperty(dist, property, descriptor);
}

function defineStateProperty(dist) {
  defineProperty(dist, 'state', {
    set: function set(state) {
      this.data = state;
    },
    get: function get() {
      return this.data;
    }
  });
}

function bindingThisPrototype(dist) {
  var proto = dist.constructor.prototype;
  var onLoad = dist.onLoad;

  defineProperty(dist, 'onLoad', {
    get: function get() {
      var name = '__proto__';

      return function () {
        var object = bindingPrototype(this);

        object[name] = proto;

        onLoad.apply(this, arguments);
      };
    }
  });
}

function bindingPrototype(object) {
  var proto = object;
  var ObjectProto = Object.prototype;

  while (true) {
    if (proto.__proto__ === ObjectProto) {
      return proto;
    }

    proto = proto.__proto__;
  }
}
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function View(props, context) {
  _classCallCheck(this, View);

  this.props = props;
  this.context = context;

  defineViewPageProperty(this);
};

exports.default = View;


function defineViewPageProperty(dist) {
  defineProperty(dist, '__view_page__', {
    get: function get() {
      return this.__view_page_this__;
    },
    set: function set(viewPage) {
      var _this = this;

      var methods = this.__view_events_methods__ || [];
      var classid = this.__view_classid__;

      this.__view_page_this__ = viewPage;

      if (methods.length > 0) {
        methods.forEach(function (name) {
          var method = (_this[name] || function () {}).bind(_this);

          _this.__view_page_this__[classid + '.' + name] = function () {
            method.apply(undefined, arguments);
          };
        });
      }
    }
  });
}

function defineProperty(dist, property, descriptor) {
  Object.defineProperty(dist, property, descriptor);
}
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = render;
function render(vnode, options, callback) {
  var parentContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var prev = vnode._component;
  var root = void 0;

  if (!prev) {
    root = mountVnode(vnode, parentContext);
  }

  if (callback) {
    callback();
  }

  return Page(root);
}

function mountVnode(vnode, parentContext) {
  var vtype = vnode.vtype;


  switch (vtype) {
    case 1:
      return mountElement(vnode, parentContext);
    case 2:
      return mountComponent(vnode, parentContext);
    default:
      return mountElement(vnode);
  }
}

function mountElement(vnode, parentContext) {
  var children = vnode.children;


  if (children) {
    vnode.children = children.map(function (child) {
      return mountVnode(child, parentContext);
    });
  }

  return vnode;
}

function mountComponent(vnode, parentContext) {
  var type = vnode.type,
      props = vnode.props,
      children = vnode.children,
      host = vnode.host;

  var newProp = _extends({}, props);

  newProp.children = children && children.length > 0 ? children : null;

  var instance = new type(newProp, parentContext);
  vnode.instance = instance;

  instance.props = newProp;
  instance.context = parentContext;
  instance.__view_page__ = host;

  var rendered = renderComponent(instance);

  instance.vnode = rendered;

  var vdom = mountElement(instance.vnode, parentContext);

  return instance || vdom;
}

function renderComponent(instance) {
  var vnode = instance.render();

  if (!vnode || !vnode.vtype) {
    throw new Error("@" + type.name + "#render:You may have returned undefined, an array or some other invalid object");
  }

  return vnode;
}
module.exports = exports["default"];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createElement;

var _veiVdom = __webpack_require__(7);

function createElement(type, props, children, host) {
  // 2 为自定义vnode  
  var vtype = type.prototype && type.prototype.render ? 2 : 1;

  switch (type) {
    case '#text':
      return new _veiVdom.VirtualText(type, props, 3);

    default:
      return new _veiVdom.VirtualNode(type, props, children, vtype, host);
  }
}
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  VirtualNode: __webpack_require__(8),
  VirtualText: __webpack_require__(0),
  VirtualJSX: __webpack_require__(11),
  VirtualProp: __webpack_require__(12)
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var kebaCase = __webpack_require__(9);
//var encode      = require('he').encode;
var VirtualText = __webpack_require__(0);

var toString = Object.prototype.toString;

// vtype: 2 - defined, 3 - text, 1 - JSXExpression

function VirtualNode(type, props, children, vtype, host) {
  var _this = this;

  this.type = type;
  this.props = props;
  this.vtype = vtype;
  this.host = host;

  if (this.vtype === 2) {
    this.type.toString = function () {
      return _this.type.name;
    };
  }

  if (!children) {
    children = [];

    if (props.children) {
      children.push(props.children);
    }
  }

  this.children = flattenChildren(children);
}

VirtualNode.prototype = {
  stringify: function stringify(parent) {
    var node = this;
    if (node === undefined) {
      return '';
    }

    var attributes = [];
    var html = [];
    var children = node.children;

    var toStyle = function toStyle(style) {
      var css = [];

      for (var key in style) {
        css.push(kebaCase(key) + ': ' + sytle[key] + ';');
      }

      return css.join('');
    };

    if (node instanceof VirtualNode) {
      var props = node.props;

      html.push('<' + node.type);

      for (var key in props) {
        var prop = key;
        var value = props[prop];
        var onlyProp = value === true || value === 'true';
        var attribute = void 0;
        var type = void 0;

        type = onlyProp ? prop : 'prop';

        key = wechatAttributes[key] || kebaCase(key);

        switch (key) {
          case 'style':
            attribute = 'style="' + toStyle(value) + '"';
            break;
          case 'prop':
            attribute = props;
            break;
          default:
            if (!(typeof value === 'function')) {
              attribute = prop + '="' + (value ? value : value) + '"';
            }
        }

        attributes.push(attribute);
      }

      if (attributes.length > 0) {
        html.push(' ' + attributes.join(' '));
      }

      if (closeElement.indexOf(node.type) > -1) {
        html.push(' />');
      } else {
        html.push('>');

        if (children && children.length > 0) {
          children.forEach(function (child) {
            html.push(child.stringify(node));
          });
        }

        html.push('</' + node.type + '>');
      }
    }

    return html.join('');
  },

  flatten: function flatten() {
    var list = [this];

    if (this.children.length > 0) {
      this.children.forEach(function (child) {
        if (child.vtype > 2) {
          return list.push(child);
        }

        var flat = child.flatten();

        list = list.concat(flat);
      });
    }

    return list;
  },

  map: function map(callback) {
    var flat;

    if (typeof callback === 'function') {
      flat = this.flatten();

      return flat.map(callback);
    }
  },

  forEach: function forEach(callback) {
    this.map(callback);
  },

  everyProperty: function everyProperty(callback) {
    var keys;
    var props = this.props;

    if (typeof callback === 'function') {
      if (props) {
        keys = Object.keys(props);

        keys.forEach(function (key) {
          callback(key, props[key], props);
        });
      }
    }
  },

  allProperties: function allProperties() {
    var keys;
    var props = this.props || {};

    if (props) {
      keys = Object.keys(props);

      return keys.map(function (key) {
        return {
          key: key,
          value: props[key]
        };
      });
    }
  }
};

module.exports = VirtualNode;

var flattenChildren = function flattenChildren(list) {
  var child = void 0;
  var children = [];

  while (list.length) {
    child = list.pop();

    if (typeOf(child) === 7) {
      child.forEach(function (c) {
        return list.push(c);
      });
    } else {
      var childType = typeOf(child);

      if (childType < 3) {
        continue;
      }

      // number string symbol
      if (childType < 6) {
        child = new VirtualText(child);
      }

      children.unshift(child);
    }
  }

  return children;
};

var typeOf = function typeOf(object) {
  var undefined = void 0;

  if (object === undefined) {
    return 0;
  }

  return types[toString.call(object)] || 8;
};

var closeElement = ['icon', 'progress', 'checkbox', 'input', 'radio', 'switch', 'textarea'];

var wechatAttributes = {
  'class': 'class',
  'className': 'class',
  'activeColor': 'activeColor',
  'backgroundColor': 'backgroundColor'
};

var types = {
  '[object Null]': 1,
  '[object Boolean]': 2,
  '[object Number]': 3,
  '[object String]': 4,
  '[object Symbol]': 5,
  '[object Function]': 6,
  '[object Array]': 7
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = '[\'\u2019]',
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')', rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr, rsUpper + '+' + rsOptUpperContr, rsDigits, rsEmoji].join('|'), 'g');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A', '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a', '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C', '\xe7': 'c',
  '\xd0': 'D', '\xf0': 'd',
  '\xc8': 'E', '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e', '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I', '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i', '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N', '\xf1': 'n',
  '\xd2': 'O', '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o', '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U', '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u', '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y', '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A', '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a', '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C', '\u0108': 'C', '\u010A': 'C', '\u010C': 'C',
  '\u0107': 'c', '\u0109': 'c', '\u010B': 'c', '\u010D': 'c',
  '\u010E': 'D', '\u0110': 'D', '\u010F': 'd', '\u0111': 'd',
  '\u0112': 'E', '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011A': 'E',
  '\u0113': 'e', '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011B': 'e',
  '\u011C': 'G', '\u011E': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011D': 'g', '\u011F': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H', '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I', '\u012A': 'I', '\u012C': 'I', '\u012E': 'I', '\u0130': 'I',
  '\u0129': 'i', '\u012B': 'i', '\u012D': 'i', '\u012F': 'i', '\u0131': 'i',
  '\u0134': 'J', '\u0135': 'j',
  '\u0136': 'K', '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L', '\u013B': 'L', '\u013D': 'L', '\u013F': 'L', '\u0141': 'L',
  '\u013A': 'l', '\u013C': 'l', '\u013E': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N', '\u0145': 'N', '\u0147': 'N', '\u014A': 'N',
  '\u0144': 'n', '\u0146': 'n', '\u0148': 'n', '\u014B': 'n',
  '\u014C': 'O', '\u014E': 'O', '\u0150': 'O',
  '\u014D': 'o', '\u014F': 'o', '\u0151': 'o',
  '\u0154': 'R', '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r', '\u0157': 'r', '\u0159': 'r',
  '\u015A': 'S', '\u015C': 'S', '\u015E': 'S', '\u0160': 'S',
  '\u015B': 's', '\u015D': 's', '\u015F': 's', '\u0161': 's',
  '\u0162': 'T', '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't', '\u0165': 't', '\u0167': 't',
  '\u0168': 'U', '\u016A': 'U', '\u016C': 'U', '\u016E': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u', '\u016B': 'u', '\u016D': 'u', '\u016F': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W', '\u0175': 'w',
  '\u0176': 'Y', '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z', '\u017B': 'Z', '\u017D': 'Z',
  '\u017A': 'z', '\u017C': 'z', '\u017E': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017F': 'ss'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var _Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function (string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function (result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = kebabCase;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function VirtualJSX(identifier) {
  this.type = '#jsx';
  this.identifier = identifier;
  this.vtype = 12;
}

VirtualJSX.prototype = {
  stringify: function stringify() {
    var identifier = this.identifier.trim();

    return identifier ? '{{ ' + identifier + ' }}' : identifier;
  }
};

module.exports = VirtualJSX;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function VirtualProp(name, value) {
  this.type = '#prop';
  this.name = name;
  this.value = value;
  this.vtype = 20;
}

VirtualProp.prototype = {
  stringify: function stringify() {
    var value = this.value;

    switch (value.type) {
      case 'literal':
        return value.value;

      case 'identifier':
        return '{{ ' + value.value + ' }}';
    }
  }
};

module.exports = VirtualProp;

/***/ })
/******/ ]);