"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bowser = _interopRequireDefault(require("bowser"));

var _get = _interopRequireDefault(require("lodash/get"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _environment = require("./environment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Listener =
/*#__PURE__*/
function () {
  function Listener(api, name) {
    _classCallCheck(this, Listener);

    this.$api = api;
    this.$name = name;
  }

  _createClass(Listener, [{
    key: "addListener",
    value: function addListener(listener) {
      return this.$listener.addListener(listener);
    }
  }, {
    key: "hasListener",
    value: function hasListener(listener) {
      return this.$listener.hasListener(listener);
    }
  }, {
    key: "removeListener",
    value: function removeListener(listener) {
      return this.$listener.removeListener(listener);
    }
  }, {
    key: "$listener",
    get: function get() {
      var message = this.$api.$check(this.$name); // Ensure API exists

      if ((0, _isNil.default)(this.$api.$target)) {
        if ((0, _isNil.default)(message)) {
          throw new Error("".concat(this.$api.constructor.Title, " API is not available"));
        }

        throw new Error("".concat(this.$api.constructor.Title, " API is not available (").concat(message, ")"));
      } // Ensure listener exists


      if (!(0, _isNil.default)(message)) {
        throw new Error("".concat(this.$api.constructor.Title, " API doesn't support \"").concat(this.$name, "\" (").concat(message, ")"));
      } // Return listener


      return this.$api.$target[this.$name];
    }
  }]);

  return Listener;
}();

var Base =
/*#__PURE__*/
function () {
  function Base() {
    var browser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Base);

    this.$browser = browser || _environment.Browser;
  }

  _createClass(Base, [{
    key: "$check",
    value: function $check(name) {
      var compat = (0, _get.default)(this.constructor.Compatibility, ['webextensions', 'api', this.constructor.Name, name, '__compat']);

      if ((0, _isNil.default)(compat)) {
        return "Unknown method: ".concat(this.constructor.Name, ".").concat(name);
      } // Retrieve browser support information


      var support = compat.support[this.$browser.name];

      if ((0, _isNil.default)(support)) {
        return "Unknown browser: ".concat(this.$browser.name);
      }

      if (support.version_added === true) {
        return null;
      }

      if (_bowser.default.compareVersions([this.$browser.version, support.version_added]) >= 0) {
        return null;
      }

      return "Requires: ".concat(this.$browser.title, " >= ").concat(support.version_added);
    }
  }, {
    key: "$call",
    value: function $call(name) {
      var message = this.$check(name); // Ensure API exists

      if ((0, _isNil.default)(this.$target)) {
        if ((0, _isNil.default)(message)) {
          throw new Error("".concat(this.constructor.Title, " API is not available"));
        }

        throw new Error("".concat(this.constructor.Title, " API is not available (").concat(message, ")"));
      } // Retrieve target function


      var target = this.$target[name]; // Ensure target function exists

      if ((0, _isNil.default)(target) || !(0, _isFunction.default)(target)) {
        if ((0, _isNil.default)(message)) {
          throw new Error("".concat(this.constructor.Title, " API doesn't support \"").concat(name, "\""));
        }

        throw new Error("".concat(this.constructor.Title, " API doesn't support \"").concat(name, "\" (").concat(message, ")"));
      } // Log warnings


      if (!(0, _isNil.default)(message)) {
        console.warn("[".concat(this.constructor.Name, ".").concat(name, "] ").concat(message));
      } // Call target function


      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return target.apply(void 0, args);
    }
  }, {
    key: "$promise",
    value: function $promise(name) {
      var _this = this;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (this.$browser.promises) {
        return Promise.resolve().then(function () {
          return _this.$call.apply(_this, [name].concat(args));
        });
      } // Convert callback function to promise


      return new Promise(function (resolve, reject) {
        _this.$call.apply(_this, [name].concat(args, [function () {
          if (!(0, _isNil.default)(_this.$lastError)) {
            // Reject promise with `runtime.lastError`
            reject(new Error(_this.$lastError.message || 'Unknown Error'));
            return;
          } // Resolve promise


          resolve.apply(void 0, arguments);
        }]));
      });
    }
  }, {
    key: "$property",
    value: function $property(name) {
      var message = this.$check(name); // Ensure API exists

      if ((0, _isNil.default)(this.$target)) {
        if ((0, _isNil.default)(message)) {
          throw new Error("".concat(this.constructor.Title, " API is not available"));
        }

        throw new Error("".concat(this.constructor.Title, " API is not available (").concat(message, ")"));
      } // Ensure target property exists


      if (!(0, _isNil.default)(message)) {
        throw new Error("".concat(this.constructor.Title, " API doesn't support \"").concat(name, "\" (").concat(message, ")"));
      } // Return property value


      return this.$target[name];
    }
  }, {
    key: "$listener",
    value: function $listener(name) {
      return new Listener(this, name);
    }
  }, {
    key: "$namespace",
    get: function get() {
      if ((0, _isFunction.default)(this.$browser.namespace)) {
        return this.$browser.namespace();
      }

      return this.$browser.namespace;
    }
  }, {
    key: "$lastError",
    get: function get() {
      if ((0, _isNil.default)(this.$namespace) || (0, _isNil.default)(this.$namespace.runtime)) {
        return null;
      }

      return this.$namespace.runtime.lastError;
    }
  }, {
    key: "$target",
    get: function get() {
      return this.$namespace[this.constructor.Name];
    }
  }]);

  return Base;
}();

exports.default = Base;
Object.defineProperty(Base, "Title", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: null
});
Object.defineProperty(Base, "Name", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: null
});
Object.defineProperty(Base, "Compatibility", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: null
});