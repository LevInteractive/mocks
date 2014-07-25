/*!
 * mock.localStorage.js
 *
 * Basic mocking for HTML5 window.localStorage.
 * https://developer.mozilla.org/en/docs/Web/Guide/API/DOM/Storage
 *
 * Created by Pete Saia <pete@lev-interactive.com>
 *
 * Copyright 2013, 2014 Lev Interacitve, LLC
 * Released under the MIT license
 * http://lev-interactive.com/
 */
(function(global) {
  global.localStorageMock = function() {
    var ls = {};
    ls.setItem = function (key, val) {
      this[escape(key)] = escape(val);
    };
    ls.getItem = function (key) {
      return this[escape(key)];
    };
    ls.removeItem = function (key) {
      if (this[escape(key)]) {
        delete this[escape(key)];
      }
    };
    ls.hasOwnProperty = function(key) {
      return Object.keys(this).indexOf(escape(key)) !== -1;
    };
    Object.defineProperty(ls, 'length', {
      get: function () {
        return Object.keys(this).length - 4;
      }
    });
    return ls;
  };
})(window);
