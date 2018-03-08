"use strict";

var _base = _interopRequireDefault(require("./base"));

var _mock = require("../test/mock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestCompatibility = {
  webextensions: {
    api: {
      test: {
        value: {
          __compat: {
            support: {
              chrome: {
                version_added: true
              },
              firefox: {
                version_added: '55'
              }
            }
          }
        },
        onEvent: {
          __compat: {
            support: {
              chrome: {
                version_added: true
              },
              firefox: {
                version_added: '55'
              }
            }
          }
        },
        success: {
          __compat: {
            support: {
              chrome: {
                version_added: true
              },
              firefox: {
                version_added: '55'
              }
            }
          }
        },
        error: {
          __compat: {
            support: {
              chrome: {
                version_added: true
              },
              firefox: {
                version_added: '55'
              }
            }
          }
        },
        successAsync: {
          __compat: {
            support: {
              chrome: {
                version_added: true
              },
              firefox: {
                version_added: '55'
              }
            }
          }
        },
        errorAsync: {
          __compat: {
            support: {
              chrome: {
                version_added: true
              },
              firefox: {
                version_added: '55'
              }
            }
          }
        }
      }
    }
  }
};

var Test =
/*#__PURE__*/
function (_Base) {
  _inherits(Test, _Base);

  function Test() {
    _classCallCheck(this, Test);

    return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
  }

  _createClass(Test, [{
    key: "success",
    value: function success() {
      return this.$call('success');
    }
  }, {
    key: "error",
    value: function error() {
      return this.$call('error');
    }
  }, {
    key: "successAsync",
    value: function successAsync() {
      return this.$promise('successAsync');
    }
  }, {
    key: "errorAsync",
    value: function errorAsync() {
      return this.$promise('errorAsync');
    }
  }, {
    key: "value",
    get: function get() {
      return this.$property('value');
    }
  }, {
    key: "unsupported",
    get: function get() {
      return this.$property('unsupported');
    }
  }, {
    key: "onEvent",
    get: function get() {
      return this.$listener('onEvent');
    }
  }, {
    key: "onUnsupported",
    get: function get() {
      return this.$listener('onUnsupported');
    }
  }]);

  return Test;
}(_base.default);

Object.defineProperty(Test, "Title", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'Test'
});
Object.defineProperty(Test, "Name", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'test'
});
Object.defineProperty(Test, "Compatibility", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: TestCompatibility
});
describe('Base', function () {
  describe('Chrome', function () {
    var onEvent = new _mock.MockListener();
    var runtime = {
      lastError: null
    };
    var chrome = new Test({
      title: 'Chrome',
      name: 'chrome',
      version: '54.0',
      promises: false,
      namespace: {
        runtime: runtime,
        test: {
          value: 'value',
          onEvent: onEvent,
          success: function success() {
            return 'Success';
          },
          error: function error() {
            throw new Error('Exception');
          },
          successAsync: function successAsync(callback) {
            callback('Success');
          },
          errorAsync: function errorAsync(callback) {
            runtime.lastError = {
              message: 'Error'
            };
            callback();
          }
        }
      }
    });
    describe('$call', function () {
      it('should return value', function () {
        expect(chrome.success()).toBe('Success');
      });
      it('should raise an exception', function () {
        expect(function () {
          return chrome.error();
        }).toThrowError(Error, 'Exception');
      });
    });
    describe('$promise', function () {
      it('should return value', function () {
        return chrome.successAsync().then(function (result) {
          expect(result).toBe('Success');
        });
      });
      it('should reject with error', function (done) {
        chrome.errorAsync().then(function () {
          done.fail('Promise wasn\'t rejected');
        }, function (err) {
          expect(err.message).toBe('Error');
          done();
        });
      });
    });
    describe('$property', function () {
      it('should return value', function () {
        expect(chrome.value).toBe('value');
      });
      it('should raise an exception on unsupported browsers', function () {
        expect(function () {
          return chrome.unsupported;
        }).toThrowError(Error, 'Test API doesn\'t support "unsupported" (Unknown method: test.unsupported)');
      });
    });
    describe('$listener', function () {
      it('should support addListener(listener)', function (done) {
        chrome.onEvent.addListener(function (result) {
          expect(result).toBe('event');
          done();
        }); // Emit event

        onEvent.emit('event');
      });
      it('should support hasListener(listener)', function () {
        function listener() {} // Add listener


        chrome.onEvent.addListener(listener); // Ensure listener has been added

        expect(chrome.onEvent.hasListener(listener)).toBeTruthy();
      });
      it('should support removeListener(listener)', function () {
        function listener() {} // Add listener


        chrome.onEvent.addListener(listener); // Ensure listener has been added

        expect(chrome.onEvent.hasListener(listener)).toBeTruthy(); // Remove listener

        chrome.onEvent.removeListener(listener); // Ensure listener has been removed

        expect(chrome.onEvent.hasListener(listener)).toBeFalsy();
      });
      it('should raise an exception on unsupported browsers', function () {
        expect(function () {
          return chrome.onUnsupported.addListener(function () {
            return false;
          });
        }).toThrowError(Error, 'Test API doesn\'t support "onUnsupported" (Unknown method: test.onUnsupported)');
      });
    });
  });
  describe('Firefox', function () {
    var onEvent = new _mock.MockListener();
    var runtime = {
      lastError: null
    };
    var firefox = new Test({
      title: 'Firefox',
      name: 'firefox',
      version: '55.0',
      promises: true,
      namespace: {
        runtime: runtime,
        test: {
          value: 'value',
          onEvent: onEvent,
          success: function success() {
            return 'Success';
          },
          error: function error() {
            throw new Error('Exception');
          },
          successAsync: function successAsync() {
            return Promise.resolve('Success');
          },
          errorAsync: function errorAsync() {
            return Promise.reject(new Error('Error'));
          }
        }
      }
    });
    describe('$call', function () {
      it('should return value', function () {
        expect(firefox.success()).toBe('Success');
      });
      it('should raise exception', function () {
        expect(function () {
          return firefox.error();
        }).toThrowError(Error, 'Exception');
      });
    });
    describe('$promise', function () {
      it('should return value', function () {
        return firefox.successAsync().then(function (result) {
          expect(result).toBe('Success');
        });
      });
      it('should reject with error', function (done) {
        firefox.errorAsync().then(function () {
          done.fail('Promise wasn\'t rejected');
        }, function (err) {
          expect(err.message).toBe('Error');
          done();
        });
      });
    });
    describe('$property', function () {
      it('should return value', function () {
        expect(firefox.value).toBe('value');
      });
      it('should raise an exception on unsupported browsers', function () {
        expect(function () {
          return firefox.unsupported;
        }).toThrowError(Error, 'Test API doesn\'t support "unsupported" (Unknown method: test.unsupported)');
      });
    });
    describe('$listener', function () {
      it('should support addListener(listener)', function (done) {
        firefox.onEvent.addListener(function (result) {
          expect(result).toBe('event');
          done();
        }); // Emit event

        onEvent.emit('event');
      });
      it('should support hasListener(listener)', function () {
        function listener() {} // Add listener


        firefox.onEvent.addListener(listener); // Ensure listener has been added

        expect(firefox.onEvent.hasListener(listener)).toBeTruthy();
      });
      it('should support removeListener(listener)', function () {
        function listener() {} // Add listener


        firefox.onEvent.addListener(listener); // Ensure listener has been added

        expect(firefox.onEvent.hasListener(listener)).toBeTruthy(); // Remove listener

        firefox.onEvent.removeListener(listener); // Ensure listener has been removed

        expect(firefox.onEvent.hasListener(listener)).toBeFalsy();
      });
      it('should raise an exception on unsupported browsers', function () {
        expect(function () {
          return firefox.onUnsupported.addListener(function () {
            return false;
          });
        }).toThrowError(Error, 'Test API doesn\'t support "onUnsupported" (Unknown method: test.onUnsupported)');
      });
    });
  });
});