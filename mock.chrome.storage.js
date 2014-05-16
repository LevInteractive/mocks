/*!
 * mock.chrome.storage.js
 *
 * Basic mocking for Chrome's storage API - sync & local.
 * https://developer.chrome.com/extensions/storage
 *
 * Created by Pete Saia <pete@lev-interactive.com>
 *
 * Copyright 2013, 2014 Lev Interacitve, LLC
 * Released under the MIT license
 * http://lev-interactive.com/
 */
(function(global) {
  global.chromeStorageMock = function() {
    return Object.create({
      cache: {},
      get: function(key, fn) {
        var obj = {};
        if (this.cache[key]) {
          obj[key] = this.cache[key];
        }
        if (fn) {
          fn(obj);
        }
      },
      set: function(data, fn) {
        var key = Object.keys(data)[0];
        var val = data[key];
        this.cache[key] = val;
        if (fn) {
          fn(data);
        }
      },
      remove: function(keys, fn) {
        if (Array.isArray(keys)) {
          keys.forEach(function(key) {
            if (this.cache[key]) {
              delete this.cache[key];
            }
          }.bind(this));
        } else if ("string" === typeof keys) {
          if (this.cache[keys]) {
            delete this.cache[keys];
          }
        }
        if (fn) {
          fn();
        }
      },
      clear: function(fn) {
        this.cache = {};
        if (fn) {
          fn();
        }
      },
      getBytesInUse: function(keys, fn) {
        if (fn) {
          fn(100); // No reason for accuracy at this time.
        }
      }
    });
  };
})(window);
