"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrowserName = getBrowserName;
exports.Browser = exports.Browsers = void 0;

var _bowser = _interopRequireDefault(require("bowser"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Browsers = {
  chrome: {
    name: 'chrome',
    title: 'Chrome',
    namespace: function namespace() {
      return chrome;
    },
    promises: false
  },
  firefox: {
    name: 'firefox',
    title: 'Firefox',
    namespace: function namespace() {
      return browser;
    },
    promises: true
  }
};
exports.Browsers = Browsers;

function getBrowserName(bowser) {
  if (bowser.chrome) {
    return 'chrome';
  }

  if (bowser.firefox) {
    return 'firefox';
  }

  return null;
} // Retrieve browser details


var current = Browsers[getBrowserName(_bowser.default)];
var Browser = !(0, _isNil.default)(current) ? _extends({}, current, {
  version: _bowser.default.version
}) : null;
exports.Browser = Browser;