// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var channelClientModule_prototype = function channelClientModule_prototype() {
    // Then create the traits and subclasses for this class here...

    // the subclass definition comes around here then

    // The class definition is here...
    var later_prototype = function later_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {
        var _initDone;
        var _callers;
        var _oneTimers;
        var _everies;
        var _framers;

        // Initialize static variables here...

        /**
         * @param function fn
         * @param float thisObj
         * @param float args
         */
        _myTrait_.add = function (fn, thisObj, args) {
          if (thisObj || args) {
            var tArgs;
            if (Object.prototype.toString.call(args) === "[object Array]") {
              tArgs = args;
            } else {
              tArgs = Array.prototype.slice.call(arguments, 2);
              if (!tArgs) tArgs = [];
            }
            _callers.push([thisObj, fn, tArgs]);
          } else {
            _callers.push(fn);
          }
        };

        /**
         * @param function fn
         */
        _myTrait_.asap = function (fn) {
          this.add(fn);
        };

        /**
         * @param float seconds
         * @param float fn
         * @param float name
         */
        _myTrait_.every = function (seconds, fn, name) {

          if (!name) {
            name = "time" + new Date().getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0
          };
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (interval, fn) {
          if (!_initDone) {

            var frame, cancelFrame;

            this.polyfill();

            if (typeof window != "undefined") {
              var frame = window["requestAnimationFrame"],
                  cancelFrame = window["cancelRequestAnimationFrame"];
              ["", "ms", "moz", "webkit", "o"].forEach(function (x) {
                if (!frame) {
                  frame = window[x + "RequestAnimationFrame"];
                  cancelFrame = window[x + "CancelAnimationFrame"] || window[x + "CancelRequestAnimationFrame"];
                }
              });
            }

            if (!frame) frame = function (cb) {
              return setTimeout(cb, 16);
            };

            if (!cancelFrame) cancelFrame = function (id) {
              clearTimeout(id);
            };

            _callers = [];
            _oneTimers = {};
            _everies = {};
            _framers = [];
            var lastMs = 0;

            var _callQueQue = function _callQueQue() {
              var ms = new Date().getTime();
              var fn;
              while (fn = _callers.shift()) {
                if (Object.prototype.toString.call(fn) === "[object Array]") {
                  fn[1].apply(fn[0], fn[2]);
                } else {
                  fn();
                }
              }

              for (var i = 0; i < _framers.length; i++) {
                var fFn = _framers[i];
                fFn();
              }

              for (var n in _oneTimers) {
                if (_oneTimers.hasOwnProperty(n)) {
                  var v = _oneTimers[n];
                  v[0](v[1]);
                  delete _oneTimers[n];
                }
              }

              for (var n in _everies) {
                if (_everies.hasOwnProperty(n)) {
                  var v = _everies[n];
                  if (v.nextTime < ms) {
                    v.fn();
                    v.nextTime = ms + v.step;
                  }
                  if (v.until) {
                    if (v.until < ms) {
                      delete _everies[n];
                    }
                  }
                }
              }

              frame(_callQueQue);
              lastMs = ms;
            };
            _callQueQue();
            _initDone = true;
          }
        });

        /**
         * @param  key
         * @param float fn
         * @param float value
         */
        _myTrait_.once = function (key, fn, value) {
          // _oneTimers

          _oneTimers[key] = [fn, value];
        };

        /**
         * @param function fn
         */
        _myTrait_.onFrame = function (fn) {

          _framers.push(fn);
        };

        /**
         * @param float t
         */
        _myTrait_.polyfill = function (t) {};

        /**
         * @param float fn
         */
        _myTrait_.removeFrameFn = function (fn) {

          var i = _framers.indexOf(fn);
          if (i >= 0) {
            if (fn._onRemove) {
              fn._onRemove();
            }
            _framers.splice(i, 1);
            return true;
          } else {
            return false;
          }
        };
      })(this);
    };

    var later = function later(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof later) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new later(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    later._classInfo = {
      name: "later"
    };
    later.prototype = new later_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var _promise_prototype = function _promise_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float someVar
         */
        _myTrait_.isArray = function (someVar) {
          return Object.prototype.toString.call(someVar) === "[object Array]";
        };

        /**
         * @param Function fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == "[object Function]";
        };

        /**
         * @param Object obj
         */
        _myTrait_.isObject = function (obj) {
          return obj === Object(obj);
        };
      })(this);

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param Array firstArg
         */
        _myTrait_.all = function (firstArg) {

          var args;
          if (this.isArray(firstArg)) {
            args = firstArg;
          } else {
            args = Array.prototype.slice.call(arguments, 0);
          }
          // console.log(args);
          var targetLen = args.length,
              rCnt = 0,
              myPromises = [],
              myResults = new Array(targetLen);

          return this.then(function () {

            var allPromise = _promise();
            if (args.length == 0) {
              allPromise.resolve([]);
            }
            args.forEach(function (b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function (v) {
                  myResults[index] = v;
                  rCnt++;
                  if (rCnt == targetLen) {

                    allPromise.resolve(myResults);
                  }
                }, function (v) {
                  allPromise.reject(v);
                });
              } else {
                allPromise.reject("Not list of promises");
              }
            });

            return allPromise;
          });
        };

        /**
         * @param function collectFn
         * @param array promiseList
         * @param Object results
         */
        _myTrait_.collect = function (collectFn, promiseList, results) {

          var args;
          if (this.isArray(promiseList)) {
            args = promiseList;
          } else {
            args = [promiseList];
          }

          // console.log(args);
          var targetLen = args.length,
              isReady = false,
              noMore = false,
              rCnt = 0,
              myPromises = [],
              myResults = results || {};

          return this.then(function () {

            var allPromise = _promise();
            args.forEach(function (b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function (v) {
                  rCnt++;
                  isReady = collectFn(v, myResults);
                  if (isReady && !noMore || noMore == false && targetLen == rCnt) {
                    allPromise.resolve(myResults);
                    noMore = true;
                  }
                }, function (v) {
                  allPromise.reject(v);
                });
              } else {
                allPromise.reject("Not list of promises");
              }
            });

            return allPromise;
          });
        };

        /**
         * @param function fn
         */
        _myTrait_.fail = function (fn) {
          return this.then(null, fn);
        };

        /**
         * @param float withValue
         */
        _myTrait_.fulfill = function (withValue) {
          // if(this._fulfilled || this._rejected) return;

          if (this._rejected) return;
          if (this._fulfilled && withValue != this._stateValue) {
            return;
          }

          var me = this;
          this._fulfilled = true;
          this._stateValue = withValue;

          var chCnt = this._childPromises.length;

          while (chCnt--) {
            var p = this._childPromises.shift();
            if (p._onFulfill) {
              try {
                var x = p._onFulfill(withValue);
                // console.log("Returned ",x);
                if (typeof x != "undefined") {
                  p.resolve(x);
                } else {
                  p.fulfill(withValue);
                }
              } catch (e) {
                // console.error(e);
                /*
                If either onFulfilled or onRejected throws an exception e, promise2 
                must be rejected with e as the reason.            
                */
                p.reject(e);
              }
            } else {
              /*
              If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
              fulfilled with the same value as promise1        
              */
              p.fulfill(withValue);
            }
          };
          // this._childPromises.length = 0;
          this._state = 1;
          this.triggerStateChange();
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (onFulfilled, onRejected) {
          // 0 = pending
          // 1 = fullfilled
          // 2 = error

          this._state = 0;
          this._stateValue = null;
          this._isAPromise = true;
          this._childPromises = [];

          if (this.isFunction(onFulfilled)) this._onFulfill = onFulfilled;
          if (this.isFunction(onRejected)) this._onReject = onRejected;

          if (!onRejected && this.isFunction(onFulfilled)) {

            var me = this;
            later().asap(function () {
              onFulfilled(function (v) {
                me.resolve(v);
              }, function (v) {
                me.reject(v);
              });
            });
          }
        });

        /**
         * @param float t
         */
        _myTrait_.isFulfilled = function (t) {
          return this._state == 1;
        };

        /**
         * @param float t
         */
        _myTrait_.isPending = function (t) {
          return this._state == 0;
        };

        /**
         * @param bool v
         */
        _myTrait_.isRejected = function (v) {
          return this._state == 2;
        };

        /**
         * @param function fn
         */
        _myTrait_.onStateChange = function (fn) {

          if (!this._listeners) this._listeners = [];

          this._listeners.push(fn);
        };

        /**
         * @param Object withReason
         */
        _myTrait_.reject = function (withReason) {

          // if(this._rejected || this._fulfilled) return;

          // conso

          if (this._fulfilled) return;
          if (this._rejected && withReason != this._rejectReason) return;

          this._state = 2;
          this._rejected = true;
          this._rejectReason = withReason;
          var me = this;

          var chCnt = this._childPromises.length;
          while (chCnt--) {
            var p = this._childPromises.shift();

            if (p._onReject) {
              try {
                p._onReject(withReason);
                p.reject(withReason);
              } catch (e) {
                /*
                If either onFulfilled or onRejected throws an exception e, promise2 
                must be rejected with e as the reason.            
                */
                p.reject(e);
              }
            } else {
              /*
              If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
              fulfilled with the same value as promise1        
              */
              p.reject(withReason);
            }
          };

          // this._childPromises.length = 0;
          this.triggerStateChange();
        };

        /**
         * @param Object reason
         */
        _myTrait_.rejectReason = function (reason) {
          if (reason) {
            this._rejectReason = reason;
            return;
          }
          return this._rejectReason;
        };

        /**
         * @param Object x
         */
        _myTrait_.resolve = function (x) {

          // console.log("Resolving ", x);

          // can not do this many times...
          if (this._state > 0) return;

          if (x == this) {
            // error
            this._rejectReason = "TypeError";
            this.reject(this._rejectReason);
            return;
          }

          if (this.isObject(x) && x._isAPromise) {

            //
            this._state = x._state;
            this._stateValue = x._stateValue;
            this._rejectReason = x._rejectReason;
            // ...
            if (this._state === 0) {
              var me = this;
              x.onStateChange(function () {
                if (x._state == 1) {
                  // console.log("State change");
                  me.resolve(x.value());
                }
                if (x._state == 2) {
                  me.reject(x.rejectReason());
                }
              });
            }
            if (this._state == 1) {
              // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
              this.fulfill(this._stateValue);
            }
            if (this._state == 2) {
              // console.log("Relved to be Promise was rejected ", x._rejectReason);
              this.reject(this._rejectReason);
            }
            return;
          }
          if (this.isObject(x) && x.then && this.isFunction(x.then)) {
            // console.log("Thenable ", x);
            var didCall = false;
            try {
              // Call the x.then
              var me = this;
              x.then.call(x, function (y) {
                if (didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
              }, function (r) {
                if (didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
              });
            } catch (e) {
              if (!didCall) this.reject(e);
            }
            return;
          }
          this._state = 1;
          this._stateValue = x;

          // fulfill the promise...
          this.fulfill(x);
        };

        /**
         * @param float newState
         */
        _myTrait_.state = function (newState) {
          if (typeof newState != "undefined") {
            this._state = newState;
          }
          return this._state;
        };

        /**
         * @param function onFulfilled
         * @param function onRejected
         */
        _myTrait_.then = function (onFulfilled, onRejected) {

          if (!onRejected) onRejected = function () {};

          var p = new _promise(onFulfilled, onRejected);
          var me = this;

          if (this._state == 1) {
            later().asap(function () {
              me.fulfill(me.value());
            });
          }
          if (this._state == 2) {
            later().asap(function () {
              me.reject(me.rejectReason());
            });
          }
          this._childPromises.push(p);
          return p;
        };

        /**
         * @param float t
         */
        _myTrait_.triggerStateChange = function (t) {
          var me = this;
          if (!this._listeners) return;
          this._listeners.forEach(function (fn) {
            fn(me);
          });
          // one-timer
          this._listeners.length = 0;
        };

        /**
         * @param float v
         */
        _myTrait_.value = function (v) {
          if (typeof v != "undefined") {
            this._stateValue = v;
            return this;
          }
          return this._stateValue;
        };
      })(this);
    };

    var _promise = function _promise(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _promise) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != _promise._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new _promise(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _promise._classInfo = {
      name: "_promise"
    };
    _promise.prototype = new _promise_prototype();

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
          return Object.prototype.toString.call(fn) == "[object Function]";
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      // trait comes here...

      (function (_myTrait_) {
        var _cmdNsMap;

        // Initialize static variables here...

        /**
         * @param float url
         */
        _myTrait_._getNsFromUrl = function (url) {
          if (_nsShortcuts[url]) {
            return _nsShortcuts[url];
          }
          _nsReverse[_nsIndex] = url;
          _nsShortcuts[url] = _nsIndex++;

          return _nsShortcuts[url];
        };

        /**
         * @param float nsName
         */
        _myTrait_._getNsShorthand = function (nsName) {

          if (_nsShortcuts[nsName]) {
            return _nsShortcuts[nsName];
          }
          _nsReverse[_nsIndex] = nsName;
          _nsShortcuts[nsName] = _nsIndex++;

          return _nsShortcuts[nsName];
        };

        /**
         * @param float t
         */
        _myTrait_._getReflections = function (t) {
          return _localReflections;
        };

        /**
         * @param float objId
         */
        _myTrait_._getReflectionsFor = function (objId) {

          if (_localReflections) {
            var list = _localReflections[objId];
            if (list) return list;
          }
          return [];
        };

        /**
         * @param int index
         */
        _myTrait_._getReverseNs = function (index) {

          return _nsReverse[index];
        };

        /**
         * @param float id
         */
        _myTrait_._idFromNs = function (id) {
          if (id) {

            var len = id.length;
            if (id[len - 1] == "#") {
              id = id.split("@").shift();
            }
          }
          return id;
        };

        /**
         * @param float id
         * @param float ns
         */
        _myTrait_._idToNs = function (id, ns) {

          if (id) {
            var len = id.length;
            // longString

            if (id[len - 1] == "#") {
              var ind = id.indexOf("@");
              var oldNs = id.substring(ind + 1, len - 1);
              if (oldNs != ns) {
                id = id.substring(0, ind) + "@" + ns + "#";
              }
            } else {
              id = id + "@" + ns + "#";
            }
          }
          return id;
        };

        /**
         * @param float id
         */
        _myTrait_._nsFromId = function (id) {
          var ns;
          if (id) {
            id = id + "";
            var len = id.length;
            if (id[len - 1] == "#") {
              ns = id.split("@").pop();
              ns = ns.split("#").shift();
            }
          }
          return ns;
        };

        /**
         * @param float cmd
         * @param float ns
         */
        _myTrait_._transformCmdFromNs = function (cmd, ns) {

          if (!ns) ns = this._ns;

          var map = _cmdNsMap,
              nextCmd = cmd.slice(),
              swap = map[cmd[0]],
              me = this;
          if (swap) {
            swap.forEach(function (index) {
              nextCmd[index] = me._idFromNs(nextCmd[index], ns);
            });
          }
          return nextCmd;
        };

        /**
         * @param float cmd
         * @param float ns
         */
        _myTrait_._transformCmdToNs = function (cmd, ns) {

          if (!ns) ns = this._ns;

          var map = _cmdNsMap,
              nextCmd = cmd.slice(),
              swap = map[cmd[0]],
              me = this;
          if (swap) {
            for (var i = 0; i < swap.length; i++) {
              var index = swap[i];
              nextCmd[index] = this._idToNs(nextCmd[index], ns);
            }
          }
          return nextCmd;
        };

        /**
         * @param float obj
         * @param float ns
         */
        _myTrait_._transformObjFromNs = function (obj, ns) {
          if (!ns) ns = this._ns;

          if (obj && obj.__id) {
            if (obj.__p) obj.__p = this._idFromNs(obj.__p, ns);
            obj.__id = this._idFromNs(obj.__id, ns);
            for (var n in obj.data) {
              if (obj.data.hasOwnProperty(n)) {
                if (this.isObject(obj.data[n])) this._transformObjFromNs(obj.data[n], ns);
              }
            }
          }
          return obj;
        };

        /**
         * @param float obj
         * @param float ns
         */
        _myTrait_._transformObjToNs = function (obj, ns) {
          if (!ns) ns = this._ns;
          if (obj && obj.__id) {

            // the old way, currently the socket ID may be the same, but not used right now
            /*
            var nsNext;
            if(obj.__radioURL) {
            var nsNext = this._getNsShorthand( obj.__radioURL );
            }
            ns = nsNext || ns;
            */

            // obj = me._transformObjToNs( obj, ns );
            obj.__id = this._idToNs(obj.__id, ns);
            if (obj.__p) {
              obj.__p = this._idToNs(obj.__p, ns);
            }
            for (var n in obj.data) {
              if (obj.data.hasOwnProperty(n)) {
                if (this.isObject(obj.data[n])) this._transformObjToNs(obj.data[n], ns);
              }
            }
          }

          return obj;
        };

        /**
         * @param float obj
         * @param float parentObj
         * @param float parentObj2
         */
        _myTrait_._transformToNsBeforeInsert = function (obj, parentObj, parentObj2) {

          // OK, so...

          var cmdList = obj.__ctxCmdList;
          var ns = this._nsFromId(parentObj.__id);

          console.log(" _transformToNsBeforeInsert ");

          var me = this;
          if (ns) {
            // console.log("Using namespace "+ns);
            if (cmdList) {
              cmdList.forEach(function (c) {
                c.cmd = me._transformCmdToNs(c.cmd, ns);
              });
            }
            obj = me._transformObjToNs(obj, ns);
            obj.__ctxCmdList = cmdList;
            this._addToCache(obj);
            return obj;
          }
          // this._addToCache( obj );
          return obj;
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (t) {
          if (!_cmdNsMap) {
            _cmdNsMap = {
              1: [1],
              2: [1],
              4: [4],
              5: [2, 4],
              7: [2, 4],
              8: [2, 4],
              10: [2, 4],
              12: [1, 4],
              13: [4],
              16: [3, 4]
            };
          }
        });
      })(this);

      (function (_myTrait_) {
        var _instanceCache;

        // Initialize static variables here...

        if (!_myTrait_.hasOwnProperty("__factoryClass")) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (id, socket) {

          if (!id || !socket) return;

          id = id + socket.getId();

          if (!_instanceCache) _instanceCache = {};
          if (_instanceCache[id]) return _instanceCache[id];
          _instanceCache[id] = this;
        });

        /**
         * @param float t
         */
        _myTrait_._createTransaction = function (t) {

          // package to be sent to the server
          this._currentFrame = {
            id: this.guid(),
            version: 1,
            from: this._data.getJournalLine(),
            fail_tolastok: true,
            commands: []
          };

          /*
          data : {
            id   : "t2",                   // unique ID for transaction
            version : 1,                    // channel version
            from : 1,                      // journal line to start the change
            to   : 2,                      // the last line ( optionsl, I guess )
            fail_tolastok : true,           // fail until last ok command
            // fail_all : true,
            commands : [
                [4, "fill", "black", "blue", "id1"]
            ]                               
          }
          */
        };

        /**
         * @param float id
         */
        _myTrait_._fetch = function (id) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);
          if (obj) {
            return obj;
          }
        };

        /**
         * This is the beef of almost everything, when a new frame comes around, what to do with it? There are many options what to do, we just have to pick one strategy.
         * @param float socket
         * @param float myNamespace
         */
        _myTrait_._incoming = function (socket, myNamespace) {

          var me = this,
              channelId = this._channelId;

          socket.on("upgrade_" + this._channelId, function (cmd) {

            me._upgradePending = false;
            // just don't accept any msgs
            if (me._disconnected) return;

            if (cmd) {

              if (cmd.partial) {

                // should be reversing perhaps first to some line...
                var dd = me._clientState.data;

                dd.reverseToLine(cmd.partialFrom);
                console.log("--- refreshing the partials, reversed to line --- ", cmd.partialFrom);
                var errCnt = 0;
                cmd.partial.forEach(function (c) {
                  if (errCnt > 0) return;
                  var r;
                  var cmdIn = me._transformCmdToNs(c);
                  if (!((r = dd.execCmd(cmdIn, true)) === true)) {
                    console.error("Partial ", r);
                    errCnt++;
                  }
                });

                if (errCnt == 0) {
                  me._clientState.needsRefresh = false;
                  me._clientState.needsFullRefresh = false;

                  dd._journal.length = cmd.partialEnds;

                  // The correct position
                  me._clientState.last_update[0] = 0;
                  me._clientState.last_update[1] = dd._journal.length;
                  me._clientState.last_sent[0] = 0;
                  me._clientState.last_sent[1] = dd._journal.length;
                } else {
                  me._clientState.needsFullRefresh = true;
                }
              }
              if (cmd.data) {

                // full upgrade coming here, must also replace the journal

                var myData = me._clientState.data.getData(); // <- the data
                me._transformObjToNs(cmd.data);

                var diff = diffEngine().compareFiles(myData, cmd.data);
                console.log("The diff ", JSON.stringify(diff));
                // run the commands for the local data
                var dd = me._clientState.data;
                var errCnt = 0;
                diff.cmds.forEach(function (c) {
                  console.log("Diff cmd ", c);
                  if (errCnt > 0) return;
                  var r;
                  /// dd.execCmd(c, true); // the point is just to change the data to something else
                  if (!((r = dd.execCmd(c, true)) === true)) {
                    console.error("Full error ", r);
                    errCnt++;
                  }
                });

                // and now the hard part, upgrade the local client data.
                if (errCnt == 0) {

                  me._clientState.needsRefresh = false;
                  me._clientState.needsFullRefresh = false;

                  console.log("** full update should have gone ok ** ");
                  dd._journal.length = 0;
                  dd._journal.push.apply(dd._journal, cmd.journal);
                  me._clientState.needsRefresh = false;
                  me._clientState.version = cmd.version;

                  // dd._journal.length = cmd.updateEnds;

                  me._clientState.last_update[0] = 0;
                  me._clientState.last_update[1] = dd._journal.length;
                  me._clientState.last_sent[0] = 0;
                  me._clientState.last_sent[1] = dd._journal.length;

                  console.log("Version ", me._clientState.version);
                } else {
                  console.error("** errors with the full update ** ");
                  me._clientState.needsFullRefresh = true;
                  // TODO: might be unresolvable error here, if too many
                  // re-connections or refreshes appear
                }
                /*
                // the state management
                me._clientState = {
                    data : chData,              // The channel data object
                    client : me,                // The channel client object (for Namespace conversion )
                    needsRefresh : false,       // true if client is out of sync and needs to reload
                    version : me._channelStatus.version,               
                    last_update : [0, chData.getJournalLine()],  // last succesfull server update
                    last_sent : [0, chData.getJournalLine()]     // last range sent to the server
                
                };
                */
              }
            }
          });

          socket.on("s2c_" + this._channelId, function (cmd) {

            // just don't accept any msgs
            if (me._disconnected) return;
            if (cmd) {
              var res = me._policy.deltaServerToClient(cmd, me._clientState);
            }
            // done, no other action needed???
          });

          /*
          // These incoming commands are problematic now...
          socket.on("frame_"+channelId, function(cmd) {
          var frame = cmd.data;
          var chData = me._data;
          console.log("--- incoming to "+socket.getEnum()+ "--- ");
          console.log(JSON.stringify( cmd ));
          // 1. check if we have not written anything to our change buffer, the easy case...
          var myLine = me._data.getJournalLine();
          if(myLine == frame.from) {
          console.log("--- incoming ok --- ");
          frame.commands.forEach( function(cc) {
            if( me._data.execCmd(me._transformCmdToNs(cc, myNamespace)) ) {
                me._currentFrame.from++;
            }
          });
          return; // easiest option
          } else {
          console.log("--- incoming had problems --- ");
          // now the situation looks like this:
                 // -- the from line is here ---
          // [our command]
          // [our command]
          // -> and the new change frame wants to add these to our journal
          // [frame command]
          // [frame command]        
                 // the server is always right. we have to remove our commands from the
          // journal if we want to keep the sync with the current version
          // => the other option would be to create a new fork here, which requires
          // another command policy - TODO later this.
                 // the commands have been applied to our UI using workers most likely and
          // if changes are not conflicting, we might be able to keep them, so we
          // collect the old commands to temporary list and see if they can be moved
          // to the end of the journal later on
                 
          // first, check if there are pending frames, in this case we can no longer change the
          // outgoing data and it's going to fail on the server most likely, so just revert the
          // buffer and replace the situation with the server commands
          if( me._pendingFrames.length > 0 ) {
            
            console.log("--- there were pending frames --- ");
            
            // the pending frames have failed at least locally,
            // we don't know what the server thinks
            me._pendingFrames.forEach( function(f) {
                f._didFail = true; // ??? is this used at all ???
            });
            
            chData.reverseToLine( frame.from ); // last known common position
            for(var i=0; i<frame.commands.length; i++) {
                var cmd = frame.commands[i];
                if( me._data.execCmd(me._transformCmdToNs(cmd, myNamespace)) ) {
                    okCnt++;
                } else {
                    // a problem: something is totally out of order now, what do do?
                    console.error("syncing frames failed, buffer out of order");
                    break;
                }
            }  
            console.log("--- done --- ");
            me._createTransaction(); // reset the current frame also
            return; // 
          }
             // CASE: no request outside, try to fix the buffer.
          console.log("--- trying to run cmds  --- ");
                 var rest = chData._journal.splice(frame.from, myLine - frame.from );
          var orig_pointer = chData._journalPointer;
                 chData._journalPointer -= myLine - frame.from;    
                 // then we we execute the commands to the channelObject to see if there is conflict
          var okCnt = 0, cLen = frame.commands.length, bFail = false;
          for(var i=0; i<cLen; i++) {
            var cmd = frame.commands[i];
            if( me._data.execCmd(me._transformCmdToNs(cmd, myNamespace)) ) {
                okCnt++;
            } else {
                // there is a conflict, we must revert
                bFail = true;
                break;
            }
          }
                 if(!bFail) {
            // the commands were written OK, now add our own commands to the end
            // -- the from line is here ---
            // [frame command]
            // [frame command]              
            // [our command]       <--- now we move these back to the end
            // [our command]
            
            console.log("--- run was ok  --- ");
             // fix the current frame start index
            me._currentFrame.from = chData._journalPointer;
            
            // now the journal has our "unverified by server" commands at the end 
            chData._journalPointer += rest.length;
            var i;
            while( i = rest.shift() ) chData._journal.push( i );
             
            // the _currentFrame is now waiting to be sent and it does not have
            // data which was conflicting with the incoming frame we just received
            // to the locat channelObject, so there is a good possibility that
            // when the data is sent to the server, it will be accepted.
          } else {
            
            console.log("--- run failed  --- ");
            
            // inserting the new data has failed, because we have conflicting changes locall
            
            // first, undo the commands we tried to run
            me._data.undo( okCnt ); 
            
            // then restore the buffer we originally had.
            chData._journalPointer = orig_pointer;
            var rLen = rest.length;
            var i;
            while( i = rest.shift() ) chData._journal.push( i );
             // and then, undo the local commands which were conflicting with the server changes
            chData.undo( rLen );
            
            // we should now have the situation server expects to find from the "from" index
            
            // try running the servers commands to the local channelObject
            bFail = false;
            for(var i=0; i<cLen; i++) {
                var cmd = frame.commands[i];
                if( me._data.execCmd(me._transformCmdToNs(cmd, myNamespace)) ) {
                    okCnt++;
                } else {
                    // a problem: something is totally out of order now, what do do?
                    console.error("syncing frames failed, buffer out of order");
                    break;
                }
            }            
          }
              }
          });
          */
        };

        /**
         * @param Object socket
         */
        _myTrait_._onFrameLoop = function (socket) {

          var me = this,
              channelId = this._channelId;

          var _frameFn = function _frameFn() {

            if (!me._policy) return;
            if (me._disconnected) return; // in case disconnected, don't send data

            if (me._clientState.needsRefresh) {
              // *** if refresh is required, out of sync client **

              if (!me._upgradePending) {
                console.log(" needsRefresh && !_upgradePending ");
                me.askUpgrade(me._clientState.needsFullRefresh);
              }
              me._upgradePending = true;
            }

            var packet = me._policy.constructClientToServer(me._clientState);
            if (packet) {

              //console.log("Sending packet to server ");
              //console.log(packet);
              socket.send("channelCommand", {
                channelId: channelId,
                cmd: "c2s",
                data: packet
              }).then(function (res) {
                if (res && res.errors) {
                  // console.error(res.errors);
                  if (res.errors.length > 0) {
                    var bRefresh = false;
                    res.errors.forEach(function (err) {
                      if (err.error == 44) {
                        bRefresh = true;
                      }
                    });
                    if (bRefresh) {
                      me._clientState.needsRefresh = true;
                    }
                  }
                }
              });
            }
          };
          later().onFrame(_frameFn);
        };

        /**
         * Add command to next change frame to be sent over the network. TODO: validate the commands against the own channelObject, for example the previous value etc.
         * @param Array cmd
         * @param float dontBroadcast
         */
        _myTrait_.addCommand = function (cmd, dontBroadcast) {
          /*
          data : {
            id   : "t2",                   // unique ID for transaction
            version : 1,                    // channel version
            from : 1,                      // journal line to start the change
            to   : 2,                      // the last line ( optionsl, I guess )
            fail_tolastok : true,           // fail until last ok command
            // fail_all : true,
            commands : [
                [4, "fill", "black", "blue", "id1"]
            ]                               
          }
          */

          if (this._currentFrame) {
            var cmdOut = this._transformCmdFromNs(cmd, this._ns);
            var cmdIn = this._transformCmdToNs(cmd, this._ns);
            // the local command is run immediately and if it passes then we add it to the frame
            if (this._data.execCmd(cmdIn, dontBroadcast)) {
              this._currentFrame.commands.push(cmdOut);
            }
          } else {
            // local command, no frame to add commands.
            var cmdIn = this._transformCmdToNs(cmd, this._ns);
            // the local command is run immediately and if it passes then we add it to the frame
            if (this._data.execCmd(cmdIn, dontBroadcast)) {}
          }
        };

        /**
         * @param bool askFull
         */
        _myTrait_.askUpgrade = function (askFull) {

          if (!this._socket) return;

          this._socket.send("channelCommand", {
            channelId: this._channelId,
            cmd: "upgradeRequest",
            data: {
              version: this._clientState.version,
              last_update: this._clientState.last_update,
              askFull: askFull
            }
          }).then(function () {});
        };

        /**
         * @param float id
         * @param float index
         */
        _myTrait_.at = function (id, index) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);
          if (obj) {
            return obj.data[index];
          }
        };

        /**
         * @param float t
         */
        _myTrait_.disconnect = function (t) {
          this._disconnected = true;
          return this;
        };

        /**
         * @param float name
         * @param float description
         * @param float options
         */
        _myTrait_.fork = function (name, description, options) {
          /*
          {
          version : 1,
          name : "Initial version",
          utc : (new Date()).getTime(),
          journalLine : 0,
          channelId : "my/channel/fork1/"
          }
          */
          // me._channelStatus = respData.status;
          /*
          // has channel + fork information included
          {   "fromJournalLine":1,
          "version":1,
          "journalLine":1,
          "channelId":"my/channel/myFork",
          "fromVersion":2,
          "from":"my/channel",
          "to":"my/channel/myFork",
          "name":"test of fork","utc":14839287897}
          */

          if (this._isLocal) return;

          // ==> OK, ready to send data forward...

          // What is the journal line we are using for the fork???
          var forkCmd = {
            version: this._channelStatus.version,
            channelId: name,
            name: description,
            journalLine: 1
          };
          /*
          me._clientState = {
          data : chData,              // The channel data object
          client : me,                // The channel client object (for Namespace conversion )
          needsRefresh : false,       // true if client is out of sync and needs to reload
          version : me._channelStatus.version,               
          last_update : [0, chData.getJournalLine()],  // last succesfull server update
          last_sent : []              // last range sent to the server
          };
          */
          // <= we must be using the last serverupdate, and maybe add the extra lines to the
          // additional fork information to create a truly dynamic fork of the subject in case
          // some other client is "resisting" the update...
          forkCmd.journalLine = this._clientState.last_update[1];

          // the fork is being processed, the response is going to be ready after the promise completes
          var me = this;

          return _promise(function (results) {
            me._socket.send("channelCommand", {
              channelId: me._channelId,
              cmd: "fork",
              data: forkCmd
            }).then(function (resp) {
              // information from the server.
              // build new channel object
              // return it as the promise...
              results(resp);
            });
          });
        };

        /**
         * @param string id
         * @param float name
         */
        _myTrait_.get = function (id, name) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);
          if (obj) {
            return obj.data[name];
          }
        };

        /**
         * @param float t
         */
        _myTrait_.getChannelData = function (t) {
          return this._data;
        };

        /**
         * @param float t
         */
        _myTrait_.getData = function (t) {
          return this._data.getData();
        };

        /**
         * @param float id
         */
        _myTrait_.indexOf = function (id) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);
          if (obj) {
            var parent = this._fetch(obj.__p);
            if (parent && parent.data) {
              var index = parent.data.indexOf(obj);
              return index;
            }
          }
          return -1;
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (channelId, socket, options) {

          console.log("channelClient init starts");

          if (options && options.localChannel) {

            this._channelId = channelId;
            this._options = options;
            this._socketGUID = this.guid();
            this._isLocal = true;

            this._socket = _clientSocket(this._socketGUID, 1);
            var myNamespace = this._socket.getEnum();

            this._ns = myNamespace;
            this._id = channelId + this._socket.getId();
            var me = this;

            var mainData = options.localData;
            mainData = me._transformObjToNs(options.localData, myNamespace);

            var chData = _channelData(me._id, mainData, []);
            me._data = chData;
            me.resolve({
              result: true,
              channelId: channelId
            });
            return;
          } else {}

          if (!channelId || !socket) return;

          this._channelId = channelId;
          this._socket = socket;
          this._options = options;
          this._changeFrames = [];
          this._pendingFrames = [];

          var myNamespace = socket.getEnum();

          this._ns = myNamespace;

          this._id = channelId + socket.getId();
          var me = this;

          this._onFrameLoop(socket, myNamespace);
          this._incoming(socket, myNamespace);

          console.log("channelClient init");

          this._connCnt = 0;

          socket.on("connect", function () {

            console.log("Socket sent connected");

            me._connCnt++;

            // Authenticate...
            if (options.auth) {
              socket.send("auth", {
                userId: options.auth.username,
                password: options.auth.password
              }).then(function (resp) {

                if (resp.userId) {

                  me._userId = resp.userId;
                  me._logged = true;
                } else {
                  me._logged = false;
                  return false;
                }
                // ask to join the channel with this socket...
                return socket.send("requestChannel", {
                  channelId: channelId
                });
              }).then(function (resp) {
                // this channel client has been connected to the server ok
                if (resp && resp.channelId == channelId) {

                  me._connected = true;
                  // The next step: to load the channel information for the
                  // local objects to consume

                  if (me._connCnt > 1) {

                    // do not start again..
                    console.log("Already connected, asking upgrade");
                    me.askUpgrade();

                    return false;
                  }

                  return socket.send("channelCommand", {
                    channelId: channelId,
                    cmd: "readBuildTree",
                    data: ""
                  });
                } else {
                  return false;
                }
              }).then(function (respData) {

                if (respData) {

                  var resp = respData.build;
                  console.log("STATUS", JSON.stringify(respData.status));

                  // ? should we be updating this or is this just one-time info
                  me._channelStatus = respData.status;
                  /*
                  // has channel + fork information included
                  {   "fromJournalLine":1,
                  "version":1,
                  "journalLine":1,
                  "channelId":"my/channel/myFork",
                  "fromVersion":2,
                  "from":"my/channel",
                  "to":"my/channel/myFork",
                  "name":"test of fork","utc":14839287897}
                  */

                  // The build tree is here now...
                  // Should you transform the objects to other namespaces...?

                  var mainData = resp.pop();

                  // The data is here... but transforming?
                  mainData = me._transformObjToNs(mainData, myNamespace);

                  var chData = _channelData(me._id, mainData, []);
                  var list = resp.pop();

                  // should be updating the client
                  // var res = me._policy.deltaServerToClient( cmd, me._clientState);
                  while (list) {
                    chData._journalPointer = 0;
                    chData._journal.length = 0; // <-- the journal length, last will be spared
                    list.forEach(function (c) {
                      chData.execCmd(me._transformCmdToNs(c, myNamespace), true);
                    });
                    list = resp.pop();
                  }

                  // the state management
                  me._clientState = {
                    data: chData, // The channel data object
                    client: me, // The channel client object (for Namespace conversion )
                    needsRefresh: false, // true if client is out of sync and needs to reload
                    version: me._channelStatus.version,
                    last_update: [0, chData.getJournalLine()], // last succesfull server update
                    last_sent: [0, chData.getJournalLine()] // last range sent to the server

                  };
                  me._policy = _chPolicy();

                  me._data = chData;
                  me._createTransaction();
                  me.resolve({
                    result: true,
                    channelId: channelId
                  });
                } else {
                  me.resolve({
                    result: false,
                    text: "Authorization or connection failed"
                  });
                }
              });
            }
          });
        });

        /**
         * @param float id
         */
        _myTrait_.length = function (id) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);
          if (obj && obj.data) {
            return obj.data.length || 0;
          }
          return 0;
        };

        /**
         * @param float id
         */
        _myTrait_.moveDown = function (id) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);
          if (obj) {
            var parent = this._fetch(obj.__p);
            if (parent && parent.data) {
              var index = parent.data.indexOf(obj);
              var newIndex = index - 1;
              if (newIndex >= 0 && index >= 0 && index != newIndex && parent.data.length > newIndex) {
                this.addCommand([12, ns_id, newIndex, index, parent.__id]);
                // dataTest.execCmd( [12, "obj4", 0, 2, "array1"], true);
              }
            }
          }
        };

        /**
         * @param float id
         * @param float newIndex
         */
        _myTrait_.moveTo = function (id, newIndex) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);
          if (obj) {
            var parent = this._fetch(obj.__p);
            if (parent && parent.data) {
              var index = parent.data.indexOf(obj);
              if (index >= 0 && index != newIndex && parent.data.length > newIndex) {
                this.addCommand([12, ns_id, newIndex, index, parent.__id]);
                // dataTest.execCmd( [12, "obj4", 0, 2, "array1"], true);
              }
            }
          }
        };

        /**
         * @param float id
         */
        _myTrait_.moveUp = function (id) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);
          if (obj) {
            var parent = this._fetch(obj.__p);
            if (parent && parent.data) {
              var index = parent.data.indexOf(obj);
              var newIndex = index + 1;
              if (newIndex >= 0 && index >= 0 && index != newIndex && parent.data.length > newIndex) {
                this.addCommand([12, ns_id, newIndex, index, parent.__id]);
                // dataTest.execCmd( [12, "obj4", 0, 2, "array1"], true);
              }
            }
          }
        };

        /**
         * @param float t
         */
        _myTrait_.reconnect = function (t) {
          this._disconnected = false;
          return this;
        };

        /**
         * @param float cnt
         */
        _myTrait_.redo = function (cnt) {
          this._data.redo(cnt);
        };

        /**
         * @param float id
         */
        _myTrait_.remove = function (id) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);
          if (obj) {
            var parent = this._fetch(obj.__p);
            if (parent && parent.data) {
              var index = parent.data.indexOf(obj);
              if (index >= 0) {
                this.addCommand([8, index, ns_id, 0, parent.__id]);
                // this.addCommand([4, name, value, old_value, ns_id ]);
              }
            }
            // dataTest.execCmd( [8, 0, "obj1", 0, "array1"], true);
            // return obj.data[name];
          }
        };

        /**
         * @param float id
         * @param float name
         * @param float value
         */
        _myTrait_.set = function (id, name, value) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);
          if (obj && !this.isObject(value)) {
            var old_value = obj.data[name];
            if (old_value != value) {
              this.addCommand([4, name, value, old_value, ns_id]);
            }
          }
        };

        /**
         * @param float id
         * @param float name
         * @param float propObj
         */
        _myTrait_.setObject = function (id, name, propObj) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);

          if (obj && this.isObject(propObj) && propObj.__id) {
            var old_value = obj.data[name];

            if (!old_value) {
              // insert object only if there is no old value
              this.addCommand([5, name, propObj.__id, null, ns_id]);
            }
          }
        };

        /**
         * @param int cnt
         */
        _myTrait_.undo = function (cnt) {
          this._data.undo(cnt);
        };

        /**
         * @param float id
         * @param float name
         */
        _myTrait_.unset = function (id, name) {
          var ns_id = this._idToNs(id, this._ns); // is this too slow?
          var obj = this._data._find(ns_id);
          if (obj) {
            var old_obj = obj.data[name];
            if (old_obj && old_obj.__id) {
              this.addCommand([10, name, old_obj.__id, null, ns_id]);
            }
          }
        };

        /**
         * @param float t
         */
        _myTrait_.upgradeVersion = function (t) {

          // should start the snapshot command
          this._socket.send("channelCommand", {
            channelId: this._channelId,
            cmd: "snapshot",
            data: {}
          }).then(function () {});
        };
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
          if (typeof res == "function") {
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
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new channelClient(a, b, c, d, e, f, g, h);
    };
    // inheritance is here _promise

    channelClient_prototype.prototype = _promise.prototype;

    channelClient._classInfo = {
      name: "channelClient"
    };
    channelClient.prototype = new channelClient_prototype();

    (function () {
      if (typeof define !== "undefined" && define !== null && define.amd != null) {
        __amdDefs__["channelClient"] = channelClient;
        this.channelClient = channelClient;
      } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
        module.exports["channelClient"] = channelClient;
      } else {
        this.channelClient = channelClient;
      }
    }).call(new Function("return this")());

    (function (_myTrait_) {

      // Initialize static variables here...

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
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
        if (typeof res == "function") {
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
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new channelClientModule(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  channelClientModule._classInfo = {
    name: "channelClientModule"
  };
  channelClientModule.prototype = new channelClientModule_prototype();

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());

// --- let's not ---