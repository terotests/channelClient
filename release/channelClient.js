// The code template begins here
'use strict';

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var channelClientModule_prototype = function channelClientModule_prototype() {
    // Then create the traits and subclasses for this class here...

    // the subclass definition comes around here then

    // The class definition is here...
    var channelClient_prototype = function channelClient_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {
          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return t instanceof Array;
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {
        var _instanceCache;

        // Initialize static variables here...

        if (!_myTrait_.hasOwnProperty('__factoryClass')) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (id) {

          if (!_instanceCache) _instanceCache = {};

          if (_instanceCache[id]) return _instanceCache[id];

          _instanceCache[id] = this;
        });

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (channelId, channelData) {

          this._channelId = channelId;
          this._channel = channelData;

          this._done = {};
        });
      })(this);
    };

    var channelClient = function channelClient(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof channelClient) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != channelClient._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new channelClient(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    channelClient._classInfo = {
      name: 'channelClient'
    };
    channelClient.prototype = new channelClient_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['channelClient'] = channelClient;
        this.channelClient = channelClient;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['channelClient'] = channelClient;
      } else {
        this.channelClient = channelClient;
      }
    }).call(new Function('return this')());

    (function (_myTrait_) {

      // Initialize static variables here...

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (t) {});
    })(this);
  };

  var channelClientModule = function channelClientModule(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof channelClientModule) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == 'function') {
          if (res._classInfo.name != channelClientModule._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == 'function') m.init.apply(m, args);
      }
    } else return new channelClientModule(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  channelClientModule._classInfo = {
    name: 'channelClientModule'
  };
  channelClientModule.prototype = new channelClientModule_prototype();

  if (typeof define !== 'undefined' && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function('return this')());