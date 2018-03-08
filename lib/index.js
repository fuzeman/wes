"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Permissions", {
  enumerable: true,
  get: function get() {
    return _permissions.Permissions;
  }
});
exports.default = void 0;

var _permissions = _interopRequireWildcard(require("./permissions"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _default = {
  permissions: _permissions.default
};
exports.default = _default;