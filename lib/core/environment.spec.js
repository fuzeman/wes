"use strict";

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _environment = require("./environment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Environment', function () {
  describe('Browsers', function () {
    describe('chrome', function () {
      it('should be defined', function () {
        expect(_environment.Browsers.chrome).toBeDefined();
      });
      describe('namespace', function () {
        it('should be a function', function () {
          expect((0, _isFunction.default)(_environment.Browsers.chrome.namespace)).toBeTruthy();
        });
        it('should throw error', function () {
          expect(function () {
            return _environment.Browsers.chrome.namespace();
          }).toThrowError(ReferenceError, 'chrome is not defined');
        });
      });
    });
    describe('firefox', function () {
      it('should be defined', function () {
        expect(_environment.Browsers.firefox).toBeDefined();
      });
      describe('namespace', function () {
        it('should be a function', function () {
          expect((0, _isFunction.default)(_environment.Browsers.firefox.namespace)).toBeTruthy();
        });
        it('should throw error', function () {
          expect(function () {
            return _environment.Browsers.firefox.namespace();
          }).toThrowError(ReferenceError, 'browser is not defined');
        });
      });
    });
  });
  describe('Browser', function () {
    it('should be null', function () {
      expect(_environment.Browser).toBeNull();
    });
  });
  describe('getBrowserName', function () {
    it('should return "chrome"', function () {
      expect((0, _environment.getBrowserName)({
        chrome: true
      })).toBe('chrome');
    });
    it('should return "firefox"', function () {
      expect((0, _environment.getBrowserName)({
        firefox: true
      })).toBe('firefox');
    });
    it('should default to null', function () {
      expect((0, _environment.getBrowserName)({})).toBeNull();
    });
  });
});