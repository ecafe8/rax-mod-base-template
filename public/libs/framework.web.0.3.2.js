
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
  /******/ 	// identity function for calling harmony imports with the correct context
  /******/ 	__webpack_require__.i = function(value) { return value; };
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
  /******/ 	return __webpack_require__(__webpack_require__.s = 53);
  /******/ })
/************************************************************************/
/******/ ([
  /* 0 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /*
     * Stateful things in runtime
     */
    exports.default = {
      component: null,
      mountID: 1,
      sandbox: true,
      // Roots
      rootComponents: {},
      rootInstances: {},
      // Inject
      hook: null,
      driver: null,
      monitor: null
    };
    module.exports = exports["default"];

    /***/ }),
  /* 1 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    var _element = __webpack_require__(8);

    var _unmountComponentAtNode = __webpack_require__(11);

    var _unmountComponentAtNode2 = _interopRequireDefault(_unmountComponentAtNode);

    var _instantiateComponent = __webpack_require__(2);

    var _instantiateComponent2 = _interopRequireDefault(_instantiateComponent);

    var _shouldUpdateComponent = __webpack_require__(4);

    var _shouldUpdateComponent2 = _interopRequireDefault(_shouldUpdateComponent);

    var _root = __webpack_require__(38);

    var _root2 = _interopRequireDefault(_root);

    var _universalEnv = __webpack_require__(6);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }return arr2;
      } else {
        return Array.from(arr);
      }
    }

    /**
     * Instance manager
     */
    var KEY = '$$instance';

    exports.default = {
      set: function set(node, instance) {
        if (!node[KEY]) {
          node[KEY] = instance;
          // Record root instance to roots map
          if (instance.rootID) {
            _host2.default.rootInstances[instance.rootID] = instance;
            _host2.default.rootComponents[instance.rootID] = instance._internal;
          }
        }
      },
      get: function get(node) {
        return node[KEY];
      },
      remove: function remove(node) {
        var instance = this.get(node);
        if (instance) {
          node[KEY] = null;
          if (instance.rootID) {
            delete _host2.default.rootComponents[instance.rootID];
            delete _host2.default.rootInstances[instance.rootID];
          }
        }
      },
      render: function render(element, container) {
        if (false) {
          _host2.default.measurer && _host2.default.measurer.beforeRender();
        }

        // Before render callback
        _host2.default.driver.beforeRender && _host2.default.driver.beforeRender();

        // Real native root node is body
        if (container == null) {
          container = _host2.default.driver.createBody();
        }

        var prevRootInstance = this.get(container);
        var hasPrevRootInstance = prevRootInstance && prevRootInstance.isRootComponent;

        if (hasPrevRootInstance) {
          var prevRenderedComponent = prevRootInstance.getRenderedComponent();
          var prevElement = prevRenderedComponent._currentElement;
          if ((0, _shouldUpdateComponent2.default)(prevElement, element)) {
            var prevUnmaskedContext = prevRenderedComponent._context;
            prevRenderedComponent.updateComponent(prevElement, element, prevUnmaskedContext, prevUnmaskedContext);

            return prevRootInstance;
          } else {
            _host2.default.hook.Reconciler.unmountComponent(prevRootInstance);
            (0, _unmountComponentAtNode2.default)(container);
          }
        }

        // Handle server rendered element
        if (_universalEnv.isWeb && container.childNodes) {
          // Clone childNodes, Because removeChild will causing change in childNodes length
          var childNodes = [].concat(_toConsumableArray(container.childNodes));

          for (var i = 0; i < childNodes.length; i++) {
            var rootChildNode = childNodes[i];
            if (rootChildNode.hasAttribute && rootChildNode.hasAttribute('data-rendered')) {
              _host2.default.driver.removeChild(rootChildNode, container);
            }
          }
        }

        var wrappedElement = (0, _element.createElement)(_root2.default, null, element);
        var renderedComponent = (0, _instantiateComponent2.default)(wrappedElement);
        var defaultContext = {};
        var rootInstance = renderedComponent.mountComponent(container, defaultContext);
        this.set(container, rootInstance);

        // After render callback
        _host2.default.driver.afterRender && _host2.default.driver.afterRender(rootInstance);

        // Devtool render new root hook
        _host2.default.hook.Mount._renderNewRootComponent(rootInstance._internal);

        if (false) {
          _host2.default.measurer && _host2.default.measurer.afterRender();
        }

        return rootInstance;
      }
    };
    module.exports = exports['default'];

    /***/ }),
  /* 2 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function instantiateComponent(element) {
      var instance = void 0;

      if (element === undefined || element === null || element === false || element === true) {
        instance = new _host2.default.EmptyComponent();
      } else if (Array.isArray(element)) {
        instance = new _host2.default.FragmentComponent(element);
      } else if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element.type) {
        // Special case string values
        if (typeof element.type === 'string') {
          instance = new _host2.default.NativeComponent(element);
        } else {
          instance = new _host2.default.CompositeComponent(element);
        }
      } else if (typeof element === 'string' || typeof element === 'number') {
        instance = new _host2.default.TextComponent(element);
      } else {
        throw Error('Invalid element type ' + JSON.stringify(element));
      }

      instance._mountIndex = 0;

      return instance;
    }

    exports.default = instantiateComponent;
    module.exports = exports['default'];

    /***/ }),
  /* 3 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    /**
     * Base component class.
     */
    var Component = function () {
      function Component(props, context, updater) {
        _classCallCheck(this, Component);

        this.props = props;
        this.context = context;
        this.refs = {};
        this.updater = updater;
      }

      _createClass(Component, [{
        key: "isComponentClass",
        value: function isComponentClass() {}
      }, {
        key: "setState",
        value: function setState(partialState, callback) {
          this.updater.setState(this, partialState, callback);
        }
      }, {
        key: "forceUpdate",
        value: function forceUpdate(callback) {
          this.updater.forceUpdate(this, callback);
        }
      }]);

      return Component;
    }();

    exports.default = Component;
    module.exports = exports["default"];

    /***/ }),
  /* 4 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    function shouldUpdateComponent(prevElement, nextElement) {
      // TODO: prevElement and nextElement could be array
      var prevEmpty = prevElement === null;
      var nextEmpty = nextElement === null;
      if (prevEmpty || nextEmpty) {
        return prevEmpty === nextEmpty;
      }

      var prevType = typeof prevElement === 'undefined' ? 'undefined' : _typeof(prevElement);
      var nextType = typeof nextElement === 'undefined' ? 'undefined' : _typeof(nextElement);
      if (prevType === 'string' || prevType === 'number') {
        return nextType === 'string' || nextType === 'number';
      } else {
        return prevType === 'object' && nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
      }
    }

    exports.default = shouldUpdateComponent;
    module.exports = exports['default'];

    /***/ }),
  /* 5 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    /* eslint no-extend-native: "off", new-cap: "off" */

    var defineProperties = Object.defineProperties,
      defineProperty = Object.defineProperty,
      SymbolPolyfill,
      HiddenSymbol,
      globalSymbols = Object.create(null);

    function isSymbol(x) {
      if (!x) return false;
      if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'symbol') return true;
      if (!x.constructor) return false;
      if (x.constructor.name !== 'Symbol') return false;
      return x[x.constructor.toStringTag] === 'Symbol';
    }

    function validateSymbol(value) {
      if (!isSymbol(value)) throw new TypeError(value + ' is not a symbol');
      return value;
    }

    var generateName = function () {
      var created = Object.create(null);
      return function (desc) {
        var postfix = 0,
          name;
        while (created[desc + (postfix || '')]) {
          ++postfix;
        }desc += postfix || '';
        created[desc] = true;
        name = '@@' + desc;
        return name;
      };
    }();

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
    HiddenSymbol = function _Symbol(description) {
      if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
      return SymbolPolyfill(description);
    };

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
    module.exports = SymbolPolyfill = function _Symbol2(description) {
      var symbol;
      if (this instanceof _Symbol2) throw new TypeError('Symbol is not a constructor');
      symbol = Object.create(HiddenSymbol.prototype);
      description = description === undefined ? '' : String(description);
      return defineProperties(symbol, {
        __description__: { value: description },
        __name__: { value: generateName(description) }
      });
    };
    defineProperties(SymbolPolyfill, {
      for: { value: function value(key) {
        if (globalSymbols[key]) return globalSymbols[key];
        return globalSymbols[key] = SymbolPolyfill(String(key));
      } },
      keyFor: { value: function value(s) {
        var key;
        validateSymbol(s);
        for (key in globalSymbols) {
          if (globalSymbols[key] === s) return key;
        }
      } },

      // To ensure proper interoperability with other native functions (e.g. Array.from)
      // fallback to eventual native implementation of given symbol
      hasInstance: { value: SymbolPolyfill('hasInstance') },
      isConcatSpreadable: { value: SymbolPolyfill('isConcatSpreadable') },
      iterator: { value: SymbolPolyfill('iterator') },
      match: { value: SymbolPolyfill('match') },
      replace: { value: SymbolPolyfill('replace') },
      search: { value: SymbolPolyfill('search') },
      species: { value: SymbolPolyfill('species') },
      split: { value: SymbolPolyfill('split') },
      toPrimitive: { value: SymbolPolyfill('toPrimitive') },
      toStringTag: { value: SymbolPolyfill('toStringTag') },
      unscopables: { value: SymbolPolyfill('unscopables') }
    });

// Internal tweaks for real symbol producer
    defineProperties(HiddenSymbol.prototype, {
      constructor: { value: SymbolPolyfill },
      toString: { value: function value() {
        return this.__name__;
      } }
    });

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
    defineProperties(SymbolPolyfill.prototype, {
      toString: { value: function value() {
        return 'Symbol (' + validateSymbol(this).__description__ + ')';
      } },
      valueOf: { value: function value() {
        return validateSymbol(this);
      } }
    });

    defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, {
      value: function value() {
        var symbol = validateSymbol(this);
        if ((typeof symbol === 'undefined' ? 'undefined' : _typeof(symbol)) === 'symbol') return symbol;
        return symbol.toString();
      }
    });
    defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, { value: 'Symbol' });

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
    defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag, { value: SymbolPolyfill.prototype[SymbolPolyfill.toStringTag] });

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
    defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive, { value: SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive] });

    /***/ }),
  /* 6 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

// https://www.w3.org/TR/html5/webappapis.html#dom-navigator-appcodename
    var isWeb = exports.isWeb = (typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) === 'object' && (navigator.appCodeName === 'Mozilla' || navigator.product === 'Gecko');
    var isNode = exports.isNode = typeof process !== 'undefined' && !!(process.versions && process.versions.node);
    var isWeex = exports.isWeex = typeof callNative === 'function';
    var isReactNative = exports.isReactNative = typeof __fbBatchedBridgeConfig !== 'undefined';

    /***/ }),
  /* 7 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _instance = __webpack_require__(1);

    var _instance2 = _interopRequireDefault(_instance);

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    exports.default = {
      ComponentTree: {
        getClosestInstanceFromNode: function getClosestInstanceFromNode(node) {
          return _instance2.default.get(node);
        },
        getNodeFromInstance: function getNodeFromInstance(inst) {
          // inst is an internal instance (but could be a composite)
          while (inst._renderedComponent) {
            inst = inst._renderedComponent;
          }

          if (inst) {
            return inst._nativeNode;
          } else {
            return null;
          }
        }
      },
      Mount: {
        _instancesByReactRootID: _host2.default.rootComponents,

        // Stub - React DevTools expects to find this method and replace it
        // with a wrapper in order to observe new root components being added
        _renderNewRootComponent: function _renderNewRootComponent() {}
      },
      Reconciler: {
        // Stubs - React DevTools expects to find these methods and replace them
        // with wrappers in order to observe components being mounted, updated and
        // unmounted
        mountComponent: function mountComponent() {},
        receiveComponent: function receiveComponent() {},
        unmountComponent: function unmountComponent() {}
      },
      // monitor the info of all components
      monitor: null
    };
    module.exports = exports['default'];

    /***/ }),
  /* 8 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    exports.createElement = createElement;
    exports.createFactory = createFactory;
    exports.cloneElement = cloneElement;
    exports.isValidElement = isValidElement;

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    var _universalEnv = __webpack_require__(6);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var RESERVED_PROPS = {
      key: true,
      ref: true
    };

    function getRenderErrorInfo() {
      if (_host2.default.component) {
        var name = _host2.default.component.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }

    var Element = function Element(type, key, ref, props, owner) {
      props = filterProps(type, props);

      return {
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
    };

    exports.default = Element;

    function traverseChildren(children, result) {
      if (Array.isArray(children)) {
        for (var i = 0, l = children.length; i < l; i++) {
          traverseChildren(children[i], result);
        }
      } else {
        result.push(children);
      }
    }

    function flattenChildren(children) {
      if (children == null) {
        return children;
      }
      var result = [];
      traverseChildren(children, result);

      if (result.length === 1) {
        result = result[0];
      }

      return result;
    }

    function flattenStyle(style) {
      if (!style) {
        return undefined;
      }

      if (!Array.isArray(style)) {
        return style;
      } else {
        var result = {};
        for (var i = 0; i < style.length; ++i) {
          var computedStyle = flattenStyle(style[i]);
          if (computedStyle) {
            for (var key in computedStyle) {
              result[key] = computedStyle[key];
            }
          }
        }
        return result;
      }
    }

// TODO: move to weex-drvier
    function filterProps(type, props) {
      // Only for weex text
      if (_universalEnv.isWeex && type === 'text') {
        var children = props.children;
        var value = props.value;

        // Value is first
        if (value == null && children != null) {
          if (Array.isArray(children)) {
            children = children.map(function (val) {
              if (typeof val === 'number' || typeof val === 'string') {
                return val;
              } else {
                return '';
              }
            }).join('');
          } else if (typeof children !== 'number' && typeof children !== 'string') {
            children = '';
          }

          props.value = String(children);
        }

        props.children = null;
      }

      return props;
    }

    function createElement(type, config) {
      if (type == null) {
        throw Error('createElement: type should not be null or undefined.' + getRenderErrorInfo());
      }
      // Reserved names are extracted
      var props = {};
      var propName = void 0;
      var key = null;
      var ref = null;

      if (config != null) {
        ref = config.ref === undefined ? null : config.ref;
        key = config.key === undefined ? null : String(config.key);
        // Remaining properties are added to a new props object
        for (propName in config) {
          if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }

      for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      if (children.length) {
        props.children = flattenChildren(children);
      }

      // Resolve default props
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      if (props.style && (Array.isArray(props.style) || _typeof(props.style) === 'object')) {
        props.style = flattenStyle(props.style);
      }

      return new Element(type, key, ref, props, _host2.default.component);
    }

    function createFactory(type) {
      var factory = createElement.bind(null, type);
      // Expose the type on the factory and the prototype so that it can be
      // easily accessed on elements. E.g. `<Foo />.type === Foo`.
      // This should not be named `constructor` since this may not be the function
      // that created the element, and it may not even be a constructor.
      factory.type = type;
      return factory;
    }

    function cloneElement(element, config) {
      // Original props are copied
      var props = Object.assign({}, element.props);

      // Reserved names are extracted
      var key = element.key;
      var ref = element.ref;

      // Owner will be preserved, unless ref is overridden
      var owner = element._owner;

      if (config) {
        // Should reset ref and owner if has a new ref
        if (config.ref !== undefined) {
          ref = config.ref;
          owner = _host2.default.component;
        }

        if (config.key !== undefined) {
          key = String(config.key);
        }

        // Resolve default props
        var defaultProps = void 0;
        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }
        // Remaining properties override existing props
        var propName = void 0;
        for (propName in config) {
          if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      }

      for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        children[_key2 - 2] = arguments[_key2];
      }

      if (children.length) {
        props.children = flattenChildren(children);
      }

      return new Element(element.type, key, ref, props, owner);
    };

    function isValidElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.type && object.props;
    }

    /***/ }),
  /* 9 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function findDOMNode(instance) {
      if (instance == null) {
        return null;
      }

      // If a native node, weex may not export ownerDocument property
      if (instance.ownerDocument || instance.nodeType) {
        return instance;
      }

      // Native component
      if (instance._nativeNode) {
        return instance._nativeNode;
      }

      if (typeof instance == 'string') {
        return _host2.default.driver.getElementById(instance);
      }

      if (typeof instance.render !== 'function') {
        throw new Error('Appears to be neither Component nor DOMNode.');
      }

      // Composite component
      var internal = instance._internal;

      if (internal) {
        while (!internal._nativeNode) {
          internal = internal._renderedComponent;
          // If not mounted
          if (internal == null) {
            return null;
          }
        }
        return internal._nativeNode;
      } else {
        throw new Error('findDOMNode was called on an unmounted component.');
      }
    }

    exports.default = findDOMNode;
    module.exports = exports['default'];

    /***/ }),
  /* 10 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = setNativeProps;

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    var _findDOMNode = __webpack_require__(9);

    var _findDOMNode2 = _interopRequireDefault(_findDOMNode);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var STYLE = 'style';
    var CHILDREN = 'children';
    var EVENT_PREFIX_REGEXP = /on[A-Z]/;

    function setNativeProps(node, props, disableSetStyles) {
      node = (0, _findDOMNode2.default)(node);

      for (var prop in props) {
        var value = props[prop];
        if (prop === CHILDREN) {
          continue;
        }

        if (value != null) {
          if (prop === STYLE) {
            if (disableSetStyles) {
              continue;
            }
            _host2.default.driver.setStyles(node, value);
          } else if (EVENT_PREFIX_REGEXP.test(prop)) {
            var eventName = prop.slice(2).toLowerCase();
            _host2.default.driver.addEventListener(node, eventName, value);
          } else {
            _host2.default.driver.setAttribute(node, prop, value);
          }
        }
      }
    }
    module.exports = exports['default'];

    /***/ }),
  /* 11 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = unmountComponentAtNode;

    var _instance = __webpack_require__(1);

    var _instance2 = _interopRequireDefault(_instance);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function unmountComponentAtNode(node) {
      var component = _instance2.default.get(node);

      if (!component) {
        return false;
      }

      _instance2.default.remove(node);
      component._internal.unmountComponent();

      return true;
    };
    module.exports = exports['default'];

    /***/ }),
  /* 12 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (children, element, index) {
      var elementKey = element && element.key;
      var hasKey = typeof elementKey === 'string';
      var defaultName = '.' + index.toString(36);

      if (hasKey) {
        var keyName = '$' + elementKey;
        // Child keys must be unique.
        var keyUnique = children[keyName] === undefined;
        // Only the first child will be used when encountered two children with the same key
        if (!keyUnique) console.warn('Encountered two children with the same key "' + elementKey + '".');

        return keyUnique ? keyName : defaultName;
      } else {
        return defaultName;
      }
    };

    module.exports = exports['default'];

    /***/ }),
  /* 13 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    var _ref = __webpack_require__(14);

    var _ref2 = _interopRequireDefault(_ref);

    var _instantiateComponent = __webpack_require__(2);

    var _instantiateComponent2 = _interopRequireDefault(_instantiateComponent);

    var _shouldUpdateComponent = __webpack_require__(4);

    var _shouldUpdateComponent2 = _interopRequireDefault(_shouldUpdateComponent);

    var _getElementKeyName = __webpack_require__(12);

    var _getElementKeyName2 = _interopRequireDefault(_getElementKeyName);

    var _instance = __webpack_require__(1);

    var _instance2 = _interopRequireDefault(_instance);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var STYLE = 'style';
    var CHILDREN = 'children';
    var TREE = 'tree';
    var EVENT_PREFIX_REGEXP = /on[A-Z]/;

    /**
     * Native Component
     */

    var NativeComponent = function () {
      function NativeComponent(element) {
        _classCallCheck(this, NativeComponent);

        this._currentElement = element;
      }

      _createClass(NativeComponent, [{
        key: 'mountComponent',
        value: function mountComponent(parent, context, childMounter) {
          // Parent native element
          this._parent = parent;
          this._context = context;
          this._mountID = _host2.default.mountID++;

          var props = this._currentElement.props;
          var type = this._currentElement.type;
          var instance = {
            _internal: this,
            type: type,
            props: props
          };
          var appendType = props.append; // Default is node

          this._instance = instance;

          // Clone a copy for style diff
          this._prevStyleCopy = Object.assign({}, props.style);

          var nativeNode = this.getNativeNode();

          if (appendType !== TREE) {
            if (childMounter) {
              childMounter(nativeNode, parent);
            } else {
              _host2.default.driver.appendChild(nativeNode, parent);
            }
          }

          if (this._currentElement && this._currentElement.ref) {
            _ref2.default.attach(this._currentElement._owner, this._currentElement.ref, this);
          }

          // Process children
          var children = props.children;
          if (children != null) {
            this.mountChildren(children, context);
          }

          if (appendType === TREE) {
            if (childMounter) {
              childMounter(nativeNode, parent);
            } else {
              _host2.default.driver.appendChild(nativeNode, parent);
            }
          }

          _host2.default.hook.Reconciler.mountComponent(this);

          return instance;
        }
      }, {
        key: 'mountChildren',
        value: function mountChildren(children, context) {
          var _this = this;

          if (!Array.isArray(children)) {
            children = [children];
          }

          var renderedChildren = {};

          var renderedChildrenImage = children.map(function (element, index) {
            var renderedChild = (0, _instantiateComponent2.default)(element);
            var name = (0, _getElementKeyName2.default)(renderedChildren, element, index);
            renderedChildren[name] = renderedChild;
            renderedChild._mountIndex = index;
            // Mount
            var mountImage = renderedChild.mountComponent(_this.getNativeNode(), context);
            return mountImage;
          });

          this._renderedChildren = renderedChildren;

          return renderedChildrenImage;
        }
      }, {
        key: 'unmountChildren',
        value: function unmountChildren(notRemoveChild) {
          var renderedChildren = this._renderedChildren;

          if (renderedChildren) {
            for (var name in renderedChildren) {
              var renderedChild = renderedChildren[name];
              renderedChild.unmountComponent(notRemoveChild);
            }
            this._renderedChildren = null;
          }
        }
      }, {
        key: 'unmountComponent',
        value: function unmountComponent(notRemoveChild) {
          if (this._nativeNode) {
            var ref = this._currentElement.ref;
            if (ref) {
              _ref2.default.detach(this._currentElement._owner, ref, this);
            }

            _instance2.default.remove(this._nativeNode);
            if (!notRemoveChild) {
              _host2.default.driver.removeChild(this._nativeNode, this._parent);
            }
            _host2.default.driver.removeAllEventListeners(this._nativeNode);
          }

          this.unmountChildren(notRemoveChild);

          _host2.default.hook.Reconciler.unmountComponent(this);

          this._currentElement = null;
          this._nativeNode = null;
          this._parent = null;
          this._context = null;
          this._instance = null;
          this._prevStyleCopy = null;
        }
      }, {
        key: 'updateComponent',
        value: function updateComponent(prevElement, nextElement, prevContext, nextContext) {
          // Replace current element
          this._currentElement = nextElement;

          _ref2.default.update(prevElement, nextElement, this);

          var prevProps = prevElement.props;
          var nextProps = nextElement.props;

          this.updateProperties(prevProps, nextProps);
          this.updateChildren(nextProps.children, nextContext);

          _host2.default.hook.Reconciler.receiveComponent(this);
        }
      }, {
        key: 'updateProperties',
        value: function updateProperties(prevProps, nextProps) {
          var propKey = void 0;
          var styleName = void 0;
          var styleUpdates = void 0;
          for (propKey in prevProps) {
            if (propKey === CHILDREN || nextProps.hasOwnProperty(propKey) || !prevProps.hasOwnProperty(propKey) || prevProps[propKey] == null) {
              continue;
            }
            if (propKey === STYLE) {
              var lastStyle = this._prevStyleCopy;
              for (styleName in lastStyle) {
                if (lastStyle.hasOwnProperty(styleName)) {
                  styleUpdates = styleUpdates || {};
                  styleUpdates[styleName] = '';
                }
              }
              this._prevStyleCopy = null;
            } else if (EVENT_PREFIX_REGEXP.test(propKey)) {
              if (typeof prevProps[propKey] === 'function') {
                _host2.default.driver.removeEventListener(this.getNativeNode(), propKey.slice(2).toLowerCase(), prevProps[propKey]);
              }
            } else {
              _host2.default.driver.removeAttribute(this.getNativeNode(), propKey, prevProps[propKey]);
            }
          }

          for (propKey in nextProps) {
            var nextProp = nextProps[propKey];
            var prevProp = propKey === STYLE ? this._prevStyleCopy : prevProps != null ? prevProps[propKey] : undefined;
            if (propKey === CHILDREN || !nextProps.hasOwnProperty(propKey) || nextProp === prevProp || nextProp == null && prevProp == null) {
              continue;
            }
            // Update style
            if (propKey === STYLE) {
              if (nextProp) {
                // Clone property
                nextProp = this._prevStyleCopy = Object.assign({}, nextProp);
              } else {
                this._prevStyleCopy = null;
              }

              if (prevProp != null) {
                // Unset styles on `prevProp` but not on `nextProp`.
                for (styleName in prevProp) {
                  if (prevProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
                    styleUpdates = styleUpdates || {};
                    styleUpdates[styleName] = '';
                  }
                }
                // Update styles that changed since `prevProp`.
                for (styleName in nextProp) {
                  if (nextProp.hasOwnProperty(styleName) && prevProp[styleName] !== nextProp[styleName]) {
                    styleUpdates = styleUpdates || {};
                    styleUpdates[styleName] = nextProp[styleName];
                  }
                }
              } else {
                // Assign next prop when prev style is null
                styleUpdates = nextProp;
              }

              // Update event binding
            } else if (EVENT_PREFIX_REGEXP.test(propKey)) {
              if (typeof prevProp === 'function') {
                _host2.default.driver.removeEventListener(this.getNativeNode(), propKey.slice(2).toLowerCase(), prevProp);
              }

              if (typeof nextProp === 'function') {
                _host2.default.driver.addEventListener(this.getNativeNode(), propKey.slice(2).toLowerCase(), nextProp);
              }
              // Update other property
            } else {
              var payload = {};
              payload[propKey] = nextProp;
              if (nextProp != null) {
                _host2.default.driver.setAttribute(this.getNativeNode(), propKey, nextProp);
              } else {
                _host2.default.driver.removeAttribute(this.getNativeNode(), propKey, prevProps[propKey]);
              }
              if (false) {
                _host2.default.measurer && _host2.default.measurer.recordOperation({
                  instanceID: this._mountID,
                  type: 'update attribute',
                  payload: payload
                });
              }
            }
          }

          if (styleUpdates) {
            if (false) {
              _host2.default.measurer && _host2.default.measurer.recordOperation({
                instanceID: this._mountID,
                type: 'update style',
                payload: styleUpdates
              });
            }
            _host2.default.driver.setStyles(this.getNativeNode(), styleUpdates);
          }
        }
      }, {
        key: 'updateChildren',
        value: function updateChildren(nextChildrenElements, context) {
          var _this2 = this;

          // prev rendered children
          var prevChildren = this._renderedChildren;

          if (nextChildrenElements == null && prevChildren == null) {
            return;
          }

          var nextChildren = {};
          var oldNodes = {};

          if (nextChildrenElements != null) {
            if (!Array.isArray(nextChildrenElements)) {
              nextChildrenElements = [nextChildrenElements];
            }

            // Update next children elements
            for (var index = 0, length = nextChildrenElements.length; index < length; index++) {
              var nextElement = nextChildrenElements[index];
              var name = (0, _getElementKeyName2.default)(nextChildren, nextElement, index);
              var prevChild = prevChildren && prevChildren[name];
              var prevElement = prevChild && prevChild._currentElement;

              if (prevChild != null && (0, _shouldUpdateComponent2.default)(prevElement, nextElement)) {
                // Pass the same context when updating chidren
                prevChild.updateComponent(prevElement, nextElement, context, context);
                nextChildren[name] = prevChild;
              } else {
                // Unmount the prevChild when nextChild is different element type.
                if (prevChild) {
                  var oldNativeNode = prevChild.getNativeNode();
                  // Delay remove child
                  prevChild.unmountComponent(true);
                  oldNodes[name] = oldNativeNode;
                }
                // The child must be instantiated before it's mounted.
                nextChildren[name] = (0, _instantiateComponent2.default)(nextElement);
              }
            }
          }

          var firstPrevChild = void 0;
          var delayRemoveFirstPrevChild = void 0;
          // Unmount children that are no longer present.
          if (prevChildren != null) {
            for (var _name in prevChildren) {
              if (!prevChildren.hasOwnProperty(_name)) {
                continue;
              }

              var _prevChild = prevChildren[_name];
              var shouldRemove = !nextChildren[_name];

              // Store old first child ref for append node ahead and maybe delay remove it
              if (!firstPrevChild) {
                firstPrevChild = _prevChild;
                delayRemoveFirstPrevChild = shouldRemove;
              } else if (shouldRemove) {
                _prevChild.unmountComponent();
              }
            }
          }

          if (nextChildren != null) {
            (function () {
              // `nextIndex` will increment for each child in `nextChildren`, but
              // `lastIndex` will be the last index visited in `prevChildren`.
              var lastIndex = 0;
              var nextIndex = 0;
              var lastPlacedNode = null;
              var nextNativeNode = [];

              var _loop = function _loop(_name2) {
                if (!nextChildren.hasOwnProperty(_name2)) {
                  return 'continue';
                }

                var nextChild = nextChildren[_name2];
                var prevChild = prevChildren && prevChildren[_name2];

                if (prevChild === nextChild) {
                  var prevChildNativeNode = prevChild.getNativeNode();
                  // Convert to array type
                  if (!Array.isArray(prevChildNativeNode)) {
                    prevChildNativeNode = [prevChildNativeNode];
                  }

                  // If the index of `child` is less than `lastIndex`, then it needs to
                  // be moved. Otherwise, we do not need to move it because a child will be
                  // inserted or moved before `child`.
                  if (prevChild._mountIndex < lastIndex) {
                    // Get the last child
                    if (Array.isArray(lastPlacedNode)) {
                      lastPlacedNode = lastPlacedNode[lastPlacedNode.length - 1];
                    }

                    for (var _i = prevChildNativeNode.length - 1; _i >= 0; _i--) {
                      _host2.default.driver.insertAfter(prevChildNativeNode[_i], lastPlacedNode);
                    }
                  }

                  nextNativeNode = nextNativeNode.concat(prevChildNativeNode);

                  lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                  prevChild._mountIndex = nextIndex;
                } else {
                  if (prevChild != null) {
                    // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
                    lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                  }

                  var parent = _this2.getNativeNode();
                  // Fragment extended native component, so if parent is fragment should get this._parent
                  if (Array.isArray(parent)) {
                    parent = _this2._parent;
                  }

                  nextChild.mountComponent(parent, context, function (newChild, parent) {
                    // TODO: Rework the duplicate code
                    var oldChild = oldNodes[_name2];
                    if (!Array.isArray(newChild)) {
                      newChild = [newChild];
                    }

                    if (oldChild) {
                      // The oldChild or newChild all maybe fragment
                      if (!Array.isArray(oldChild)) {
                        oldChild = [oldChild];
                      }

                      // If newChild count large then oldChild
                      var lastNewChild = void 0;
                      for (var _i2 = 0; _i2 < newChild.length; _i2++) {
                        var child = newChild[_i2];
                        if (oldChild[_i2]) {
                          _host2.default.driver.replaceChild(child, oldChild[_i2]);
                        } else {
                          _host2.default.driver.insertAfter(child, lastNewChild);
                        }
                        lastNewChild = child;
                      }

                      // If newChild count less then oldChild
                      if (newChild.length < oldChild.length) {
                        for (var _i3 = newChild.length; _i3 < oldChild.length; _i3++) {
                          _host2.default.driver.removeChild(oldChild[_i3]);
                        }
                      }
                    } else {
                      // Insert child at a specific index

                      // Get the last child
                      if (Array.isArray(lastPlacedNode)) {
                        lastPlacedNode = lastPlacedNode[lastPlacedNode.length - 1];
                      }

                      var prevFirstNativeNode = void 0;

                      if (firstPrevChild && !lastPlacedNode) {
                        prevFirstNativeNode = firstPrevChild.getNativeNode();
                        if (Array.isArray(prevFirstNativeNode)) {
                          prevFirstNativeNode = prevFirstNativeNode[0];
                        }
                      }

                      for (var _i4 = newChild.length - 1; _i4 >= 0; _i4--) {
                        var _child = newChild[_i4];
                        if (lastPlacedNode) {
                          _host2.default.driver.insertAfter(_child, lastPlacedNode);
                        } else if (prevFirstNativeNode) {
                          _host2.default.driver.insertBefore(_child, prevFirstNativeNode);
                        } else {
                          _host2.default.driver.appendChild(_child, parent);
                        }
                      }
                    }

                    nextNativeNode = nextNativeNode.concat(newChild);
                  });
                  nextChild._mountIndex = nextIndex;
                }

                nextIndex++;
                lastPlacedNode = nextChild.getNativeNode();
              };

              for (var _name2 in nextChildren) {
                var _ret2 = _loop(_name2);

                if (_ret2 === 'continue') continue;
              }

              // Sync update native refs
              if (Array.isArray(_this2._nativeNode)) {
                // Clear all and push the new array
                _this2._nativeNode.splice(0, _this2._nativeNode.length);
                for (var i = 0; i < nextNativeNode.length; i++) {
                  _this2._nativeNode.push(nextNativeNode[i]);
                }
              }
            })();
          }

          if (delayRemoveFirstPrevChild) {
            firstPrevChild.unmountComponent();
          }

          this._renderedChildren = nextChildren;
        }
      }, {
        key: 'getNativeNode',
        value: function getNativeNode() {
          if (this._nativeNode == null) {
            this._nativeNode = _host2.default.driver.createElement(this._instance);
            _instance2.default.set(this._nativeNode, this._instance);
          }

          return this._nativeNode;
        }
      }, {
        key: 'getPublicInstance',
        value: function getPublicInstance() {
          return this.getNativeNode();
        }
      }, {
        key: 'getName',
        value: function getName() {
          return this._currentElement.type;
        }
      }]);

      return NativeComponent;
    }();

    exports.default = NativeComponent;
    module.exports = exports['default'];

    /***/ }),
  /* 14 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /*
     * Ref manager
     */

    exports.default = {
      update: function update(prevElement, nextElement, component) {
        var prevRef = prevElement != null && prevElement.ref;
        var nextRef = nextElement != null && nextElement.ref;

        // Update refs in owner component
        if (prevRef !== nextRef) {
          // Detach prev RenderedElement's ref
          prevRef != null && this.detach(prevElement._owner, prevRef, component);
          // Attach next RenderedElement's ref
          nextRef != null && this.attach(nextElement._owner, nextRef, component);
        }
      },
      attach: function attach(ownerComponent, ref, component) {
        if (!ownerComponent) {
          throw new Error('You might be adding a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of Rax loaded.');
        }

        var instance = component.getPublicInstance();
        if (typeof ref === 'function') {
          ref(instance);
        } else {
          ownerComponent._instance.refs[ref] = instance;
        }
      },
      detach: function detach(ownerComponent, ref, component) {
        if (typeof ref === 'function') {
          // When the referenced component is unmounted and whenever the ref changes, the old ref will be called with null as an argument.
          ref(null);
        } else {
          // Must match component and ref could detach the ref on owner when A's before ref is B's current ref
          var instance = component.getPublicInstance();
          if (ownerComponent._instance.refs[ref] === instance) {
            delete ownerComponent._instance.refs[ref];
          }
        }
      }
    };
    module.exports = exports['default'];

    /***/ }),
  /* 15 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

// https://github.com/WebReflection/url-search-params

    var find = /[!'\(\)~]|%20|%00/g,
      plus = /\+/g,
      replace = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
      },
      replacer = function replacer(match) {
        return replace[match];
      },
      iterable = isIterable(),
      secret = '__URLSearchParams__';

    function encode(str) {
      return encodeURIComponent(str).replace(find, replacer);
    }

    function decode(str) {
      return decodeURIComponent(str.replace(plus, ' '));
    }

    function isIterable() {
      try {
        return !!Symbol.iterator;
      } catch (error) {
        return false;
      }
    }

    var URLSearchParams = function () {
      function URLSearchParams(query) {
        _classCallCheck(this, URLSearchParams);

        this[secret] = Object.create(null);
        if (!query) return;
        if (query.charAt(0) === '?') {
          query = query.slice(1);
        }
        for (var index, value, pairs = (query || '').split('&'), i = 0, length = pairs.length; i < length; i++) {
          value = pairs[i];
          index = value.indexOf('=');
          if (-1 < index) {
            this.append(decode(value.slice(0, index)), decode(value.slice(index + 1)));
          } else if (value.length) {
            this.append(decode(value), '');
          }
        }
      }

      _createClass(URLSearchParams, [{
        key: 'append',
        value: function append(name, value) {
          var dict = this[secret];
          if (name in dict) {
            dict[name].push('' + value);
          } else {
            dict[name] = ['' + value];
          }
        }
      }, {
        key: 'delete',
        value: function _delete(name) {
          delete this[secret][name];
        }
      }, {
        key: 'get',
        value: function get(name) {
          var dict = this[secret];
          return name in dict ? dict[name][0] : null;
        }
      }, {
        key: 'getAll',
        value: function getAll(name) {
          var dict = this[secret];
          return name in dict ? dict[name].slice(0) : [];
        }
      }, {
        key: 'has',
        value: function has(name) {
          return name in this[secret];
        }
      }, {
        key: 'set',
        value: function set(name, value) {
          this[secret][name] = ['' + value];
        }
      }, {
        key: 'forEach',
        value: function forEach(callback, thisArg) {
          var dict = this[secret];
          Object.getOwnPropertyNames(dict).forEach(function (name) {
            dict[name].forEach(function (value) {
              callback.call(thisArg, value, name, this);
            }, this);
          }, this);
        }
      }, {
        key: 'keys',
        value: function keys() {
          var items = [];
          this.forEach(function (value, name) {
            items.push(name);
          });
          var iterator = {
            next: function next() {
              var value = items.shift();
              return { done: value === undefined, value: value };
            }
          };

          if (iterable) {
            iterator[Symbol.iterator] = function () {
              return iterator;
            };
          }

          return iterator;
        }
      }, {
        key: 'values',
        value: function values() {
          var items = [];
          this.forEach(function (value) {
            items.push(value);
          });
          var iterator = {
            next: function next() {
              var value = items.shift();
              return { done: value === undefined, value: value };
            }
          };

          if (iterable) {
            iterator[Symbol.iterator] = function () {
              return iterator;
            };
          }

          return iterator;
        }
      }, {
        key: 'entries',
        value: function entries() {
          var items = [];
          this.forEach(function (value, name) {
            items.push([name, value]);
          });
          var iterator = {
            next: function next() {
              var value = items.shift();
              return { done: value === undefined, value: value };
            }
          };

          if (iterable) {
            iterator[Symbol.iterator] = function () {
              return iterator;
            };
          }

          return iterator;
        }
      }, {
        key: 'toString',
        value: function toString() {
          var dict = this[secret],
            query = [],
            i,
            key,
            name,
            value;
          for (key in dict) {
            name = encode(key);
            for (i = 0, value = dict[key]; i < value.length; i++) {
              query.push(name + '=' + encode(value[i]));
            }
          }
          return query.join('&');
        }
      }]);

      return URLSearchParams;
    }();

    if (iterable) {
      URLSearchParams.prototype[Symbol.iterator] = URLSearchParams.prototype.entries;
    }

    module.exports = URLSearchParams;

    /***/ }),
  /* 16 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isRem = isRem;
    exports.calcRem = calcRem;
    exports.getRem = getRem;
    exports.setRem = setRem;
    exports.isUnitNumber = isUnitNumber;
    exports.convertUnit = convertUnit;
    /**
     * CSS properties which accept numbers but are not in units of "px".
     */
    var UNITLESS_NUMBER_PROPS = {
      animationIterationCount: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridRow: true,
      gridColumn: true,
      fontWeight: true,
      lineClamp: true,
      // We make lineHeight default is px that is diff with w3c spec
      // lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      // Weex only
      lines: true
    };
    var SUFFIX = 'rem';
    var REM_REG = /[-+]?\d*\.?\d+rem/g;

    var defaultRem = void 0;

    /**
     * Is string contains rem
     * @param {String} str
     * @returns {Boolean}
     */
    function isRem(str) {
      return typeof str === 'string' && str.indexOf(SUFFIX) !== -1;
    }

    /**
     * Calculate rem to pixels: '1.2rem' => 1.2 * rem
     * @param {String} str
     * @param {Number} rem
     * @returns {number}
     */
    function calcRem(str) {
      var rem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultRem;

      return str.replace(REM_REG, function (remValue) {
        return parseFloat(remValue) * rem + 'px';
      });
    }

    function getRem() {
      return defaultRem;
    }

    function setRem(rem) {
      defaultRem = rem;
    }

    function isUnitNumber(val, prop) {
      return typeof val === 'number' && !UNITLESS_NUMBER_PROPS[prop];
    }

    function convertUnit(val, prop) {
      if (prop && isUnitNumber(val, prop)) {
        return val * defaultRem + 'px';
      } else if (isRem(val)) {
        return calcRem(val);
      }

      return val;
    }

    /***/ }),
  /* 17 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.transformPropsAttrsToStyle = transformPropsAttrsToStyle;
    exports.renamePropsAttr = renamePropsAttr;
    /**
     * transformPropAttrsToStyle
     *
     * @param {Object} props
     * @param {Array} attrs
     */
    function transformPropsAttrsToStyle(props, attrs) {
      props.style = props.style || {};

      attrs.forEach(function (attr) {
        if (props[attr] && !props.style[attr]) {
          props.style[attr] = props[attr];
          delete props[attr];
        }
      });

      return props;
    };

    /**
     * renamePropsAttr
     *
     * @param {Object} props
     * @param {String} originalAttrName
     * @param {String} newAttrName
     */
    function renamePropsAttr(props, originalAttrName, newAttrName) {
      if (props[originalAttrName] && !props[newAttrName]) {
        props[newAttrName] = props[originalAttrName];
        delete props[originalAttrName];
      }

      return props;
    }

    /***/ }),
  /* 18 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.version = exports.setNativeProps = exports.findComponentInstance = exports.unmountComponentAtNode = exports.findDOMNode = exports.render = exports.PropTypes = exports.PureComponent = exports.Component = exports.createFactory = exports.isValidElement = exports.cloneElement = exports.createElement = undefined;

    var _element = __webpack_require__(8);

    Object.defineProperty(exports, 'createElement', {
      enumerable: true,
      get: function get() {
        return _element.createElement;
      }
    });
    Object.defineProperty(exports, 'cloneElement', {
      enumerable: true,
      get: function get() {
        return _element.cloneElement;
      }
    });
    Object.defineProperty(exports, 'isValidElement', {
      enumerable: true,
      get: function get() {
        return _element.isValidElement;
      }
    });
    Object.defineProperty(exports, 'createFactory', {
      enumerable: true,
      get: function get() {
        return _element.createFactory;
      }
    });

    __webpack_require__(26);

    var _component = __webpack_require__(3);

    var _component2 = _interopRequireDefault(_component);

    var _purecomponent = __webpack_require__(32);

    var _purecomponent2 = _interopRequireDefault(_purecomponent);

    var _proptypes = __webpack_require__(31);

    var _proptypes2 = _interopRequireDefault(_proptypes);

    var _render2 = __webpack_require__(33);

    var _render3 = _interopRequireDefault(_render2);

    var _findDOMNode2 = __webpack_require__(9);

    var _findDOMNode3 = _interopRequireDefault(_findDOMNode2);

    var _unmountComponentAtNode2 = __webpack_require__(11);

    var _unmountComponentAtNode3 = _interopRequireDefault(_unmountComponentAtNode2);

    var _findComponentInstance2 = __webpack_require__(29);

    var _findComponentInstance3 = _interopRequireDefault(_findComponentInstance2);

    var _setNativeProps2 = __webpack_require__(10);

    var _setNativeProps3 = _interopRequireDefault(_setNativeProps2);

    var _version2 = __webpack_require__(43);

    var _version3 = _interopRequireDefault(_version2);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    exports.Component = _component2.default;
    exports.PureComponent = _purecomponent2.default;
    exports.PropTypes = _proptypes2.default;
    exports.render = _render3.default;
    exports.findDOMNode = _findDOMNode3.default;
    exports.unmountComponentAtNode = _unmountComponentAtNode3.default;
    exports.findComponentInstance = _findComponentInstance3.default;
    exports.setNativeProps = _setNativeProps3.default;
    exports.version = _version3.default;

    /***/ }),
  /* 19 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    module.exports = {
      get Promise() {
        return __webpack_require__(47);
      },
      get Symbol() {
        return __webpack_require__(5);
      },
      get Map() {
        return __webpack_require__(45);
      },
      get Set() {
        return __webpack_require__(48);
      },
      get WeakMap() {
        return __webpack_require__(50);
      },
      get WeakSet() {
        return __webpack_require__(51);
      },
      get FontFace() {
        return __webpack_require__(44);
      },
      get URL() {
        return __webpack_require__(49);
      },
      get URLSearchParams() {
        return __webpack_require__(15);
      },
      get matchMedia() {
        return __webpack_require__(46);
      }
    };

    /***/ }),
  /* 20 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _appearRegistry = __webpack_require__(52);

    var _appearRegistry2 = _interopRequireDefault(_appearRegistry);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    var instance = null;

    var appear = function appear() {
      var instances = [];

      _appearRegistry2.default.createEvent();
      injectEventListenerHook(instances);

      instance = new _appearRegistry2.default({
        container: window
      });
      instances.push(instance);

      var control = {
        config: _appearRegistry.config
      };

      return control;
    };

// hijack addEventListenerã€removeEventListener
    var injectEventListenerHook = function injectEventListenerHook(instances) {
      var nativeAddEventListener = Node.prototype.addEventListener;
      var nativeRemoveEventListener = Node.prototype.removeEventListener;

      Node.prototype.addEventListener = function (eventName, eventHandler, useCapture, isNotWatch) {
        var lowerCaseEventName = eventName.toLowerCase();
        if (lowerCaseEventName === 'appear' || lowerCaseEventName === 'disappear') {
          (0, _appearRegistry.pushElement)(this);
        }

        if (instance) {
          instance.check();
        }

        if (lowerCaseEventName === 'scroll' && !isNotWatch) {
          instance = new _appearRegistry2.default({
            container: this
          });
          instances.push(instance);
        }
        nativeAddEventListener.call(this, eventName, eventHandler, useCapture);
      };

      Node.prototype.removeEventListener = function (eventName, eventHandler, useCapture, isNotWatch) {
        var _this = this;

        var lowerCaseEventName = eventName.toLowerCase();

        // destroy scroller
        if (lowerCaseEventName === 'scroll' && !isNotWatch) {
          instances.forEach(function (instance, index) {
            if (instance.__handle && instance.container === _this) {
              _this.removeEventListener('scroll', instance.__handle, false, true);
              instance.__handle = null;
              instance.appearWatchElements = [];
              instance.container = null;
              instances.splice(index, 1);
            }
          });
        }
        nativeRemoveEventListener.call(this, eventName, eventHandler, useCapture);
      };
    };

    exports.default = appear();
    module.exports = exports['default'];

    /***/ }),
  /* 21 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
    if (!Array.from) {
      Array.from = function () {
        var toStr = Object.prototype.toString;
        var isCallable = function isCallable(fn) {
          return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function toInteger(value) {
          var number = Number(value);
          if (isNaN(number)) {
            return 0;
          }
          if (number === 0 || !isFinite(number)) {
            return number;
          }
          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function toLength(value) {
          var len = toInteger(value);
          return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike /* , mapFn, thisArg */) {
          // 1. Let C be the this value.
          var C = this;

          // 2. Let items be ToObject(arrayLike).
          var items = Object(arrayLike);

          // 3. ReturnIfAbrupt(items).
          if (arrayLike == null) {
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
          }

          // 4. If mapfn is undefined, then let mapping be false.
          var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
          var T;
          if (typeof mapFn !== 'undefined') {
            // 5. else
            // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
            if (!isCallable(mapFn)) {
              throw new TypeError('Array.from: when provided, the second argument must be a function');
            }

            // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments.length > 2) {
              T = arguments[2];
            }
          }

          // 10. Let lenValue be Get(items, "length").
          // 11. Let len be ToLength(lenValue).
          var len = toLength(items.length);

          // 13. If IsConstructor(C) is true, then
          // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
          // 14. a. Else, Let A be ArrayCreate(len).
          var A = isCallable(C) ? Object(new C(len)) : new Array(len);

          // 16. Let k be 0.
          var k = 0;
          // 17. Repeat, while k < lenâ€¦ (also steps a - h)
          var kValue;
          while (k < len) {
            kValue = items[k];
            if (mapFn) {
              A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
            } else {
              A[k] = kValue;
            }
            k += 1;
          }
          // 18. Let putStatus be Put(A, "length", len, true).
          A.length = len;
          // 20. Return A.
          return A;
        };
      }();
    }

    /***/ }),
  /* 22 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


// WARNING: This is an optimized version that fails on hasOwnProperty checks
// and non objects. It's not spec-compliant. It's a perf optimization.
    /* eslint strict:0 */
    if (!Object.assign) {
      Object.assign = function (target, sources) {
        for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
          var nextSource = arguments[nextIndex];
          if (nextSource == null) {
            continue;
          }

          // We don't currently support accessors nor proxies. Therefore this
          // copy cannot throw. If we ever supported this then we must handle
          // exceptions and side-effects.
          for (var key in nextSource) {
            target[key] = nextSource[key];
          }
        }

        return target;
      };
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * Returns an array of the given object's own enumerable entries.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
     *
     */
    if (!Object.entries) {
      Object.entries = function (object) {
        // `null` and `undefined` values are not allowed.
        if (object == null) {
          throw new TypeError('Object.entries called on non-object');
        }

        var entries = [];
        for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
            entries.push([key, object[key]]);
          }
        }
        return entries;
      };
    }

    /**
     * Returns an array of the given object's own enumerable entries.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
     *
     */
    if (!Object.values) {
      Object.values = function (object) {
        // `null` and `undefined` values are not allowed.
        if (object == null) {
          throw new TypeError('Object.values called on non-object');
        }

        var values = [];
        for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
            values.push(object[key]);
          }
        }
        return values;
      };
    }

    if (!Object.defineProperties) {
      Object.defineProperties = function (object, descriptors) {
        for (var property in descriptors) {
          Object.defineProperty(object, property, descriptors[property]);
        }
        return object;
      };
    }

// https://gist.github.com/WebReflection/5593554
    if (!Object.setPrototypeOf) {
      Object.setPrototypeOf = function (Object, magic) {
        var set;
        function setPrototypeOf(O, proto) {
          set.call(O, proto);
          return O;
        }
        try {
          // this works already in Firefox and Safari
          set = Object.getOwnPropertyDescriptor(Object.prototype, magic).set;
          set.call({}, null);
        } catch (e) {
          if (
            // IE < 11 cannot be shimmed
          Object.prototype !== {}[magic] ||
          // neither can any browser that actually
          // implemented __proto__ correctly
          // (all but old V8 will return here)
          { __proto__: null }.__proto__ === void 0
          // this case means null objects cannot be passed
          // through setPrototypeOf in a reliable way
          // which means here a **Sham** is needed instead
          ) {
            return;
          }
          // nodejs 0.8 and 0.10 are (buggy and..) fine here
          // probably Chrome or some old Mobile stock browser
          set = function set(proto) {
            this[magic] = proto;
          };
          // please note that this will **not** work
          // in those browsers that do not inherit
          // __proto__ by mistake from Object.prototype
          // in these cases we should probably throw an error
          // or at least be informed about the issue
          setPrototypeOf.polyfill = setPrototypeOf(setPrototypeOf({}, null), Object.prototype) instanceof Object;
          // setPrototypeOf.polyfill === true means it works as meant
          // setPrototypeOf.polyfill === false means it's not 100% reliable
          // setPrototypeOf.polyfill === undefined
          // or
          // setPrototypeOf.polyfill ==  null means it's not a polyfill
          // which means it works as expected
          // we can even delete Object.prototype.__proto__;
        }
        return setPrototypeOf;
      }(Object, '__proto__');
    }

    if (!Object.is) {
      Object.is = function (x, y) {
        if (x === y) {
          // 0 === -0, but they are not identical
          return x !== 0 || 1 / x === 1 / y;
        }

        // NaN !== NaN, but they are identical.
        // NaNs are the only non-reflexive value, i.e., if x !== x,
        // then x is a NaN.
        // isNaN is broken: it converts its argument to number, so
        // isNaN("foo") => true
        return x !== x && y !== y;
      };
    }

    /***/ }),
  /* 23 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    (function (global) {
      if (global.define) {
        return;
      }

      /* eslint strict:0 */
      var modules = {};
      var inGuard = false;

      function def(id, deps, factory) {
        if (deps instanceof Function) {
          factory = deps;
          deps = [];
        }

        modules[id] = {
          factory: factory,
          deps: deps,
          module: { exports: {} },
          isInitialized: false,
          hasError: false
        };
      }

      function req(id) {
        // Weex built-in modules
        if (id.indexOf('@weex-module') === 0) {
          return {};
        }

        var originId = id;
        var mod = modules[id];
        // Node like require
        if (!mod) {
          id = id + '/index';
          mod = modules[id];
        }

        if (mod && mod.isInitialized) {
          return mod.module.exports;
        }

        return requireImpl(id, originId);
      }

      function requireImpl(id, originId) {
        if (global.ErrorUtils && !inGuard) {
          inGuard = true;
          var returnValue;
          try {
            returnValue = requireImpl.apply(this, arguments);
          } catch (e) {
            global.ErrorUtils.reportFatalError(e);
          }
          inGuard = false;
          return returnValue;
        }

        var mod = modules[id];
        if (!mod) {
          throw new Error('Requiring unknown module "' + originId + '"');
        }

        if (mod.hasError) {
          throw new Error('Requiring module "' + originId + '" which threw an exception');
        }

        try {
          // We must optimistically mark mod as initialized before running the factory to keep any
          // require cycles inside the factory from causing an infinite require loop.
          mod.isInitialized = true;

          // keep args in sync with with defineModuleCode in
          // rax/bundler/src/resolver.js
          mod.factory(req, mod.module.exports, mod.module);
        } catch (e) {
          mod.hasError = true;
          mod.isInitialized = false;
          throw e;
        }

        return mod.module.exports;
      }

      global.define = def;
      global.require = req;
    })(undefined || (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global || (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window);

    /***/ }),
  /* 24 */
  /***/ (function(module, exports, __webpack_require__) {

    __webpack_require__(65).polyfill()


    /***/ }),
  /* 25 */
  /***/ (function(module, exports) {

    (function(self) {
      'use strict';

      if (self.fetch) {
        return
      }

      var support = {
        searchParams: 'URLSearchParams' in self,
        iterable: 'Symbol' in self && 'iterator' in Symbol,
        blob: 'FileReader' in self && 'Blob' in self && (function() {
          try {
            new Blob()
            return true
          } catch(e) {
            return false
          }
        })(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
      }

      if (support.arrayBuffer) {
        var viewClasses = [
          '[object Int8Array]',
          '[object Uint8Array]',
          '[object Uint8ClampedArray]',
          '[object Int16Array]',
          '[object Uint16Array]',
          '[object Int32Array]',
          '[object Uint32Array]',
          '[object Float32Array]',
          '[object Float64Array]'
        ]

        var isDataView = function(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj)
        }

        var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
          }
      }

      function normalizeName(name) {
        if (typeof name !== 'string') {
          name = String(name)
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
          throw new TypeError('Invalid character in header field name')
        }
        return name.toLowerCase()
      }

      function normalizeValue(value) {
        if (typeof value !== 'string') {
          value = String(value)
        }
        return value
      }

      // Build a destructive iterator for the value list
      function iteratorFor(items) {
        var iterator = {
          next: function() {
            var value = items.shift()
            return {done: value === undefined, value: value}
          }
        }

        if (support.iterable) {
          iterator[Symbol.iterator] = function() {
            return iterator
          }
        }

        return iterator
      }

      function Headers(headers) {
        this.map = {}

        if (headers instanceof Headers) {
          headers.forEach(function(value, name) {
            this.append(name, value)
          }, this)
        } else if (Array.isArray(headers)) {
          headers.forEach(function(header) {
            this.append(header[0], header[1])
          }, this)
        } else if (headers) {
          Object.getOwnPropertyNames(headers).forEach(function(name) {
            this.append(name, headers[name])
          }, this)
        }
      }

      Headers.prototype.append = function(name, value) {
        name = normalizeName(name)
        value = normalizeValue(value)
        var oldValue = this.map[name]
        this.map[name] = oldValue ? oldValue+','+value : value
      }

      Headers.prototype['delete'] = function(name) {
        delete this.map[normalizeName(name)]
      }

      Headers.prototype.get = function(name) {
        name = normalizeName(name)
        return this.has(name) ? this.map[name] : null
      }

      Headers.prototype.has = function(name) {
        return this.map.hasOwnProperty(normalizeName(name))
      }

      Headers.prototype.set = function(name, value) {
        this.map[normalizeName(name)] = normalizeValue(value)
      }

      Headers.prototype.forEach = function(callback, thisArg) {
        for (var name in this.map) {
          if (this.map.hasOwnProperty(name)) {
            callback.call(thisArg, this.map[name], name, this)
          }
        }
      }

      Headers.prototype.keys = function() {
        var items = []
        this.forEach(function(value, name) { items.push(name) })
        return iteratorFor(items)
      }

      Headers.prototype.values = function() {
        var items = []
        this.forEach(function(value) { items.push(value) })
        return iteratorFor(items)
      }

      Headers.prototype.entries = function() {
        var items = []
        this.forEach(function(value, name) { items.push([name, value]) })
        return iteratorFor(items)
      }

      if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries
      }

      function consumed(body) {
        if (body.bodyUsed) {
          return Promise.reject(new TypeError('Already read'))
        }
        body.bodyUsed = true
      }

      function fileReaderReady(reader) {
        return new Promise(function(resolve, reject) {
          reader.onload = function() {
            resolve(reader.result)
          }
          reader.onerror = function() {
            reject(reader.error)
          }
        })
      }

      function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader()
        var promise = fileReaderReady(reader)
        reader.readAsArrayBuffer(blob)
        return promise
      }

      function readBlobAsText(blob) {
        var reader = new FileReader()
        var promise = fileReaderReady(reader)
        reader.readAsText(blob)
        return promise
      }

      function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf)
        var chars = new Array(view.length)

        for (var i = 0; i < view.length; i++) {
          chars[i] = String.fromCharCode(view[i])
        }
        return chars.join('')
      }

      function bufferClone(buf) {
        if (buf.slice) {
          return buf.slice(0)
        } else {
          var view = new Uint8Array(buf.byteLength)
          view.set(new Uint8Array(buf))
          return view.buffer
        }
      }

      function Body() {
        this.bodyUsed = false

        this._initBody = function(body) {
          this._bodyInit = body
          if (!body) {
            this._bodyText = ''
          } else if (typeof body === 'string') {
            this._bodyText = body
          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body
          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this._bodyText = body.toString()
          } else if (support.arrayBuffer && support.blob && isDataView(body)) {
            this._bodyArrayBuffer = bufferClone(body.buffer)
            // IE 10-11 can't handle a DataView body.
            this._bodyInit = new Blob([this._bodyArrayBuffer])
          } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
            this._bodyArrayBuffer = bufferClone(body)
          } else {
            throw new Error('unsupported BodyInit type')
          }

          if (!this.headers.get('content-type')) {
            if (typeof body === 'string') {
              this.headers.set('content-type', 'text/plain;charset=UTF-8')
            } else if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set('content-type', this._bodyBlob.type)
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
            }
          }
        }

        if (support.blob) {
          this.blob = function() {
            var rejected = consumed(this)
            if (rejected) {
              return rejected
            }

            if (this._bodyBlob) {
              return Promise.resolve(this._bodyBlob)
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(new Blob([this._bodyArrayBuffer]))
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as blob')
            } else {
              return Promise.resolve(new Blob([this._bodyText]))
            }
          }

          this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
              return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
            } else {
              return this.blob().then(readBlobAsArrayBuffer)
            }
          }
        }

        this.text = function() {
          var rejected = consumed(this)
          if (rejected) {
            return rejected
          }

          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob)
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as text')
          } else {
            return Promise.resolve(this._bodyText)
          }
        }

        if (support.formData) {
          this.formData = function() {
            return this.text().then(decode)
          }
        }

        this.json = function() {
          return this.text().then(JSON.parse)
        }

        return this
      }

      // HTTP methods whose capitalization should be normalized
      var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

      function normalizeMethod(method) {
        var upcased = method.toUpperCase()
        return (methods.indexOf(upcased) > -1) ? upcased : method
      }

      function Request(input, options) {
        options = options || {}
        var body = options.body

        if (input instanceof Request) {
          if (input.bodyUsed) {
            throw new TypeError('Already read')
          }
          this.url = input.url
          this.credentials = input.credentials
          if (!options.headers) {
            this.headers = new Headers(input.headers)
          }
          this.method = input.method
          this.mode = input.mode
          if (!body && input._bodyInit != null) {
            body = input._bodyInit
            input.bodyUsed = true
          }
        } else {
          this.url = String(input)
        }

        this.credentials = options.credentials || this.credentials || 'omit'
        if (options.headers || !this.headers) {
          this.headers = new Headers(options.headers)
        }
        this.method = normalizeMethod(options.method || this.method || 'GET')
        this.mode = options.mode || this.mode || null
        this.referrer = null

        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
          throw new TypeError('Body not allowed for GET or HEAD requests')
        }
        this._initBody(body)
      }

      Request.prototype.clone = function() {
        return new Request(this, { body: this._bodyInit })
      }

      function decode(body) {
        var form = new FormData()
        body.trim().split('&').forEach(function(bytes) {
          if (bytes) {
            var split = bytes.split('=')
            var name = split.shift().replace(/\+/g, ' ')
            var value = split.join('=').replace(/\+/g, ' ')
            form.append(decodeURIComponent(name), decodeURIComponent(value))
          }
        })
        return form
      }

      function parseHeaders(rawHeaders) {
        var headers = new Headers()
        rawHeaders.split(/\r?\n/).forEach(function(line) {
          var parts = line.split(':')
          var key = parts.shift().trim()
          if (key) {
            var value = parts.join(':').trim()
            headers.append(key, value)
          }
        })
        return headers
      }

      Body.call(Request.prototype)

      function Response(bodyInit, options) {
        if (!options) {
          options = {}
        }

        this.type = 'default'
        this.status = 'status' in options ? options.status : 200
        this.ok = this.status >= 200 && this.status < 300
        this.statusText = 'statusText' in options ? options.statusText : 'OK'
        this.headers = new Headers(options.headers)
        this.url = options.url || ''
        this._initBody(bodyInit)
      }

      Body.call(Response.prototype)

      Response.prototype.clone = function() {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers(this.headers),
          url: this.url
        })
      }

      Response.error = function() {
        var response = new Response(null, {status: 0, statusText: ''})
        response.type = 'error'
        return response
      }

      var redirectStatuses = [301, 302, 303, 307, 308]

      Response.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError('Invalid status code')
        }

        return new Response(null, {status: status, headers: {location: url}})
      }

      self.Headers = Headers
      self.Request = Request
      self.Response = Response

      self.fetch = function(input, init) {
        return new Promise(function(resolve, reject) {
          var request = new Request(input, init)
          var xhr = new XMLHttpRequest()

          xhr.onload = function() {
            var options = {
              status: xhr.status,
              statusText: xhr.statusText,
              headers: parseHeaders(xhr.getAllResponseHeaders() || '')
            }
            options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
            var body = 'response' in xhr ? xhr.response : xhr.responseText
            resolve(new Response(body, options))
          }

          xhr.onerror = function() {
            reject(new TypeError('Network request failed'))
          }

          xhr.ontimeout = function() {
            reject(new TypeError('Network request failed'))
          }

          xhr.open(request.method, request.url, true)

          if (request.credentials === 'include') {
            xhr.withCredentials = true
          }

          if ('responseType' in xhr && support.blob) {
            xhr.responseType = 'blob'
          }

          request.headers.forEach(function(value, name) {
            xhr.setRequestHeader(name, value)
          })

          xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
        })
      }
      self.fetch.polyfill = true
    })(typeof self !== 'undefined' ? self : this);


    /***/ }),
  /* 26 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _hook = __webpack_require__(7);

    var _hook2 = _interopRequireDefault(_hook);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.inject(_hook2.default);
    }

    /***/ }),
  /* 27 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _setNativeProps = __webpack_require__(10);

    var _setNativeProps2 = _interopRequireDefault(_setNativeProps);

    var _styleUnit = __webpack_require__(16);

    var _flexbox = __webpack_require__(34);

    var _flexbox2 = _interopRequireDefault(_flexbox);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var FULL_WIDTH_REM = 750; /**
     * Web Browser driver
     **/

    var STYLE = 'style';
    var DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
    var CLASS_NAME = 'className';
    var CLASS = 'class';

    var Driver = {
      getElementById: function getElementById(id) {
        return document.getElementById(id);
      },
      getParentNode: function getParentNode(node) {
        return node.parentNode;
      },
      createBody: function createBody() {
        return document.body;
      },
      createComment: function createComment(content) {
        return document.createComment(content);
      },
      createEmpty: function createEmpty() {
        return this.createComment(' empty ');
      },
      createText: function createText(text) {
        return document.createTextNode(text);
      },
      updateText: function updateText(node, text) {
        var textContentAttr = 'textContent' in document ? 'textContent' : 'nodeValue';
        node[textContentAttr] = text;
      },
      createElement: function createElement(component) {
        var node = document.createElement(component.type);
        var props = component.props;

        (0, _setNativeProps2.default)(node, props);

        return node;
      },
      appendChild: function appendChild(node, parent) {
        return parent.appendChild(node);
      },
      removeChild: function removeChild(node, parent) {
        parent = parent || node.parentNode;
        // Maybe has been removed when remove child
        if (parent) {
          parent.removeChild(node);
        }
      },
      replaceChild: function replaceChild(newChild, oldChild, parent) {
        parent = parent || oldChild.parentNode;
        parent.replaceChild(newChild, oldChild);
      },
      insertAfter: function insertAfter(node, after, parent) {
        parent = parent || after.parentNode;
        var nextSibling = after.nextSibling;
        if (nextSibling) {
          parent.insertBefore(node, nextSibling);
        } else {
          parent.appendChild(node);
        }
      },
      insertBefore: function insertBefore(node, before, parent) {
        parent = parent || before.parentNode;
        parent.insertBefore(node, before);
      },
      addEventListener: function addEventListener(node, eventName, eventHandler) {
        return node.addEventListener(eventName, eventHandler);
      },
      removeEventListener: function removeEventListener(node, eventName, eventHandler) {
        return node.removeEventListener(eventName, eventHandler);
      },
      removeAllEventListeners: function removeAllEventListeners(node) {
        // noop
      },
      removeAttribute: function removeAttribute(node, propKey) {
        if (propKey === DANGEROUSLY_SET_INNER_HTML) {
          return node.innerHTML = null;
        }

        if (propKey === CLASS_NAME) {
          propKey = CLASS;
        }

        if (propKey in node) {
          node[propKey] = null;
        }

        node.removeAttribute(propKey);
      },
      setAttribute: function setAttribute(node, propKey, propValue) {
        if (propKey === DANGEROUSLY_SET_INNER_HTML) {
          return node.innerHTML = propValue.__html;
        }

        if (propKey === CLASS_NAME) {
          propKey = CLASS;
        }

        if (propKey in node) {
          node[propKey] = propValue;
        } else {
          node.setAttribute(propKey, propValue);
        }
      },
      setStyles: function setStyles(node, styles) {
        var tranformedStyles = {};

        for (var prop in styles) {
          var val = styles[prop];
          if (_flexbox2.default.isFlexProp(prop)) {
            _flexbox2.default[prop](val, tranformedStyles);
          } else {
            tranformedStyles[prop] = (0, _styleUnit.convertUnit)(val, prop);
          }
        }

        for (var _prop in tranformedStyles) {
          var transformValue = tranformedStyles[_prop];
          // hack handle compatibility issue
          if (Array.isArray(transformValue)) {
            for (var i = 0; i < transformValue.length; i++) {
              node.style[_prop] = transformValue[i];
            }
          } else {
            node.style[_prop] = transformValue;
          }
        }
      },
      beforeRender: function beforeRender() {
        // Init rem unit
        (0, _styleUnit.setRem)(this.getWindowWidth() / FULL_WIDTH_REM);
      },
      getWindowWidth: function getWindowWidth() {
        return document.documentElement.clientWidth;
      }
    };

    exports.default = Driver;
    module.exports = exports['default'];

    /***/ }),
  /* 28 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = undefined;

    var _weexDriver = __webpack_require__(63);

    var _weexDriver2 = _interopRequireDefault(_weexDriver);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    exports.default = _weexDriver2.default; /**
     * Weex driver
     **/

    module.exports = exports['default'];

    /***/ }),
  /* 29 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _instance = __webpack_require__(1);

    var _instance2 = _interopRequireDefault(_instance);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function findComponentInstance(node) {
      if (node == null) {
        return null;
      }
      return _instance2.default.get(node);
    }

    exports.default = findComponentInstance;
    module.exports = exports['default'];

    /***/ }),
  /* 30 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = inject;

    var _universalEnv = __webpack_require__(6);

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    var _empty = __webpack_require__(36);

    var _empty2 = _interopRequireDefault(_empty);

    var _native = __webpack_require__(13);

    var _native2 = _interopRequireDefault(_native);

    var _text = __webpack_require__(41);

    var _text2 = _interopRequireDefault(_text);

    var _composite = __webpack_require__(35);

    var _composite2 = _interopRequireDefault(_composite);

    var _fragment = __webpack_require__(37);

    var _fragment2 = _interopRequireDefault(_fragment);

    var _weex = __webpack_require__(28);

    var _weex2 = _interopRequireDefault(_weex);

    var _browser = __webpack_require__(27);

    var _browser2 = _interopRequireDefault(_browser);

    var _hook = __webpack_require__(7);

    var _hook2 = _interopRequireDefault(_hook);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function inject(_ref) {
      var driver = _ref.driver,
        hook = _ref.hook,
        measurer = _ref.measurer;

      // Inject component class
      _host2.default.EmptyComponent = _empty2.default;
      _host2.default.NativeComponent = _native2.default;
      _host2.default.TextComponent = _text2.default;
      _host2.default.FragmentComponent = _fragment2.default;
      _host2.default.CompositeComponent = _composite2.default;
      // Inject devtool hook
      _host2.default.hook = hook || _hook2.default;

      // Inject performance measurer
      _host2.default.measurer = measurer;

      // Inject render driver
      if (!_host2.default.driver) {
        if (!driver) {
          if (_universalEnv.isWeex) {
            driver = _weex2.default;
          } else if (_universalEnv.isWeb) {
            driver = _browser2.default;
          } else {
            throw Error('No builtin driver matched');
          }
        }

        _host2.default.driver = driver;
      }
    }
    module.exports = exports['default'];

    /***/ }),
  /* 31 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /*
     * Current PropTypes only export some api with react, not validate in runtime.
     */

    function createChainableTypeChecker(validate) {
      function checkType(isRequired, props, propName, componentName, location, propFullName) {
        return typeChecker;
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName) {
        // Noop
      }
      return createChainableTypeChecker(validate);
    }

    var typeChecker = createTypeChecker();

    exports.default = {
      array: typeChecker,
      bool: typeChecker,
      func: typeChecker,
      number: typeChecker,
      object: typeChecker,
      string: typeChecker,
      symbol: typeChecker,
      element: typeChecker,
      node: typeChecker,
      any: typeChecker,
      arrayOf: typeChecker,
      instanceOf: typeChecker,
      objectOf: typeChecker,
      oneOf: typeChecker,
      oneOfType: typeChecker,
      shape: typeChecker
    };
    module.exports = exports["default"];

    /***/ }),
  /* 32 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _component = __webpack_require__(3);

    var _component2 = _interopRequireDefault(_component);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
      }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    /**
     * Pure component class.
     */
    var PureComponent = function (_Component) {
      _inherits(PureComponent, _Component);

      function PureComponent(props, context) {
        _classCallCheck(this, PureComponent);

        return _possibleConstructorReturn(this, (PureComponent.__proto__ || Object.getPrototypeOf(PureComponent)).call(this, props, context));
      }

      _createClass(PureComponent, [{
        key: 'isPureComponentClass',
        value: function isPureComponentClass() {}
      }]);

      return PureComponent;
    }(_component2.default);

    exports.default = PureComponent;
    module.exports = exports['default'];

    /***/ }),
  /* 33 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _inject = __webpack_require__(30);

    var _inject2 = _interopRequireDefault(_inject);

    var _instance = __webpack_require__(1);

    var _instance2 = _interopRequireDefault(_instance);

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function render(element, container, options, callback) {
      // Compatible with `render(element, container, callback)`
      if (typeof options === 'function') {
        callback = options;
        options = null;
      }

      // Init inject
      (0, _inject2.default)(options || {});

      var rootComponent = _instance2.default.render(element, container);
      var component = rootComponent.getPublicInstance();

      if (callback) {
        callback.call(component);
      }

      return component;
    }

    exports.default = render;
    module.exports = exports['default'];

    /***/ }),
  /* 34 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BOX_ALIGN = {
      stretch: 'stretch',
      'flex-start': 'start',
      'flex-end': 'end',
      center: 'center'
    };

    var BOX_ORIENT = {
      row: 'horizontal',
      column: 'vertical'
    };

    var BOX_PACK = {
      'flex-start': 'start',
      'flex-end': 'end',
      center: 'center',
      'space-between': 'justify',
      'space-around': 'justify' // Just same as `space-between`
    };

    var FLEX_PROPS = {
      display: true,
      flex: true,
      alignItems: true,
      alignSelf: true,
      flexDirection: true,
      justifyContent: true,
      flexWrap: true
    };

    var Flexbox = {
      isFlexProp: function isFlexProp(prop) {
        return FLEX_PROPS[prop];
      },
      display: function display(value) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (value === 'flex') {
          style.display = ['-webkit-box', '-webkit-flex', 'flex'];
        } else {
          style.display = value;
        }

        return style;
      },
      flex: function flex(value) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        style.webkitBoxFlex = value;
        style.webkitFlex = value;
        style.flex = value;
        return style;
      },
      flexWrap: function flexWrap(value) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        style.flexWrap = value;
        return style;
      },
      alignItems: function alignItems(value) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        style.webkitBoxAlign = BOX_ALIGN[value];
        style.webkitAlignItems = value;
        style.alignItems = value;
        return style;
      },
      alignSelf: function alignSelf(value) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        style.webkitAlignSelf = value;
        style.alignSelf = value;
        return style;
      },
      flexDirection: function flexDirection(value) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        style.webkitBoxOrient = BOX_ORIENT[value];
        style.webkitFlexDirection = value;
        style.flexDirection = value;
        return style;
      },
      justifyContent: function justifyContent(value) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        style.webkitBoxPack = BOX_PACK[value];
        style.webkitJustifyContent = value;
        style.justifyContent = value;
        return style;
      }
    };

    exports.default = Flexbox;
    module.exports = exports['default'];

    /***/ }),
  /* 35 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _stateless = __webpack_require__(40);

    var _stateless2 = _interopRequireDefault(_stateless);

    var _updater = __webpack_require__(42);

    var _updater2 = _interopRequireDefault(_updater);

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    var _ref = __webpack_require__(14);

    var _ref2 = _interopRequireDefault(_ref);

    var _instantiateComponent = __webpack_require__(2);

    var _instantiateComponent2 = _interopRequireDefault(_instantiateComponent);

    var _shouldUpdateComponent = __webpack_require__(4);

    var _shouldUpdateComponent2 = _interopRequireDefault(_shouldUpdateComponent);

    var _shallowEqual = __webpack_require__(39);

    var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function performInSandbox(fn, handleError) {
      try {
        return fn();
      } catch (e) {
        if (handleError) {
          handleError(e);
        } else {
          if (_host2.default.sandbox) {
            setTimeout(function () {
              throw e;
            }, 0);
          } else {
            throw e;
          }
        }
      }
    }

    var measureLifeCycle = void 0;
    if (false) {
      measureLifeCycle = function measureLifeCycle(callback, instanceID, type) {
        _host2.default.measurer && _host2.default.measurer.beforeLifeCycle(instanceID, type);
        performInSandbox(callback);
        _host2.default.measurer && _host2.default.measurer.afterLifeCycle(instanceID, type);
      };
    }

    /**
     * Composite Component
     */

    var CompositeComponent = function () {
      function CompositeComponent(element) {
        _classCallCheck(this, CompositeComponent);

        this._currentElement = element;
      }

      _createClass(CompositeComponent, [{
        key: 'getName',
        value: function getName() {
          var type = this._currentElement.type;
          var constructor = this._instance && this._instance.constructor;
          return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
        }
      }, {
        key: 'mountComponent',
        value: function mountComponent(parent, context, childMounter) {
          var _this = this;

          this._parent = parent;
          this._context = context;
          this._mountID = _host2.default.mountID++;
          this._updateCount = 0;

          if (false) {
            _host2.default.measurer && _host2.default.measurer.beforeMountComponent(this._mountID, this);
          }

          var Component = this._currentElement.type;
          var publicProps = this._currentElement.props;
          var isClass = Component.prototype;
          var isComponentClass = isClass && Component.prototype.isComponentClass;
          // Class stateless component without state but have lifecycles
          var isStatelessClass = isClass && Component.prototype.render;

          // Context process
          var publicContext = this._processContext(context);

          // Initialize the public class
          var instance = void 0;
          var renderedElement = void 0;

          if (isComponentClass || isStatelessClass) {
            // Component instance
            instance = new Component(publicProps, publicContext, _updater2.default);
          } else if (typeof Component === 'function') {
            // Functional stateless component without state and lifecycles
            instance = new _stateless2.default(Component);
          } else {
            throw Error('Invalid component type ' + JSON.stringify(Component));
          }

          // These should be set up in the constructor, but as a convenience for
          // simpler class abstractions, we set them up after the fact.
          instance.props = publicProps;
          instance.context = publicContext;
          instance.refs = {};

          // Inject the updater into instance
          instance.updater = _updater2.default;
          instance._internal = this;
          this._instance = instance;

          // Init state, must be set to an object or null
          var initialState = instance.state;
          if (initialState === undefined) {
            // TODO clone the state?
            instance.state = initialState = null;
          }

          performInSandbox(function () {
            if (instance.componentWillMount) {
              if (false) {
                measureLifeCycle(function () {
                  instance.componentWillMount();
                }, _this._mountID, 'componentWillMount');
              } else {
                instance.componentWillMount();
              }
            }
          });

          if (renderedElement == null) {
            _host2.default.component = this;
            // Process pending state when call setState in componentWillMount
            instance.state = this._processPendingState(publicProps, publicContext);

            // FIXME: handleError should named as lifecycles
            var handleError = void 0;
            if (typeof instance.handleError === 'function') {
              handleError = function handleError(e) {
                instance.handleError(e);
              };
            }

            performInSandbox(function () {
              if (false) {
                measureLifeCycle(function () {
                  renderedElement = instance.render();
                }, _this._mountID, 'render');
              } else {
                renderedElement = instance.render();
              }
            }, handleError);

            _host2.default.component = null;
          }

          this._renderedComponent = (0, _instantiateComponent2.default)(renderedElement);
          this._renderedComponent.mountComponent(this._parent, this._processChildContext(context), childMounter);

          if (this._currentElement && this._currentElement.ref) {
            _ref2.default.attach(this._currentElement._owner, this._currentElement.ref, this);
          }

          performInSandbox(function () {
            if (instance.componentDidMount) {
              if (false) {
                measureLifeCycle(function () {
                  instance.componentDidMount();
                }, _this._mountID, 'componentDidMount');
              } else {
                instance.componentDidMount();
              }
            }
          });

          _host2.default.hook.Reconciler.mountComponent(this);

          if (false) {
            _host2.default.measurer && _host2.default.measurer.afterMountComponent(this._mountID);
          }

          return instance;
        }
      }, {
        key: 'unmountComponent',
        value: function unmountComponent(notRemoveChild) {
          var instance = this._instance;

          performInSandbox(function () {
            if (instance.componentWillUnmount) {
              instance.componentWillUnmount();
            }
          });

          _host2.default.hook.Reconciler.unmountComponent(this);

          instance._internal = null;

          if (this._renderedComponent != null) {
            var ref = this._currentElement.ref;
            if (ref) {
              _ref2.default.detach(this._currentElement._owner, ref, this);
            }

            this._renderedComponent.unmountComponent(notRemoveChild);
            this._renderedComponent = null;
            this._instance = null;
          }

          this._currentElement = null;

          // Reset pending fields
          // Even if this component is scheduled for another update in ReactUpdates,
          // it would still be ignored because these fields are reset.
          this._pendingStateQueue = null;
          this._pendingForceUpdate = false;

          // These fields do not really need to be reset since this object is no
          // longer accessible.
          this._context = null;
        }

        /**
         * Filters the context object to only contain keys specified in
         * `contextTypes`
         */

      }, {
        key: '_processContext',
        value: function _processContext(context) {
          var Component = this._currentElement.type;
          var contextTypes = Component.contextTypes;
          if (!contextTypes) {
            return {};
          }
          var maskedContext = {};
          for (var contextName in contextTypes) {
            maskedContext[contextName] = context[contextName];
          }
          return maskedContext;
        }
      }, {
        key: '_processChildContext',
        value: function _processChildContext(currentContext) {
          var instance = this._instance;
          var childContext = instance.getChildContext && instance.getChildContext();
          if (childContext) {
            return Object.assign({}, currentContext, childContext);
          }
          return currentContext;
        }
      }, {
        key: '_processPendingState',
        value: function _processPendingState(props, context) {
          var instance = this._instance;
          var queue = this._pendingStateQueue;
          if (!queue) {
            return instance.state;
          }
          // Reset pending queue
          this._pendingStateQueue = null;
          var nextState = Object.assign({}, instance.state);
          for (var i = 0; i < queue.length; i++) {
            var partial = queue[i];
            Object.assign(nextState, typeof partial === 'function' ? partial.call(instance, nextState, props, context) : partial);
          }

          return nextState;
        }
      }, {
        key: 'updateComponent',
        value: function updateComponent(prevElement, nextElement, prevUnmaskedContext, nextUnmaskedContext) {
          var instance = this._instance;

          if (false) {
            _host2.default.measurer && _host2.default.measurer.beforeUpdateComponent(this._mountID, this);
          }

          if (!instance) {
            console.error('Update component \'' + this.getName() + '\' that has already been unmounted (or failed to mount).');
          }

          var willReceive = false;
          var nextContext = void 0;
          var nextProps = void 0;

          // Determine if the context has changed or not
          if (this._context === nextUnmaskedContext) {
            nextContext = instance.context;
          } else {
            nextContext = this._processContext(nextUnmaskedContext);
            willReceive = true;
          }

          // Distinguish between a props update versus a simple state update
          if (prevElement === nextElement) {
            // Skip checking prop types again -- we don't read component.props to avoid
            // warning for DOM component props in this upgrade
            nextProps = nextElement.props;
          } else {
            nextProps = nextElement.props;
            willReceive = true;
          }

          var hasReceived = willReceive && instance.componentWillReceiveProps;

          if (hasReceived) {
            // Calling this.setState() within componentWillReceiveProps will not trigger an additional render.
            this._pendingState = true;
            performInSandbox(function () {
              instance.componentWillReceiveProps(nextProps, nextContext);
            });
            this._pendingState = false;
          }

          // Update refs
          _ref2.default.update(prevElement, nextElement, this);

          // Shoud update always default
          var shouldUpdate = true;
          var prevProps = instance.props;
          var prevState = instance.state;
          // TODO: could delay execution processPendingState
          var nextState = this._processPendingState(nextProps, nextContext);

          // ShouldComponentUpdate is not called when forceUpdate is used
          if (!this._pendingForceUpdate) {
            if (instance.shouldComponentUpdate) {
              shouldUpdate = performInSandbox(function () {
                return instance.shouldComponentUpdate(nextProps, nextState, nextContext);
              });
            } else if (instance.isPureComponentClass) {
              shouldUpdate = !(0, _shallowEqual2.default)(prevProps, nextProps) || !(0, _shallowEqual2.default)(prevState, nextState);
            }
          }

          if (shouldUpdate) {
            this._pendingForceUpdate = false;
            // Will set `this.props`, `this.state` and `this.context`.
            var prevContext = instance.context;

            // Cannot use this.setState() in componentWillUpdate.
            // If need to update state in response to a prop change, use componentWillReceiveProps instead.
            performInSandbox(function () {
              if (instance.componentWillUpdate) {
                instance.componentWillUpdate(nextProps, nextState, nextContext);
              }
            });

            // Replace with next
            this._currentElement = nextElement;
            this._context = nextUnmaskedContext;
            instance.props = nextProps;
            instance.state = nextState;
            instance.context = nextContext;

            this._updateRenderedComponent(nextUnmaskedContext);

            performInSandbox(function () {
              if (instance.componentDidUpdate) {
                instance.componentDidUpdate(prevProps, prevState, prevContext);
              }
            });

            this._updateCount++;
          } else {
            // If it's determined that a component should not update, we still want
            // to set props and state but we shortcut the rest of the update.
            this._currentElement = nextElement;
            this._context = nextUnmaskedContext;
            instance.props = nextProps;
            instance.state = nextState;
            instance.context = nextContext;
          }

          // Flush setState callbacks set in componentWillReceiveProps
          if (hasReceived) {
            var callbacks = this._pendingCallbacks;
            this._pendingCallbacks = null;
            _updater2.default.runCallbacks(callbacks, instance);
          }

          if (false) {
            _host2.default.measurer && _host2.default.measurer.afterUpdateComponent(this._mountID);
          }

          _host2.default.hook.Reconciler.receiveComponent(this);
        }

        /**
         * Call the component's `render` method and update the DOM accordingly.
         */

      }, {
        key: '_updateRenderedComponent',
        value: function _updateRenderedComponent(context) {
          var _this2 = this;

          var prevRenderedComponent = this._renderedComponent;
          var prevRenderedElement = prevRenderedComponent._currentElement;

          var instance = this._instance;
          var nextRenderedElement = void 0;

          _host2.default.component = this;

          performInSandbox(function () {
            if (false) {
              measureLifeCycle(function () {
                nextRenderedElement = instance.render();
              }, _this2._mountID, 'render');
            } else {
              nextRenderedElement = instance.render();
            }
          });

          _host2.default.component = null;

          if ((0, _shouldUpdateComponent2.default)(prevRenderedElement, nextRenderedElement)) {
            prevRenderedComponent.updateComponent(prevRenderedElement, nextRenderedElement, prevRenderedComponent._context, this._processChildContext(context));
            if (false) {
              _host2.default.measurer && _host2.default.measurer.recordOperation({
                instanceID: this._mountID,
                type: 'update component',
                payload: {}
              });
            }
          } else {
            var oldChild = prevRenderedComponent.getNativeNode();
            prevRenderedComponent.unmountComponent(true);

            this._renderedComponent = (0, _instantiateComponent2.default)(nextRenderedElement);
            this._renderedComponent.mountComponent(this._parent, this._processChildContext(context), function (newChild, parent) {
              // TODO: Duplicate code in native component file
              if (!Array.isArray(newChild)) {
                newChild = [newChild];
              }

              // oldChild or newChild all maybe fragment
              if (!Array.isArray(oldChild)) {
                oldChild = [oldChild];
              }

              // If newChild count large then oldChild
              var lastNewChild = void 0;
              for (var i = 0; i < newChild.length; i++) {
                var child = newChild[i];
                if (oldChild[i]) {
                  _host2.default.driver.replaceChild(child, oldChild[i]);
                } else {
                  _host2.default.driver.insertAfter(child, lastNewChild);
                }
                lastNewChild = child;
              }

              // If newChild count less then oldChild
              if (newChild.length < oldChild.length) {
                for (var _i = newChild.length; _i < oldChild.length; _i++) {
                  _host2.default.driver.removeChild(oldChild[_i]);
                }
              }
            });
          }
        }
      }, {
        key: 'getNativeNode',
        value: function getNativeNode() {
          var renderedComponent = this._renderedComponent;
          if (renderedComponent) {
            return renderedComponent.getNativeNode();
          }
        }
      }, {
        key: 'getPublicInstance',
        value: function getPublicInstance() {
          var instance = this._instance;
          // The Stateless components cannot be given refs
          if (instance instanceof _stateless2.default) {
            return null;
          }
          return instance;
        }
      }]);

      return CompositeComponent;
    }();

    exports.default = CompositeComponent;
    module.exports = exports['default'];

    /***/ }),
  /* 36 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    /**
     * Empty Component
     */
    var EmptyComponent = function () {
      function EmptyComponent() {
        _classCallCheck(this, EmptyComponent);

        this._currentElement = null;
      }

      _createClass(EmptyComponent, [{
        key: 'mountComponent',
        value: function mountComponent(parent, context, childMounter) {
          this._parent = parent;
          this._context = context;

          var instance = {
            _internal: this
          };

          var nativeNode = this.getNativeNode();
          if (childMounter) {
            childMounter(nativeNode, parent);
          } else {
            _host2.default.driver.appendChild(nativeNode, parent);
          }

          return instance;
        }
      }, {
        key: 'unmountComponent',
        value: function unmountComponent(notRemoveChild) {
          if (this._nativeNode && !notRemoveChild) {
            _host2.default.driver.removeChild(this._nativeNode, this._parent);
          }

          this._nativeNode = null;
          this._parent = null;
          this._context = null;
        }
      }, {
        key: 'updateComponent',
        value: function updateComponent() {
          // Noop
        }
      }, {
        key: 'getNativeNode',
        value: function getNativeNode() {
          // Weex native node
          if (this._nativeNode == null) {
            this._nativeNode = _host2.default.driver.createEmpty();
          }

          return this._nativeNode;
        }
      }]);

      return EmptyComponent;
    }();

    exports.default = EmptyComponent;
    module.exports = exports['default'];

    /***/ }),
  /* 37 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    var _native = __webpack_require__(13);

    var _native2 = _interopRequireDefault(_native);

    var _instance = __webpack_require__(1);

    var _instance2 = _interopRequireDefault(_instance);

    var _instantiateComponent = __webpack_require__(2);

    var _instantiateComponent2 = _interopRequireDefault(_instantiateComponent);

    var _getElementKeyName = __webpack_require__(12);

    var _getElementKeyName2 = _interopRequireDefault(_getElementKeyName);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
      }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    /**
     * Fragment Component
     */
    var FragmentComponent = function (_NativeComponent) {
      _inherits(FragmentComponent, _NativeComponent);

      function FragmentComponent(element) {
        _classCallCheck(this, FragmentComponent);

        return _possibleConstructorReturn(this, (FragmentComponent.__proto__ || Object.getPrototypeOf(FragmentComponent)).call(this, element));
      }

      _createClass(FragmentComponent, [{
        key: 'mountComponent',
        value: function mountComponent(parent, context, childMounter) {
          // Parent native element
          this._parent = parent;
          this._context = context;
          this._mountID = _host2.default.mountID++;

          var instance = {
            _internal: this
          };
          this._instance = instance;

          var fragment = this.getNativeNode();
          var children = this._currentElement;

          // Process children
          this.mountChildren(children, context);

          if (childMounter) {
            childMounter(fragment, parent);
          } else {
            var isFragmentParent = Array.isArray(parent);
            for (var i = 0; i < fragment.length; i++) {
              var child = fragment[i];
              // When the parent is also a fragment
              if (isFragmentParent) {
                parent.push(child);
              } else {
                _host2.default.driver.appendChild(child, parent);
              }
            }
          }

          return instance;
        }
      }, {
        key: 'mountChildren',
        value: function mountChildren(children, context) {
          var _this2 = this;

          var renderedChildren = {};
          var fragment = this.getNativeNode();

          var renderedChildrenImage = children.map(function (element, index) {
            var renderedChild = (0, _instantiateComponent2.default)(element);
            var name = (0, _getElementKeyName2.default)(renderedChildren, element, index);
            renderedChildren[name] = renderedChild;
            renderedChild._mountIndex = index;
            // Mount
            var mountImage = renderedChild.mountComponent(_this2._parent, context, function (nativeNode) {
              if (Array.isArray(nativeNode)) {
                for (var i = 0; i < nativeNode.length; i++) {
                  fragment.push(nativeNode[i]);
                }
              } else {
                fragment.push(nativeNode);
              }
            });
            return mountImage;
          });

          this._renderedChildren = renderedChildren;

          return renderedChildrenImage;
        }
      }, {
        key: 'unmountComponent',
        value: function unmountComponent(notRemoveChild) {
          if (this._nativeNode) {
            _instance2.default.remove(this._nativeNode);
            if (!notRemoveChild) {
              for (var i = 0; i < this._nativeNode.length; i++) {
                _host2.default.driver.removeChild(this._nativeNode[i]);
              }
            }
          }

          // Do not need remove child when their parent is removed
          this.unmountChildren(true);

          this._currentElement = null;
          this._nativeNode = null;
          this._parent = null;
          this._context = null;
          this._instance = null;
        }
      }, {
        key: 'updateComponent',
        value: function updateComponent(prevElement, nextElement, prevContext, nextContext) {
          // Replace current element
          this._currentElement = nextElement;
          this.updateChildren(this._currentElement, nextContext);
        }
      }, {
        key: 'getNativeNode',
        value: function getNativeNode() {
          if (this._nativeNode == null) {
            this._nativeNode = [];
          }

          return this._nativeNode;
        }
      }, {
        key: 'getPublicInstance',
        value: function getPublicInstance() {
          return this.getNativeNode();
        }
      }, {
        key: 'getName',
        value: function getName() {
          return 'fragment';
        }
      }]);

      return FragmentComponent;
    }(_native2.default);

    exports.default = FragmentComponent;
    module.exports = exports['default'];

    /***/ }),
  /* 38 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _component = __webpack_require__(3);

    var _component2 = _interopRequireDefault(_component);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
      }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var rootCounter = 1;

    var Root = function (_Component) {
      _inherits(Root, _Component);

      function Root() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Root);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Root.__proto__ || Object.getPrototypeOf(Root)).call.apply(_ref, [this].concat(args))), _this), _this.rootID = rootCounter++, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(Root, [{
        key: 'isRootComponent',
        value: function isRootComponent() {}
      }, {
        key: 'render',
        value: function render() {
          return this.props.children;
        }
      }, {
        key: 'getPublicInstance',
        value: function getPublicInstance() {
          return this.getRenderedComponent().getPublicInstance();
        }
      }, {
        key: 'getRenderedComponent',
        value: function getRenderedComponent() {
          return this._internal._renderedComponent;
        }
      }]);

      return Root;
    }(_component2.default);

    exports.default = Root;
    module.exports = exports['default'];

    /***/ }),
  /* 39 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }

    /**
     * Performs equality by iterating through keys on an object and returning false
     * when any key has values which are not strictly equal between the arguments.
     * Returns true when the values of all keys are strictly equal.
     */
    function shallowEqual(objA, objB) {
      if (is(objA, objB)) {
        return true;
      }

      if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
        return false;
      }

      var keysA = Object.keys(objA);
      var keysB = Object.keys(objB);

      if (keysA.length !== keysB.length) {
        return false;
      }

      // Test for A's keys different from B.
      for (var i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
          return false;
        }
      }

      return true;
    }

    exports.default = shallowEqual;
    module.exports = exports['default'];

    /***/ }),
  /* 40 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    /**
     * Stateless Component Class Wrapper
     */
    var StatelessComponent = function () {
      function StatelessComponent(pureRender) {
        _classCallCheck(this, StatelessComponent);

        // A stateless function
        this.pureRender = pureRender;
      }

      _createClass(StatelessComponent, [{
        key: 'render',
        value: function render() {
          if (false) {
            _host2.default.measurer && _host2.default.measurer.beforeRender();
          }

          return this.pureRender(this.props, this.context);
        }
      }]);

      return StatelessComponent;
    }();

    exports.default = StatelessComponent;
    module.exports = exports['default'];

    /***/ }),
  /* 41 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
      }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
    }();

    var _host = __webpack_require__(0);

    var _host2 = _interopRequireDefault(_host);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    /**
     * Text Component
     */
    var TextComponent = function () {
      function TextComponent(element) {
        _classCallCheck(this, TextComponent);

        this._currentElement = element;
        this._stringText = String(element);
      }

      _createClass(TextComponent, [{
        key: 'mountComponent',
        value: function mountComponent(parent, context, childMounter) {
          this._parent = parent;
          this._context = context;
          this._mountID = _host2.default.mountID++;

          // Weex dom operation
          var nativeNode = this.getNativeNode();

          if (childMounter) {
            childMounter(nativeNode, parent);
          } else {
            _host2.default.driver.appendChild(nativeNode, parent);
          }

          var instance = {
            _internal: this
          };

          _host2.default.hook.Reconciler.mountComponent(this);

          return instance;
        }
      }, {
        key: 'unmountComponent',
        value: function unmountComponent(notRemoveChild) {
          if (this._nativeNode && !notRemoveChild) {
            _host2.default.driver.removeChild(this._nativeNode, this._parent);
          }

          _host2.default.hook.Reconciler.unmountComponent(this);

          this._currentElement = null;
          this._nativeNode = null;
          this._parent = null;
          this._context = null;
          this._stringText = null;
        }
      }, {
        key: 'updateComponent',
        value: function updateComponent(prevElement, nextElement, context) {
          // If some text do noting
          if (prevElement !== nextElement) {
            // Replace current element
            this._currentElement = nextElement;
            // Devtool read the latest stringText value
            this._stringText = String(nextElement);
            _host2.default.driver.updateText(this.getNativeNode(), this._stringText);
            _host2.default.hook.Reconciler.receiveComponent(this);
          }
        }
      }, {
        key: 'getNativeNode',
        value: function getNativeNode() {
          if (this._nativeNode == null) {
            this._nativeNode = _host2.default.driver.createText(this._stringText);
          }
          return this._nativeNode;
        }
      }]);

      return TextComponent;
    }();

    exports.default = TextComponent;
    module.exports = exports['default'];

    /***/ }),
  /* 42 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function enqueueCallback(internal, callback) {
      if (callback) {
        var callbackQueue = internal._pendingCallbacks || (internal._pendingCallbacks = []);
        callbackQueue.push(callback);
      }
    }

    function enqueueState(internal, partialState) {
      if (partialState) {
        var stateQueue = internal._pendingStateQueue || (internal._pendingStateQueue = []);
        stateQueue.push(partialState);
      }
    }

    var Updater = {
      setState: function setState(component, partialState, callback) {
        var internal = component._internal;

        if (!internal) {
          return;
        }

        enqueueState(internal, partialState);
        enqueueCallback(internal, callback);

        if (!internal._pendingState) {
          this.runUpdate(component);
        }
      },

      forceUpdate: function forceUpdate(component, callback) {
        var internal = component._internal;

        if (!internal) {
          return;
        }

        internal._pendingForceUpdate = true;

        enqueueCallback(internal, callback);
        this.runUpdate(component);
      },

      runUpdate: function runUpdate(component) {
        var internal = component._internal;

        if (!internal || !internal._renderedComponent) {
          return;
        }

        // If updateComponent happens to enqueue any new updates, we
        // shouldn't execute the callbacks until the next render happens, so
        // stash the callbacks first
        var callbacks = internal._pendingCallbacks;
        internal._pendingCallbacks = null;

        var prevElement = internal._currentElement;
        var prevUnmaskedContext = internal._context;

        if (internal._pendingStateQueue || internal._pendingForceUpdate) {
          internal.updateComponent(prevElement, prevElement, prevUnmaskedContext, prevUnmaskedContext);
        }

        this.runCallbacks(callbacks, component);
      },

      runCallbacks: function runCallbacks(callbacks, context) {
        if (callbacks) {
          for (var i = 0; i < callbacks.length; i++) {
            callbacks[i].call(context);
          }
        }
      }
    };

    exports.default = Updater;
    module.exports = exports["default"];

    /***/ }),
  /* 43 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = '0.3.2';
    module.exports = exports['default'];

    /***/ }),
  /* 44 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var FontFace = function FontFace(family, source) {
      _classCallCheck(this, FontFace);

      this.family = family;
      this.source = source;
    };

    module.exports = FontFace;

    /***/ }),
  /* 45 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _symbol = __webpack_require__(5);

    var _symbol2 = _interopRequireDefault(_symbol);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

// Deleted map items mess with iterator pointers, so rather than removing them mark them as deleted. Can't use undefined or null since those both valid keys so use a private symbol.
    var undefMarker = (0, _symbol2.default)('undef');
// NaN cannot be found in an array using indexOf, so we encode NaNs using a private symbol.
    /* eslint no-extend-native: "off" */
    var NaNMarker = (0, _symbol2.default)('NaN');
    var ACCESSOR_SUPPORT = true;

    function encodeKey(key) {
      return Number.isNaN(key) ? NaNMarker : key;
    }

    function decodeKey(encodedKey) {
      return encodedKey === NaNMarker ? NaN : encodedKey;
    }

    function makeIterator(mapInst, getter) {
      var nextIdx = 0;
      var done = false;
      return {
        next: function next() {
          if (nextIdx === mapInst._keys.length) done = true;
          if (!done) {
            while (mapInst._keys[nextIdx] === undefMarker) {
              nextIdx++;
            }return { value: getter.call(mapInst, nextIdx++), done: false };
          } else {
            return { value: void 0, done: true };
          }
        }
      };
    }

    function calcSize(mapInst) {
      var size = 0;
      for (var i = 0, s = mapInst._keys.length; i < s; i++) {
        if (mapInst._keys[i] !== undefMarker) size++;
      }
      return size;
    }

    function hasProtoMethod(instance, method) {
      return typeof instance[method] === 'function';
    }

    var Map = function Map(data) {
      this._keys = [];
      this._values = [];
      // If `data` is iterable (indicated by presence of a forEach method), pre-populate the map
      if (data && hasProtoMethod(data, 'forEach')) {
        // Fastpath: If `data` is a Map, shortcircuit all following the checks
        if (data instanceof Map ||
          // If `data` is not an instance of Map, it could be because you have a Map from an iframe or a worker or something.
          // Check if  `data` has all the `Map` methods and if so, assume data is another Map
          hasProtoMethod(data, 'clear') && hasProtoMethod(data, 'delete') && hasProtoMethod(data, 'entries') && hasProtoMethod(data, 'forEach') && hasProtoMethod(data, 'get') && hasProtoMethod(data, 'has') && hasProtoMethod(data, 'keys') && hasProtoMethod(data, 'set') && hasProtoMethod(data, 'values')) {
          data.forEach(function (value, key) {
            this.set.apply(this, [key, value]);
          }, this);
        } else {
          data.forEach(function (item) {
            this.set.apply(this, item);
          }, this);
        }
      }

      if (!ACCESSOR_SUPPORT) this.size = calcSize(this);
    };
    Map.prototype = {};

// Some old engines do not support ES5 getters/setters.  Since Map only requires these for the size property, we can fall back to setting the size property statically each time the size of the map changes.
    try {
      Object.defineProperty(Map.prototype, 'size', {
        get: function get() {
          return calcSize(this);
        }
      });
    } catch (e) {
      ACCESSOR_SUPPORT = false;
    }

    Map.prototype.get = function (key) {
      var idx = this._keys.indexOf(encodeKey(key));
      return idx !== -1 ? this._values[idx] : undefined;
    };
    Map.prototype.set = function (key, value) {
      var idx = this._keys.indexOf(encodeKey(key));
      if (idx !== -1) {
        this._values[idx] = value;
      } else {
        this._keys.push(encodeKey(key));
        this._values.push(value);
        if (!ACCESSOR_SUPPORT) this.size = calcSize(this);
      }
      return this;
    };
    Map.prototype.has = function (key) {
      return this._keys.indexOf(encodeKey(key)) !== -1;
    };
    Map.prototype.delete = function (key) {
      var idx = this._keys.indexOf(encodeKey(key));
      if (idx === -1) return false;
      this._keys[idx] = undefMarker;
      this._values[idx] = undefMarker;
      if (!ACCESSOR_SUPPORT) this.size = calcSize(this);
      return true;
    };
    Map.prototype.clear = function () {
      this._keys = this._values = [];
      if (!ACCESSOR_SUPPORT) this.size = 0;
    };
    Map.prototype.values = function () {
      return makeIterator(this, function (i) {
        return this._values[i];
      });
    };
    Map.prototype.keys = function () {
      return makeIterator(this, function (i) {
        return decodeKey(this._keys[i]);
      });
    };
    Map.prototype.entries = Map.prototype[_symbol2.default.iterator] = function () {
      return makeIterator(this, function (i) {
        return [decodeKey(this._keys[i]), this._values[i]];
      });
    };
    Map.prototype.forEach = function (callbackFn, thisArg) {
      thisArg = thisArg || global;
      var iterator = this.entries();
      var result = iterator.next();
      while (result.done === false) {
        callbackFn.call(thisArg, result.value[1], result.value[0], this);
        result = iterator.next();
      }
    };

    Map.prototype[_symbol2.default.species] = Map;

    Object.defineProperty(Map, 'constructor', {
      value: Map
    });

    try {
      Object.defineProperty(Map, 'length', {
        value: 0
      });
    } catch (e) {}

    module.exports = Map;

    /***/ }),
  /* 46 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


// https://github.com/ericf/css-mediaquery

    var RE_MEDIA_QUERY = /^(?:(only|not)?\s*([_a-z][_a-z0-9-]*)|(\([^\)]+\)))(?:\s*and\s*(.*))?$/i,
      RE_MQ_EXPRESSION = /^\(\s*([_a-z-][_a-z0-9-]*)\s*(?:\:\s*([^\)]+))?\s*\)$/,
      RE_MQ_FEATURE = /^(?:(min|max)-)?(.+)/;

    function _matches(media, values) {
      return _parseQuery(media).some(function (query) {
        var inverse = query.inverse;

        var typeMatch = query.type === 'all' || values.type === query.type;

        if (typeMatch && inverse || !(typeMatch || inverse)) {
          return false;
        }

        var expressionsMatch = query.expressions.every(function (expression) {
          var feature = expression.feature,
            modifier = expression.modifier,
            expValue = expression.value,
            value = values[feature];

          if (!value) {
            return false;
          }

          switch (feature) {
            case 'width':
            case 'height':
              expValue = parseFloat(expValue);
              value = parseFloat(value);
              break;
          }

          switch (modifier) {
            case 'min':
              return value >= expValue;
            case 'max':
              return value <= expValue;
            default:
              return value === expValue;
          }
        });

        return expressionsMatch && !inverse || !expressionsMatch && inverse;
      });
    };

    function _parseQuery(media) {
      return media.split(',').map(function (query) {
        query = query.trim();

        var captures = query.match(RE_MEDIA_QUERY);

        if (!captures) {
          throw new SyntaxError('Invalid CSS media query: "' + query + '"');
        }

        var modifier = captures[1],
          type = captures[2],
          expressions = ((captures[3] || '') + (captures[4] || '')).trim(),
          parsed = {};

        parsed.inverse = !!modifier && modifier.toLowerCase() === 'not';
        parsed.type = type ? type.toLowerCase() : 'all';

        if (!expressions) {
          parsed.expressions = [];
          return parsed;
        }

        expressions = expressions.match(/\([^\)]+\)/g);

        if (!expressions) {
          throw new SyntaxError('Invalid CSS media query: "' + query + '"');
        }

        parsed.expressions = expressions.map(function (expression) {
          var captures = expression.match(RE_MQ_EXPRESSION);

          if (!captures) {
            throw new SyntaxError('Invalid CSS media query: "' + query + '"');
          }

          var feature = captures[1].toLowerCase().match(RE_MQ_FEATURE);

          return {
            modifier: feature[1],
            feature: feature[2],
            value: captures[2]
          };
        });

        return parsed;
      });
    };

    function matchMedia(media) {
      var mql = {
        matches: false,
        media: media
      };

      if (media === '') {
        mql.matches = true;
        return mql;
      }

      mql.matches = _matches(media, {
        type: 'screen',
        width: window.screen.width,
        height: window.screen.height
      });

      return mql;
    }

    module.exports = matchMedia;

    /***/ }),
  /* 47 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    /* eslint no-extend-native: "off" */

    function noop() {}

// Use polyfill for setImmediate for performance gains
    var asap = typeof setImmediate === 'function' && setImmediate || function (fn) {
        if (typeof setTimeout === 'function') {
          setTimeout(fn, 0);
        } else {
          fn();
        }
      };

    var onUnhandledRejection = function onUnhandledRejection(err) {
      if (typeof console !== 'undefined' && console) {
        console.log('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
      }
    };

// Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
      return function () {
        fn.apply(thisArg, arguments);
      };
    }

    function Promise(fn) {
      if (_typeof(this) !== 'object') throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function') throw new TypeError('Promise resolver is not a function');
      this._state = 0;
      this._handled = false;
      this._value = undefined;
      this._deferreds = [];

      doResolve(fn, this);
    }

    function handle(self, deferred) {
      while (self._state === 3) {
        self = self._value;
      }
      if (self._state === 0) {
        self._deferreds.push(deferred);
        return;
      }
      self._handled = true;
      asap(function () {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
          return;
        }
        var ret;
        try {
          ret = cb(self._value);
        } catch (e) {
          reject(deferred.promise, e);
          return;
        }
        resolve(deferred.promise, ret);
      });
    }

    function resolve(self, newValue) {
      try {
        // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
        if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
          var then = newValue.then;
          if (newValue instanceof Promise) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
          } else if (typeof then === 'function') {
            doResolve(bind(then, newValue), self);
            return;
          }
        }
        self._state = 1;
        self._value = newValue;
        finale(self);
      } catch (e) {
        reject(self, e);
      }
    }

    function reject(self, newValue) {
      self._state = 2;
      self._value = newValue;
      finale(self);
    }

    function finale(self) {
      if (self._state === 2 && self._deferreds.length === 0) {
        asap(function () {
          if (!self._handled) {
            onUnhandledRejection(self._value);
          }
        });
      }

      for (var i = 0, len = self._deferreds.length; i < len; i++) {
        handle(self, self._deferreds[i]);
      }
      self._deferreds = null;
    }

    function Handler(onFulfilled, onRejected, promise) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.promise = promise;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, self) {
      var done = false;
      try {
        fn(function (value) {
          if (done) return;
          done = true;
          resolve(self, value);
        }, function (reason) {
          if (done) return;
          done = true;
          reject(self, reason);
        });
      } catch (ex) {
        if (done) return;
        done = true;
        reject(self, ex);
      }
    }

    Promise.prototype.catch = function (onRejected) {
      return this.then(null, onRejected);
    };

    Promise.prototype.then = function (onFulfilled, onRejected) {
      var prom = new this.constructor(noop);

      handle(this, new Handler(onFulfilled, onRejected, prom));
      return prom;
    };

    Promise.all = function (arr) {
      var args = Array.prototype.slice.call(arr);

      return new Promise(function (resolve, reject) {
        if (args.length === 0) return resolve([]);
        var remaining = args.length;

        function res(i, val) {
          try {
            if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(val, function (val) {
                  res(i, val);
                }, reject);
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }

        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };

    Promise.resolve = function (value) {
      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
        return value;
      }

      return new Promise(function (resolve) {
        resolve(value);
      });
    };

    Promise.reject = function (value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    };

    Promise.race = function (values) {
      return new Promise(function (resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i].then(resolve, reject);
        }
      });
    };

    /**
     * Set the immediate function to execute callbacks
     * @param fn {function} Function to execute
     * @private
     */
    Promise._setImmediateFn = function _setImmediateFn(fn) {
      asap = fn;
    };

    Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
      onUnhandledRejection = fn;
    };

    module.exports = Promise;

    /***/ }),
  /* 48 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _symbol = __webpack_require__(5);

    var _symbol2 = _interopRequireDefault(_symbol);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

// Deleted map items mess with iterator pointers, so rather than removing them mark them as deleted. Can't use undefined or null since those both valid keys so use a private symbol.
    var undefMarker = (0, _symbol2.default)('undef');

// NaN cannot be found in an array using indexOf, so we encode NaNs using a private symbol.
    /* eslint no-extend-native: "off" */
    var NaNMarker = (0, _symbol2.default)('NaN');

    var ACCESSOR_SUPPORT = true;

    function encodeVal(data) {
      return Number.isNaN(data) ? NaNMarker : data;
    }

    function decodeVal(encodedData) {
      return encodedData === NaNMarker ? NaN : encodedData;
    }

    function makeIterator(setInst, getter) {
      var nextIdx = 0;
      return {
        next: function next() {
          while (setInst._values[nextIdx] === undefMarker) {
            nextIdx++;
          }if (nextIdx === setInst._values.length) {
            return { value: void 0, done: true };
          } else {
            return { value: getter.call(setInst, nextIdx++), done: false };
          }
        }
      };
    }

    function calcSize(setInst) {
      var size = 0;
      for (var i = 0, s = setInst._values.length; i < s; i++) {
        if (setInst._values[i] !== undefMarker) size++;
      }
      return size;
    }

    var Set = function Set(data) {
      this._values = [];

      // If `data` is iterable (indicated by presence of a forEach method), pre-populate the set
      data && typeof data.forEach === 'function' && data.forEach(function (item) {
        this.add.call(this, item);
      }, this);

      if (!ACCESSOR_SUPPORT) this.size = calcSize(this);
    };

// Some old engines do not support ES5 getters/setters.  Since Set only requires these for the size property, we can fall back to setting the size property statically each time the size of the set changes.
    try {
      Object.defineProperty(Set.prototype, 'size', {
        get: function get() {
          return calcSize(this);
        }
      });
    } catch (e) {
      ACCESSOR_SUPPORT = false;
    }

    Set.prototype.add = function (value) {
      value = encodeVal(value);
      if (this._values.indexOf(value) === -1) {
        this._values.push(value);
        if (!ACCESSOR_SUPPORT) this.size = calcSize(this);
      }
      return this;
    };
    Set.prototype.has = function (value) {
      return this._values.indexOf(encodeVal(value)) !== -1;
    };
    Set.prototype.delete = function (value) {
      var idx = this._values.indexOf(encodeVal(value));
      if (idx === -1) return false;
      this._values[idx] = undefMarker;
      if (!ACCESSOR_SUPPORT) this.size = calcSize(this);
      return true;
    };
    Set.prototype.clear = function () {
      this._values = [];
      if (!ACCESSOR_SUPPORT) this.size = 0;
    };
    Set.prototype.values = Set.prototype.keys = function () {
      return makeIterator(this, function (i) {
        return decodeVal(this._values[i]);
      });
    };
    Set.prototype.entries = Set.prototype[_symbol2.default.iterator] = function () {
      return makeIterator(this, function (i) {
        return [decodeVal(this._values[i]), decodeVal(this._values[i])];
      });
    };
    Set.prototype.forEach = function (callbackFn, thisArg) {
      thisArg = thisArg || global;
      var iterator = this.entries();
      var result = iterator.next();
      while (result.done === false) {
        callbackFn.call(thisArg, result.value[1], result.value[0], this);
        result = iterator.next();
      }
    };

    Set.prototype[_symbol2.default.species] = Set;

    Object.defineProperty(Set, 'constructor', {
      value: Set
    });

    try {
      Object.defineProperty(Set, 'length', {
        value: 0
      });
    } catch (e) {}

    module.exports = Set;

    /***/ }),
  /* 49 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


// https://github.com/Polymer/URL

    var URLSearchParams = __webpack_require__(15);

    var relative = Object.create(null);
    relative.ftp = 21;
    relative.file = 0;
    relative.gopher = 70;
    relative.http = 80;
    relative.https = 443;
    relative.ws = 80;
    relative.wss = 443;

    var relativePathDotMapping = Object.create(null);
    relativePathDotMapping['%2e'] = '.';
    relativePathDotMapping['.%2e'] = '..';
    relativePathDotMapping['%2e.'] = '..';
    relativePathDotMapping['%2e%2e'] = '..';

    function isRelativeScheme(scheme) {
      return relative[scheme] !== undefined;
    }

    function invalid() {
      clear.call(this);
      this._isInvalid = true;
    }

    function IDNAToASCII(h) {
      if ('' == h) {
        invalid.call(this);
      }
      // XXX
      return h.toLowerCase();
    }

    function percentEscape(c) {
      var unicode = c.charCodeAt(0);
      if (unicode > 0x20 && unicode < 0x7F &&
        // " # < > ? `
        [0x22, 0x23, 0x3C, 0x3E, 0x3F, 0x60].indexOf(unicode) == -1) {
        return c;
      }
      return encodeURIComponent(c);
    }

    function percentEscapeQuery(c) {
      // XXX This actually needs to encode c using encoding and then
      // convert the bytes one-by-one.

      var unicode = c.charCodeAt(0);
      if (unicode > 0x20 && unicode < 0x7F &&
        // " # < > ` (do not escape '?')
        [0x22, 0x23, 0x3C, 0x3E, 0x60].indexOf(unicode) == -1) {
        return c;
      }
      return encodeURIComponent(c);
    }

    var EOF = undefined,
      ALPHA = /[a-zA-Z]/,
      ALPHANUMERIC = /[a-zA-Z0-9\+\-\.]/;

    function parse(input, stateOverride, base) {
      function err(message) {
        errors.push(message);
      }

      var state = stateOverride || 'scheme start',
        cursor = 0,
        buffer = '',
        seenAt = false,
        seenBracket = false,
        errors = [];

      loop: while ((input[cursor - 1] != EOF || cursor == 0) && !this._isInvalid) {
        var c = input[cursor];
        switch (state) {
          case 'scheme start':
            if (c && ALPHA.test(c)) {
              buffer += c.toLowerCase(); // ASCII-safe
              state = 'scheme';
            } else if (!stateOverride) {
              buffer = '';
              state = 'no scheme';
              continue;
            } else {
              err('Invalid scheme.');
              break loop;
            }
            break;

          case 'scheme':
            if (c && ALPHANUMERIC.test(c)) {
              buffer += c.toLowerCase(); // ASCII-safe
            } else if (':' == c) {
              this._scheme = buffer;
              buffer = '';
              if (stateOverride) {
                break loop;
              }
              if (isRelativeScheme(this._scheme)) {
                this._isRelative = true;
              }
              if ('file' == this._scheme) {
                state = 'relative';
              } else if (this._isRelative && base && base._scheme == this._scheme) {
                state = 'relative or authority';
              } else if (this._isRelative) {
                state = 'authority first slash';
              } else {
                state = 'scheme data';
              }
            } else if (!stateOverride) {
              buffer = '';
              cursor = 0;
              state = 'no scheme';
              continue;
            } else if (EOF == c) {
              break loop;
            } else {
              err('Code point not allowed in scheme: ' + c);
              break loop;
            }
            break;

          case 'scheme data':
            if ('?' == c) {
              state = 'query';
            } else if ('#' == c) {
              this._fragment = '#';
              state = 'fragment';
            } else {
              // XXX error handling
              if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
                this._schemeData += percentEscape(c);
              }
            }
            break;

          case 'no scheme':
            if (!base || !isRelativeScheme(base._scheme)) {
              err('Missing scheme.');
              invalid.call(this);
            } else {
              state = 'relative';
              continue;
            }
            break;

          case 'relative or authority':
            if ('/' == c && '/' == input[cursor + 1]) {
              state = 'authority ignore slashes';
            } else {
              err('Expected /, got: ' + c);
              state = 'relative';
              continue;
            }
            break;

          case 'relative':
            this._isRelative = true;
            if ('file' != this._scheme) this._scheme = base._scheme;
            if (EOF == c) {
              this._host = base._host;
              this._port = base._port;
              this._path = base._path.slice();
              this._query = base._query;
              this._username = base._username;
              this._password = base._password;
              break loop;
            } else if ('/' == c || '\\' == c) {
              if ('\\' == c) err('\\ is an invalid code point.');
              state = 'relative slash';
            } else if ('?' == c) {
              this._host = base._host;
              this._port = base._port;
              this._path = base._path.slice();
              this._query = '?';
              this._username = base._username;
              this._password = base._password;
              state = 'query';
            } else if ('#' == c) {
              this._host = base._host;
              this._port = base._port;
              this._path = base._path.slice();
              this._query = base._query;
              this._fragment = '#';
              this._username = base._username;
              this._password = base._password;
              state = 'fragment';
            } else {
              var nextC = input[cursor + 1];
              var nextNextC = input[cursor + 2];
              if ('file' != this._scheme || !ALPHA.test(c) || nextC != ':' && nextC != '|' || EOF != nextNextC && '/' != nextNextC && '\\' != nextNextC && '?' != nextNextC && '#' != nextNextC) {
                this._host = base._host;
                this._port = base._port;
                this._username = base._username;
                this._password = base._password;
                this._path = base._path.slice();
                this._path.pop();
              }
              state = 'relative path';
              continue;
            }
            break;

          case 'relative slash':
            if ('/' == c || '\\' == c) {
              if ('\\' == c) {
                err('\\ is an invalid code point.');
              }
              if ('file' == this._scheme) {
                state = 'file host';
              } else {
                state = 'authority ignore slashes';
              }
            } else {
              if ('file' != this._scheme) {
                this._host = base._host;
                this._port = base._port;
                this._username = base._username;
                this._password = base._password;
              }
              state = 'relative path';
              continue;
            }
            break;

          case 'authority first slash':
            if ('/' == c) {
              state = 'authority second slash';
            } else {
              err("Expected '/', got: " + c);
              state = 'authority ignore slashes';
              continue;
            }
            break;

          case 'authority second slash':
            state = 'authority ignore slashes';
            if ('/' != c) {
              err("Expected '/', got: " + c);
              continue;
            }
            break;

          case 'authority ignore slashes':
            if ('/' != c && '\\' != c) {
              state = 'authority';
              continue;
            } else {
              err('Expected authority, got: ' + c);
            }
            break;

          case 'authority':
            if ('@' == c) {
              if (seenAt) {
                err('@ already seen.');
                buffer += '%40';
              }
              seenAt = true;
              for (var i = 0; i < buffer.length; i++) {
                var cp = buffer[i];
                if ('\t' == cp || '\n' == cp || '\r' == cp) {
                  err('Invalid whitespace in authority.');
                  continue;
                }
                // XXX check URL code points
                if (':' == cp && null === this._password) {
                  this._password = '';
                  continue;
                }
                var tempC = percentEscape(cp);
                null !== this._password ? this._password += tempC : this._username += tempC;
              }
              buffer = '';
            } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
              cursor -= buffer.length;
              buffer = '';
              state = 'host';
              continue;
            } else {
              buffer += c;
            }
            break;

          case 'file host':
            if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
              if (buffer.length == 2 && ALPHA.test(buffer[0]) && (buffer[1] == ':' || buffer[1] == '|')) {
                state = 'relative path';
              } else if (buffer.length == 0) {
                state = 'relative path start';
              } else {
                this._host = IDNAToASCII.call(this, buffer);
                buffer = '';
                state = 'relative path start';
              }
              continue;
            } else if ('\t' == c || '\n' == c || '\r' == c) {
              err('Invalid whitespace in file host.');
            } else {
              buffer += c;
            }
            break;

          case 'host':
          case 'hostname':
            if (':' == c && !seenBracket) {
              // XXX host parsing
              this._host = IDNAToASCII.call(this, buffer);
              buffer = '';
              state = 'port';
              if ('hostname' == stateOverride) {
                break loop;
              }
            } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
              this._host = IDNAToASCII.call(this, buffer);
              buffer = '';
              state = 'relative path start';
              if (stateOverride) {
                break loop;
              }
              continue;
            } else if ('\t' != c && '\n' != c && '\r' != c) {
              if ('[' == c) {
                seenBracket = true;
              } else if (']' == c) {
                seenBracket = false;
              }
              buffer += c;
            } else {
              err('Invalid code point in host/hostname: ' + c);
            }
            break;

          case 'port':
            if (/[0-9]/.test(c)) {
              buffer += c;
            } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c || stateOverride) {
              if ('' != buffer) {
                var temp = parseInt(buffer, 10);
                if (temp != relative[this._scheme]) {
                  this._port = temp + '';
                }
                buffer = '';
              }
              if (stateOverride) {
                break loop;
              }
              state = 'relative path start';
              continue;
            } else if ('\t' == c || '\n' == c || '\r' == c) {
              err('Invalid code point in port: ' + c);
            } else {
              invalid.call(this);
            }
            break;

          case 'relative path start':
            if ('\\' == c) err("'\\' not allowed in path.");
            state = 'relative path';
            if ('/' != c && '\\' != c) {
              continue;
            }
            break;

          case 'relative path':
            if (EOF == c || '/' == c || '\\' == c || !stateOverride && ('?' == c || '#' == c)) {
              if ('\\' == c) {
                err('\\ not allowed in relative path.');
              }
              var tmp;
              if (tmp = relativePathDotMapping[buffer.toLowerCase()]) {
                buffer = tmp;
              }
              if ('..' == buffer) {
                this._path.pop();
                if ('/' != c && '\\' != c) {
                  this._path.push('');
                }
              } else if ('.' == buffer && '/' != c && '\\' != c) {
                this._path.push('');
              } else if ('.' != buffer) {
                if ('file' == this._scheme && this._path.length == 0 && buffer.length == 2 && ALPHA.test(buffer[0]) && buffer[1] == '|') {
                  buffer = buffer[0] + ':';
                }
                this._path.push(buffer);
              }
              buffer = '';
              if ('?' == c) {
                this._query = '?';
                state = 'query';
              } else if ('#' == c) {
                this._fragment = '#';
                state = 'fragment';
              }
            } else if ('\t' != c && '\n' != c && '\r' != c) {
              buffer += percentEscape(c);
            }
            break;

          case 'query':
            if (!stateOverride && '#' == c) {
              this._fragment = '#';
              state = 'fragment';
            } else if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
              this._query += percentEscapeQuery(c);
            }
            break;

          case 'fragment':
            if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
              this._fragment += c;
            }
            break;
        }

        cursor++;
      }
    }

    function clear() {
      this._scheme = '';
      this._schemeData = '';
      this._username = '';
      this._password = null;
      this._host = '';
      this._port = '';
      this._path = [];
      this._query = '';
      this._fragment = '';
      this._isInvalid = false;
      this._isRelative = false;
    }

// Does not process domain names or IP addresses.
// Does not handle encoding for the query parameter.
    function URL(url, base /* , encoding */) {
      if (base !== undefined && !(base instanceof URL)) base = new URL(String(base));

      this._url = url;
      clear.call(this);

      var input = url.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, '');
      // encoding = encoding || 'utf-8'

      parse.call(this, input, null, base);
    }

    URL.prototype = {
      toString: function toString() {
        return this.href;
      },
      get href() {
        if (this._isInvalid) return this._url;

        var authority = '';
        if ('' != this._username || null != this._password) {
          authority = this._username + (null != this._password ? ':' + this._password : '') + '@';
        }

        return this.protocol + (this._isRelative ? '//' + authority + this.host : '') + this.pathname + this._query + this._fragment;
      },
      set href(href) {
        clear.call(this);
        parse.call(this, href);
      },

      get protocol() {
        return this._scheme + ':';
      },
      set protocol(protocol) {
        if (this._isInvalid) return;
        parse.call(this, protocol + ':', 'scheme start');
      },

      get host() {
        return this._isInvalid ? '' : this._port ? this._host + ':' + this._port : this._host;
      },
      set host(host) {
        if (this._isInvalid || !this._isRelative) return;
        parse.call(this, host, 'host');
      },

      get hostname() {
        return this._host;
      },
      set hostname(hostname) {
        if (this._isInvalid || !this._isRelative) return;
        parse.call(this, hostname, 'hostname');
      },

      get port() {
        return this._port;
      },
      set port(port) {
        if (this._isInvalid || !this._isRelative) return;
        parse.call(this, port, 'port');
      },

      get pathname() {
        return this._isInvalid ? '' : this._isRelative ? '/' + this._path.join('/') : this._schemeData;
      },
      set pathname(pathname) {
        if (this._isInvalid || !this._isRelative) return;
        this._path = [];
        parse.call(this, pathname, 'relative path start');
      },

      get search() {
        return this._isInvalid || !this._query || '?' == this._query ? '' : this._query;
      },
      set search(search) {
        if (this._isInvalid || !this._isRelative) return;
        this._query = '?';
        if ('?' == search[0]) search = search.slice(1);
        parse.call(this, search, 'query');
      },

      get searchParams() {
        return new URLSearchParams(this.search);
      },

      get hash() {
        return this._isInvalid || !this._fragment || '#' == this._fragment ? '' : this._fragment;
      },
      set hash(hash) {
        if (this._isInvalid) return;
        this._fragment = '#';
        if ('#' == hash[0]) hash = hash.slice(1);
        parse.call(this, hash, 'fragment');
      },

      get origin() {
        var host;
        if (this._isInvalid || !this._scheme) {
          return '';
        }
        // javascript: Gecko returns String(""), WebKit/Blink String("null")
        // Gecko throws error for "data://"
        // data: Gecko returns "", Blink returns "data://", WebKit returns "null"
        // Gecko returns String("") for file: mailto:
        // WebKit/Blink returns String("SCHEME://") for file: mailto:
        switch (this._scheme) {
          case 'data':
          case 'file':
          case 'javascript':
          case 'mailto':
            return 'null';
        }
        host = this.host;
        if (!host) {
          return '';
        }
        return this._scheme + '://' + host;
      }
    };

    module.exports = URL;

    /***/ }),
  /* 50 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    /* eslint no-extend-native: "off" */

    var defineProperty = Object.defineProperty;
    var counter = Date.now() % 1e9;

    var WeakMap = function WeakMap(data) {
      this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');

      // If data is iterable (indicated by presence of a forEach method), pre-populate the map
      data && data.forEach && data.forEach(function (item) {
        this.set.apply(this, item);
      }, this);
    };

    WeakMap.prototype.set = function (key, value) {
      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) !== 'object' && typeof key !== 'function') throw new TypeError('Invalid value used as weak map key');

      var entry = key[this.name];
      if (entry && entry[0] === key) entry[1] = value;else defineProperty(key, this.name, { value: [key, value], writable: true });
      return this;
    };

    WeakMap.prototype.get = function (key) {
      var entry;
      return (entry = key[this.name]) && entry[0] === key ? entry[1] : undefined;
    };

    WeakMap.prototype.delete = function (key) {
      var entry = key[this.name];
      if (!entry || entry[0] !== key) return false;
      entry[0] = entry[1] = undefined;
      return true;
    };

    WeakMap.prototype.has = function (key) {
      var entry = key[this.name];
      if (!entry) return false;
      return entry[0] === key;
    };

    module.exports = WeakMap;

    /***/ }),
  /* 51 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    /* eslint no-extend-native: "off" */

    var counter = Date.now() % 1e9;

    var WeakSet = function WeakSet(data) {
      this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
      data && data.forEach && data.forEach(this.add, this);
    };

    WeakSet.prototype.add = function (obj) {
      var name = this.name;
      if (!obj[name]) Object.defineProperty(obj, name, { value: true, writable: true });
      return this;
    };

    WeakSet.prototype.delete = function (obj) {
      if (!obj[this.name]) return false;
      obj[this.name] = undefined;
      return true;
    };

    WeakSet.prototype.has = function (obj) {
      return !!obj[this.name];
    };

    module.exports = WeakSet;

    /***/ }),
  /* 52 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    exports.config = config;
    exports.getOffset = getOffset;
    exports.pushElement = pushElement;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var offsetTop = 0;
    var appearEvt = void 0,
      disappearEvt = void 0;
    var _appearDoms = [];

    var AppearRegistry = function () {
      _createClass(AppearRegistry, null, [{
        key: 'createEvent',
        value: function createEvent() {
          appearEvt = document.createEvent('HTMLEvents');
          disappearEvt = document.createEvent('HTMLEvents');
          appearEvt.initEvent('appear', false, true);
          disappearEvt.initEvent('disappear', false, true);
        }
      }]);

      function AppearRegistry(elements) {
        _classCallCheck(this, AppearRegistry);

        this.current = [];
        this.elements = elements;

        this.options = {
          container: window,
          wait: 100,
          x: 0,
          y: 0,
          cls: 'appear',
          once: false,
          onReset: function onReset() {},
          onAppear: function onAppear() {},
          onDisappear: function onDisappear() {}
        };
        this.container = null;
        this.appearWatchElements = null;

        this.initConfig.apply(this, arguments);
      }

      _createClass(AppearRegistry, [{
        key: 'initConfig',
        value: function initConfig(opts) {
          this.extend(this.options, opts || (opts = {}));
          this.appearWatchElements = this.appearWatchElements || this.getElements();
          this.bindEvent();
        }
      }, {
        key: 'extend',
        value: function extend(target, el) {
          for (var k in el) {
            if (el.hasOwnProperty(k)) {
              target[k] = el[k];
            }
          }
          return target;
        }
      }, {
        key: 'inViewport',
        value: function inViewport(element, offset, type) {
          var _element$getBoundingC = element.getBoundingClientRect(),
            top = _element$getBoundingC.top,
            right = _element$getBoundingC.right,
            bottom = _element$getBoundingC.bottom,
            left = _element$getBoundingC.left;

          left = offset.right > left && offset.left < right;
          top = offset.bottom > top - offsetTop && offset.top < bottom;
          return left && top;
        }
      }, {
        key: 'getElements',
        value: function getElements(type) {
          var container = this.options.container;
          var appearWatchElements = void 0;
          this.container = container;

          appearWatchElements = _appearDoms || [];
          appearWatchElements = [].slice.call(appearWatchElements, null);

          return appearWatchElements;
        }

        // check dom inview

      }, {
        key: 'check',
        value: function check(offset) {
          var _this = this;

          raf(function () {
            _this.calculate();
          });
        }

        // calculate everyone dom inview

      }, {
        key: 'calculate',
        value: function calculate() {
          var _this2 = this;

          var container = this.container,
            elements = this.getElements(),
            containerOffset = getOffset(window, {
              x: this.options.x,
              y: this.options.y
            }),
            isOnce = this.options.once,
            ev = arguments[0] || {};

          if (!container) {
            return;
          }

          if (elements && elements.length > 0) {
            [].forEach.call(elements, function (ele, i) {
              if (ele) {
                if (ele.isOnce && ele._hasAppear) {
                  _appearDoms.splice(i, 1);
                  elements.splice(i, 1);
                  return;
                }
                _this2.checkEveryDom(ele, containerOffset, isOnce, appearEvt, disappearEvt, 'normal', i);
              }
            });
          }
        }
      }, {
        key: 'checkEveryDom',
        value: function checkEveryDom(ele, containerOffset, isOnce, cacheAppearEvt, cacheDisappearEvt, type, pos) {
          var eleOffset = getOffset(ele);
          var direction = this.getDirection(ele._eleOffset, eleOffset);
          var isInView = this.inViewport(ele, containerOffset, type);
          var appear = ele._appear;
          var _hasAppear = ele._hasAppear;
          var _hasDisAppear = ele._hasDisAppear;
          ele._eleOffset = eleOffset;

          cacheAppearEvt.direction = direction;
          cacheDisappearEvt.direction = direction;
          if (isInView && !appear) {
            if (isOnce && !_hasAppear || !isOnce) {
              ele.dispatchEvent(cacheAppearEvt);
              ele._hasAppear = true;
              ele._appear = true;
            }
          } else if (!isInView && appear) {
            if (isOnce && !_hasDisAppear || !isOnce) {
              ele.dispatchEvent(cacheDisappearEvt);
              ele._hasDisAppear = true;
              ele._appear = false;
            }
          }
        }

        // reset

      }, {
        key: 'reset',
        value: function reset(opts) {
          this.initConfig(opts);
          this.appearWatchElements.forEach(function (ele) {
            delete ele._hasAppear;
            delete ele._hasDisAppear;
            delete ele._appear;
          });
          return this;
        }
      }, {
        key: 'bindEvent',
        value: function bindEvent() {
          var _this3 = this,
            _arguments = arguments;

          var handle = throttle(function () {
            _this3.check(_arguments);
          }, this.options.wait);
          if (this.__handle) {
            this.container.removeEventListener('scroll', this.__handle, false, true);
            this.__handle = null;
          }
          this.__handle = handle;
          this.container.addEventListener('scroll', handle, false, true);
        }
      }, {
        key: 'getDirection',
        value: function getDirection(beforeOffset, nowOffset) {
          var direction = 'none';
          var horizental = beforeOffset.left - nowOffset.left;
          var vertical = beforeOffset.top - nowOffset.top;
          if (vertical == 0) {
            if (horizental != 0) {
              direction = horizental > 0 ? 'left' : 'right';
            } else {
              direction = 'none';
            }
          }
          if (horizental == 0) {
            if (vertical != 0) {
              direction = vertical > 0 ? 'up' : 'down';
            } else {
              direction = 'none';
            }
          }
          return direction;
        }
      }]);

      return AppearRegistry;
    }();

    var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (c) {
        setTimeout(c, 1 / 60 * 1e3);
      };

    function throttle(fn, wait) {
      var context = void 0,
        args = void 0,
        result = void 0;
      var timeout = null;
      var previous = 0;

      var later = function later() {
        previous = Date.now();
        timeout = null;
        result = fn.apply(context, args);
      };
      return function () {
        var now = Date.now();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;

        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = fn.apply(context, args);
        } else if (!timeout) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }

    function config(opts) {
      if (opts.offsetTop && typeof opts.offsetTop === 'number') {
        offsetTop = opts.offsetTop;
      }
    }

    function getOffset(el, param) {
      var l = void 0,
        r = void 0,
        b = void 0,
        t = void 0;
      if (!el) {
        return;
      }
      if (!param) {
        param = { x: 0, y: 0 };
      }

      if (el != window) {
        el = el.getBoundingClientRect();
        l = el.left;
        t = el.top;
        r = el.right;
        b = el.bottom;
      } else {
        l = 0;
        t = 0;
        r = l + el.innerWidth;
        b = t + el.innerHeight;
      }

      return {
        'left': l,
        'top': t,
        'right': r + param.x,
        'bottom': b + param.y
      };
    }

// add element
    function pushElement(node) {
      if (_appearDoms.indexOf(node) === -1 && !node.appended) {
        var isOnce = Boolean(node.getAttribute('isonce')) || Boolean(node.getAttribute('data-once'));
        node.isOnce = isOnce;
        node.appended = true;
        _appearDoms.push(node);
        node._eleOffset = getOffset(node);
      }
    }

    exports.default = AppearRegistry;

    /***/ }),
  /* 53 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var global = window;

    var shared = __webpack_require__(19);

// ES
    __webpack_require__(22);
    __webpack_require__(21);

    if (!global.Promise) {
      global.Promise = shared.Promise;
    }

    if (!global.Symbol) {
      global.Symbol = shared.Symbol;
    }

    if (!global.Map) {
      global.Map = shared.Map;
    }

    if (!global.Set) {
      global.Set = shared.Set;
    }

    if (!global.WeakMap) {
      global.WeakMap = shared.WeakMap;
    }

    if (!global.WeakSet) {
      global.WeakSet = shared.WeakSet;
    }

// W3C
    __webpack_require__(25);
    __webpack_require__(24);

    if (!global.FontFace) {
      global.FontFace = shared.FontFace;
    }

    if (!global.matchMedia) {
      global.matchMedia = shared.matchMedia;
    }

    if (!global.URL) {
      global.URL = shared.URL;
    }

    if (!global.URLSearchParams) {
      global.URLSearchParams = shared.URLSearchParams;
    }

    if (!document.fonts) {
      document.fonts = {
        add: function add(fontFace) {
          var fontFaceRule = '@font-face {\n        font-family: ' + fontFace.family + ';\n        src: ' + fontFace.source + '\n      }';

          var styleElement = document.createElement('style');
          styleElement.innerHTML = fontFaceRule;
          document.head.appendChild(styleElement);
        }
      };
    }

// ModuleJS
    __webpack_require__(23);

// Polyfills for weex
    __webpack_require__(20);

// Default Builtin modules
    global.define('rax', function (req, exports, module) {
      module.exports = __webpack_require__(18);
    });

    /***/ }),
  /* 54 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {

      /**
       * parse w3c attrs to weex module attrs
       *
       * @param {Object} w3c component data
       * @return {Object} weex component data
       */
      parse: function parse(component) {
        component.type = 'div';
        return component;
      }
    };
    module.exports = exports['default'];

    /***/ }),
  /* 55 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }return target;
      };

    /**
     * weex button
     *
     * props: disabled, style
     */

    exports.default = {
      parse: function parse(component) {
        var props = component.props;

        component.type = 'text';

        var style = props.style,
          disabled = props.disabled,
          children = props.children;

        var textStyle = _extends({
          textAlign: 'center',
          fontSize: 22,
          paddingTop: 4,
          paddingRight: 12,
          paddingBottom: 6,
          paddingLeft: 12,
          borderWidth: 4,
          borderStyle: 'solid',
          borderColor: '#000000',
          backgroudColor: '#c0c0c0'
        }, style);

        if (disabled) {
          props.onClick = null;
          textStyle = _extends({}, textStyle, {
            color: '#7f7f7f',
            borderColor: '#7f7f7f'
          });
        }

        if (typeof children === 'string') {
          props.value = children;
          props.children = null;
        }

        return component;
      }
    };
    module.exports = exports['default'];

    /***/ }),
  /* 56 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }return target;
      };

    var BASE_FONT_SIZE = 28;

    function generateHeadingStyle(baseFontSize, fontMultiplier, marginMultiplier) {
      return {
        fontSize: baseFontSize * fontMultiplier,
        marginTop: baseFontSize * fontMultiplier * marginMultiplier,
        marginBottom: baseFontSize * fontMultiplier * marginMultiplier,
        fontWeight: 'bold'
      };
    }

    var HeadingElements = {
      h1: generateHeadingStyle(BASE_FONT_SIZE, 2, 0.67),
      h2: generateHeadingStyle(BASE_FONT_SIZE, 1.5, 0.83),
      h3: generateHeadingStyle(BASE_FONT_SIZE, 1.17, 1),
      h4: generateHeadingStyle(BASE_FONT_SIZE, 1, 1.33),
      h5: generateHeadingStyle(BASE_FONT_SIZE, 0.83, 1.67),
      h6: generateHeadingStyle(BASE_FONT_SIZE, 0.67, 2.33)
    };

    exports.default = {
      parse: function parse(component) {
        var type = component.type,
          props = component.props;

        component.type = 'text';
        props.style = _extends({}, HeadingElements[type] || HeadingElements.h6, props.style);

        if (typeof props.children === 'string' && !props.value) {
          props.value = props.children;
          props.children = null;
        }

        return component;
      }
    };
    module.exports = exports['default'];

    /***/ }),
  /* 57 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _parseProps = __webpack_require__(17);

    exports.default = {

      /**
       * parse w3c attrs to weex module attrs
       *
       * @param {Object} w3c component data
       * @return {Object} weex component data
       */
      parse: function parse(component) {
        var props = component.props;

        component.type = 'image';

        // modify props
        component.props = (0, _parseProps.transformPropsAttrsToStyle)(props, ['width', 'height']);

        return component;
      }
    };
    module.exports = exports['default'];

    /***/ }),
  /* 58 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _img = __webpack_require__(57);

    var _img2 = _interopRequireDefault(_img);

    var _video = __webpack_require__(62);

    var _video2 = _interopRequireDefault(_video);

    var _textarea = __webpack_require__(61);

    var _textarea2 = _interopRequireDefault(_textarea);

    var _span = __webpack_require__(60);

    var _span2 = _interopRequireDefault(_span);

    var _p = __webpack_require__(59);

    var _p2 = _interopRequireDefault(_p);

    var _button = __webpack_require__(55);

    var _button2 = _interopRequireDefault(_button);

    var _heading = __webpack_require__(56);

    var _heading2 = _interopRequireDefault(_heading);

    var _block = __webpack_require__(54);

    var _block2 = _interopRequireDefault(_block);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    exports.default = {
      span: _span2.default,
      p: _p2.default,
      img: _img2.default,
      button: _button2.default,
      video: _video2.default,
      textarea: _textarea2.default,
      h1: _heading2.default,
      h2: _heading2.default,
      h3: _heading2.default,
      h4: _heading2.default,
      h5: _heading2.default,
      h6: _heading2.default,
      nav: _block2.default,
      article: _block2.default,
      section: _block2.default,
      // Conflict with weex header tag
      // header: block,
      footer: _block2.default,
      aside: _block2.default,
      main: _block2.default
    };
    module.exports = exports['default'];

    /***/ }),
  /* 59 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }return target;
      };

    var BASE_FONT_SIZE = 28;

    var defaultParagraphStyle = {
      fontSize: BASE_FONT_SIZE,
      marginTop: BASE_FONT_SIZE,
      marginBottom: BASE_FONT_SIZE
    };

    var TypographyElements = {
      u: {
        textDecoration: 'underline'
      },
      s: {
        textDecoration: 'line-through'
      },
      i: {
        fontStyle: 'italic'
      },
      b: {
        fontWeight: 'bold'
      },
      del: {
        textDecoration: 'line-through'
      },
      em: {
        fontStyle: 'italic'
      },
      strong: {
        fontWeight: 'bold'
      },
      big: {
        fontSize: BASE_FONT_SIZE * 1.2
      },
      small: {
        fontSize: BASE_FONT_SIZE * 0.8
      }
    };

    function transformString(string) {
      return {
        type: 'span',
        attr: {
          value: string
        }
      };
    }

    function transformChild(child) {
      var type = child.type;
      var props = child.props;
      var style = props.style;
      var nestedChildren = props.children;
      // Alias img tag
      if (type === 'img') {
        type = 'image';
      }

      // Transfrom to span
      if (TypographyElements[type]) {
        style = _extends({}, TypographyElements[type], style);
        type = 'span';
      }

      props.style = null;
      props.children = null;

      var element = {
        type: type,
        style: style,
        attr: props || {}
      };

      if (nestedChildren) {
        if (type === 'span' && typeof nestedChildren === 'string') {
          element.attr.value = nestedChildren;
        } else {
          element.children = transformChildren(nestedChildren);
        }
      }

      return element;
    }

    function transformChildren(children) {
      var elements = [];
      if (!Array.isArray(children)) {
        children = [children];
      }

      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (typeof child === 'string') {
          elements.push(transformString(child));
        } else if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object') {
          elements.push(transformChild(child));
        }
      }

      return elements;
    }

    exports.default = {
      parse: function parse(component) {
        var props = component.props;

        var children = props.children;

        component.type = 'richtext';

        props.style = _extends({}, defaultParagraphStyle, props.style);

        props.value = transformChildren(children);;
        props.children = null;

        return component;
      }
    };
    module.exports = exports['default'];

    /***/ }),
  /* 60 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      parse: function parse(component) {
        var props = component.props;

        component.type = 'text';

        if (typeof props.children === 'string' && !props.value) {
          props.value = props.children;
          props.children = null;
        }

        return component;
      }
    };
    module.exports = exports['default'];

    /***/ }),
  /* 61 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {

      /**
       * parse w3c attrs to weex module attrs
       *
       * @param {Object} w3c component data
       * @return {Object} weex component data
       */
      parse: function parse(component) {
        var props = component.props;

        if (typeof props.children === 'string' && !props.value) {
          props.value = props.children;
          props.children = null;
        }

        return component;
      }
    };
    module.exports = exports['default'];

    /***/ }),
  /* 62 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _parseProps = __webpack_require__(17);

    exports.default = {

      /**
       * parse w3c attrs to weex module attrs
       *
       * @param {Object} w3c component data
       * @return {Object} weex component data
       */
      parse: function parse(component) {
        var props = component.props;

        // modify props

        component.props = (0, _parseProps.transformPropsAttrsToStyle)(props, ['width', 'height']);
        component.props = (0, _parseProps.renamePropsAttr)(props, 'autoplay', 'auto-play');

        return component;
      }
    };
    module.exports = exports['default'];

    /***/ }),
  /* 63 */
  /***/ (function(module, exports, __webpack_require__) {

    "use strict";


    var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    }; /**
     * Weex driver
     */

    var _styleUnit = __webpack_require__(16);

    var _elements = __webpack_require__(58);

    var _elements2 = _interopRequireDefault(_elements);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    var STYLE = 'style';
    var ID = 'id';
    var TEXT = 'text';
    var CHILDREN = 'children';
    var EVENT_PREFIX_REGEXP = /^on[A-Z]/;
    var FULL_WIDTH_REM = 750;
    var ARIA_PREFIX_REGEXP = /^aria-/;

    var nodeMaps = {};
    /* global __weex_document__ */
    var document = (typeof __weex_document__ === 'undefined' ? 'undefined' : _typeof(__weex_document__)) === 'object' ? __weex_document__ : (typeof document === 'undefined' ? 'undefined' : _typeof(document)) === 'object' ? document : null;

    var Driver = {
      getElementById: function getElementById(id) {
        return nodeMaps[id];
      },
      getParentNode: function getParentNode(node) {
        return node.parentNode;
      },
      createBody: function createBody() {
        if (document.body) {
          return document.body;
        }

        var documentElement = document.documentElement;
        var body = document.createBody();
        documentElement.appendChild(body);

        return body;
      },
      createComment: function createComment(content) {
        return document.createComment(content);
      },
      createEmpty: function createEmpty() {
        return this.createComment(' empty ');
      },
      createText: function createText(text) {
        return Driver.createElement({
          type: TEXT,
          props: {
            value: text
          }
        });
      },
      updateText: function updateText(node, content) {
        this.setAttribute(node, 'value', content);
      },
      createElement: function createElement(component) {
        var htmlElement = _elements2.default[component.type];
        if (htmlElement) {
          component = htmlElement.parse(component);
        }

        var props = component.props;
        var events = [];
        var style = {};
        var originStyle = props[STYLE];
        for (var prop in originStyle) {
          style[prop] = (0, _styleUnit.convertUnit)(originStyle[prop], prop);
        }

        var node = document.createElement(component.type, {
          style: style
        });

        this.setNativeProps(node, props);

        return node;
      },
      appendChild: function appendChild(node, parent) {
        return parent.appendChild(node);
      },
      removeChild: function removeChild(node, parent) {
        parent = parent || node.parentNode;
        var id = node.attr && node.attr[ID];
        if (id != null) {
          nodeMaps[id] = null;
        }
        return parent.removeChild(node);
      },
      replaceChild: function replaceChild(newChild, oldChild, parent) {
        parent = parent || oldChild.parentNode;
        var previousSibling = oldChild.previousSibling;
        var nextSibling = oldChild.nextSibling;
        this.removeChild(oldChild, parent);

        if (previousSibling) {
          this.insertAfter(newChild, previousSibling, parent);
        } else if (nextSibling) {
          this.insertBefore(newChild, nextSibling, parent);
        } else {
          this.appendChild(newChild, parent);
        }
      },
      insertAfter: function insertAfter(node, after, parent) {
        parent = parent || after.parentNode;
        return parent.insertAfter(node, after);
      },
      insertBefore: function insertBefore(node, before, parent) {
        parent = parent || before.parentNode;
        return parent.insertBefore(node, before);
      },
      addEventListener: function addEventListener(node, eventName, eventHandler) {
        return node.addEvent(eventName, eventHandler);
      },
      removeEventListener: function removeEventListener(node, eventName, eventHandler) {
        return node.removeEvent(eventName, eventHandler);
      },
      removeAllEventListeners: function removeAllEventListeners(node) {
        // Noop
      },
      removeAttribute: function removeAttribute(node, propKey, propValue) {
        if (propKey == ID) {
          nodeMaps[propValue] = null;
        }
        // Weex native will crash when pass null value
        return node.setAttr(propKey, undefined, false);
      },
      setAttribute: function setAttribute(node, propKey, propValue) {
        if (propKey == ID) {
          nodeMaps[propValue] = node;
        }

        // Weex only support `ariaLabel` format, convert `aria-label` format to camelcase
        if (ARIA_PREFIX_REGEXP.test(propKey)) {
          propKey = propKey.replace(/\-(\w)/, function (m, p1) {
            return p1.toUpperCase();
          });
        }

        return node.setAttr(propKey, propValue, false);
      },
      setStyles: function setStyles(node, styles) {
        // TODO if more then one style update, call setStyles will be better performance
        for (var key in styles) {
          var val = styles[key];
          val = (0, _styleUnit.convertUnit)(val, key);
          node.setStyle(key, val);
        }
      },
      beforeRender: function beforeRender() {
        // Turn off batched updates
        document.open();

        // Init rem unit
        (0, _styleUnit.setRem)(this.getWindowWidth() / FULL_WIDTH_REM);
      },
      afterRender: function afterRender() {
        if (document.listener && document.listener.createFinish) {
          document.listener.createFinish();
        }

        // Turn on batched updates
        document.close();
      },
      getWindowWidth: function getWindowWidth() {
        return FULL_WIDTH_REM;
      },
      setNativeProps: function setNativeProps(node, props) {
        for (var prop in props) {
          var value = props[prop];
          if (prop === CHILDREN) {
            continue;
          }

          if (value != null) {
            if (EVENT_PREFIX_REGEXP.test(prop)) {
              var eventName = prop.slice(2).toLowerCase();
              this.addEventListener(node, eventName, value);
            } else {
              this.setAttribute(node, prop, value);
            }
          }
        }
      }
    };

    exports.default = Driver;
    module.exports = exports['default'];

    /***/ }),
  /* 64 */
  /***/ (function(module, exports) {

// Generated by CoffeeScript 1.7.1
    (function() {
      var getNanoSeconds, hrtime, loadTime;

      if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
        module.exports = function() {
          return performance.now();
        };
      } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
        module.exports = function() {
          return (getNanoSeconds() - loadTime) / 1e6;
        };
        hrtime = process.hrtime;
        getNanoSeconds = function() {
          var hr;
          hr = hrtime();
          return hr[0] * 1e9 + hr[1];
        };
        loadTime = getNanoSeconds();
      } else if (Date.now) {
        module.exports = function() {
          return Date.now() - loadTime;
        };
        loadTime = Date.now();
      } else {
        module.exports = function() {
          return new Date().getTime() - loadTime;
        };
        loadTime = new Date().getTime();
      }

    }).call(this);


    /***/ }),
  /* 65 */
  /***/ (function(module, exports, __webpack_require__) {

    var now = __webpack_require__(64)
      , root = typeof window === 'undefined' ? global : window
      , vendors = ['moz', 'webkit']
      , suffix = 'AnimationFrame'
      , raf = root['request' + suffix]
      , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

    for(var i = 0; !raf && i < vendors.length; i++) {
      raf = root[vendors[i] + 'Request' + suffix]
      caf = root[vendors[i] + 'Cancel' + suffix]
        || root[vendors[i] + 'CancelRequest' + suffix]
    }

// Some versions of FF have rAF but not cAF
    if(!raf || !caf) {
      var last = 0
        , id = 0
        , queue = []
        , frameDuration = 1000 / 60

      raf = function(callback) {
        if(queue.length === 0) {
          var _now = now()
            , next = Math.max(0, frameDuration - (_now - last))
          last = next + _now
          setTimeout(function() {
            var cp = queue.slice(0)
            // Clear queue here to prevent
            // callbacks from appending listeners
            // to the current frame's queue
            queue.length = 0
            for(var i = 0; i < cp.length; i++) {
              if(!cp[i].cancelled) {
                try{
                  cp[i].callback(last)
                } catch(e) {
                  setTimeout(function() { throw e }, 0)
                }
              }
            }
          }, Math.round(next))
        }
        queue.push({
          handle: ++id,
          callback: callback,
          cancelled: false
        })
        return id
      }

      caf = function(handle) {
        for(var i = 0; i < queue.length; i++) {
          if(queue[i].handle === handle) {
            queue[i].cancelled = true
          }
        }
      }
    }

    module.exports = function(fn) {
      // Wrap in a new function to prevent
      // `cancel` potentially being assigned
      // to the native rAF function
      return raf.call(root, fn)
    }
    module.exports.cancel = function() {
      caf.apply(root, arguments)
    }
    module.exports.polyfill = function() {
      root.requestAnimationFrame = raf
      root.cancelAnimationFrame = caf
    }


    /***/ })
  /******/ ]);
//# sourceMappingURL=framework.web.map
