"use strict";

var _mock = require("./test/mock");

var _permissions = require("./permissions");

describe('Permissions', function () {
  describe('Chrome', function () {
    var onAdded = new _mock.MockListener();
    var onRemoved = new _mock.MockListener();
    var runtime = {
      lastError: null
    };
    var chrome = new _permissions.Permissions({
      title: 'Chrome',
      name: 'chrome',
      version: '54.0',
      promises: false,
      namespace: {
        runtime: runtime,
        permissions: {
          onAdded: onAdded,
          onRemoved: onRemoved,
          contains: function contains(permissions, callback) {
            callback(true);
          },
          getAll: function getAll(callback) {
            callback({
              origins: ['https://google.com'],
              permissions: ['tabs']
            });
          },
          remove: function remove(permissions, callback) {
            callback(true);
          },
          request: function request(permissions, callback) {
            callback(true);
          }
        }
      }
    });
    describe('onAdded', function () {
      it('supports addListener(listener)', function (done) {
        function listener(result) {
          expect(result).toBe('added');
          done();
        } // Add listener


        chrome.onAdded.addListener(listener); // Emit event

        onAdded.emit('added');
      });
    });
    describe('onRemoved', function () {
      it('supports addListener(listener)', function (done) {
        function listener(result) {
          expect(result).toBe('removed');
          done();
        } // Add listener


        chrome.onRemoved.addListener(listener); // Emit event

        onRemoved.emit('removed');
      });
    });
    describe('contains', function () {
      it('should return value', function () {
        return chrome.contains({}).then(function (result) {
          expect(result).toBe(true);
        });
      });
    });
    describe('getAll', function () {
      it('should return value', function () {
        return chrome.getAll().then(function (result) {
          expect(result).toEqual({
            origins: ['https://google.com'],
            permissions: ['tabs']
          });
        });
      });
    });
    describe('remove', function () {
      it('should return value', function () {
        return chrome.remove({
          origins: ['https://google.com'],
          permissions: ['tabs']
        }).then(function (result) {
          expect(result).toEqual(true);
        });
      });
    });
    describe('request', function () {
      it('should return value', function () {
        return chrome.request({
          origins: ['https://google.com'],
          permissions: ['tabs']
        }).then(function (result) {
          expect(result).toEqual(true);
        });
      });
    });
  });
  describe('Firefox 54', function () {
    var firefox54 = new _permissions.Permissions({
      title: 'Firefox',
      name: 'firefox',
      version: '54.0',
      promises: true,
      namespace: {}
    });
    describe('contains', function () {
      it('should reject with unsupported error', function (done) {
        firefox54.contains({}).then(function () {
          done.fail('Promise wasn\'t rejected');
        }, function (err) {
          expect(err.message).toBe('Permissions API is not available (Requires: Firefox >= 55)');
          done();
        });
      });
    });
  });
  describe('Firefox 55', function () {
    var firefox55 = new _permissions.Permissions({
      title: 'Firefox',
      name: 'firefox',
      version: '55.0',
      promises: true,
      namespace: {
        permissions: {
          contains: function contains(permissions) {
            return Promise.resolve(true);
          },
          getAll: function getAll() {
            return Promise.resolve({
              origins: ['https://google.com'],
              permissions: ['tabs']
            });
          },
          remove: function remove(permissions) {
            return Promise.resolve(true);
          },
          request: function request(permissions) {
            return Promise.resolve(true);
          }
        }
      }
    });
    describe('contains', function () {
      it('should return value', function () {
        return firefox55.contains({}).then(function (result) {
          expect(result).toBe(true);
        });
      });
    });
    describe('getAll', function () {
      it('should return value', function () {
        return firefox55.getAll().then(function (result) {
          expect(result).toEqual({
            origins: ['https://google.com'],
            permissions: ['tabs']
          });
        });
      });
    });
    describe('remove', function () {
      it('should return value', function () {
        return firefox55.remove({
          origins: ['https://google.com'],
          permissions: ['tabs']
        }).then(function (result) {
          expect(result).toEqual(true);
        });
      });
    });
    describe('request', function () {
      it('should return value', function () {
        return firefox55.request({
          origins: ['https://google.com'],
          permissions: ['tabs']
        }).then(function (result) {
          expect(result).toEqual(true);
        });
      });
    });
  });
});