"use strict";

var Interfaces = _interopRequireWildcard(require("./index"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('Index', function () {
  it('should have classes exported', function () {
    expect(Interfaces.Permissions).toBeDefined();
  });
  it('should have interfaces defined', function () {
    expect(Interfaces.default.permissions).toBeDefined();
  });
});