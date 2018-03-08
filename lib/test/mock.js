"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockListener = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MockListener =
/*#__PURE__*/
function () {
  function MockListener() {
    _classCallCheck(this, MockListener);

    this._listeners = [];
  }

  _createClass(MockListener, [{
    key: "emit",
    value: function emit() {
      for (var i = 0; i < this._listeners.length; i++) {
        var _listeners;

        (_listeners = this._listeners)[i].apply(_listeners, arguments);
      }
    }
  }, {
    key: "addListener",
    value: function addListener(listener) {
      this._listeners.push(listener);
    }
  }, {
    key: "hasListener",
    value: function hasListener(listener) {
      return this._listeners.indexOf(listener) >= 0;
    }
  }, {
    key: "removeListener",
    value: function removeListener(listener) {
      var index = this._listeners.indexOf(listener);

      if (index < 0) {
        return;
      }

      this._listeners.splice(index, 1);
    }
  }]);

  return MockListener;
}();

exports.MockListener = MockListener;