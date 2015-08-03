
# channelClient

The client module for the channels

```javascript

    var socket = _clientSocket("http://localhost/", 1234);  

    var client = channelClient( "my/channel/myFork", socket, {
        auth : {
            username : "username",
            password : "password"
        }
    }).then( function() {
        // Channel is ready to be used
    });
```

# Test errors

- _myTrait_.reverseCmd cot a == undefined
- console.error for buffer out of sync was able to be created
















   

 


   
#### Class channelClientModule





   
    
    
    
    
    
    


   
      
            
#### Class later


- [add](README.md#later_add)
- [asap](README.md#later_asap)
- [every](README.md#later_every)
- [once](README.md#later_once)
- [onFrame](README.md#later_onFrame)
- [polyfill](README.md#later_polyfill)
- [removeFrameFn](README.md#later_removeFrameFn)



   


   



      
    
      
            
#### Class _promise


- [all](README.md#_promise_all)
- [collect](README.md#_promise_collect)
- [fail](README.md#_promise_fail)
- [fulfill](README.md#_promise_fulfill)
- [isFulfilled](README.md#_promise_isFulfilled)
- [isPending](README.md#_promise_isPending)
- [isRejected](README.md#_promise_isRejected)
- [onStateChange](README.md#_promise_onStateChange)
- [reject](README.md#_promise_reject)
- [rejectReason](README.md#_promise_rejectReason)
- [resolve](README.md#_promise_resolve)
- [state](README.md#_promise_state)
- [then](README.md#_promise_then)
- [triggerStateChange](README.md#_promise_triggerStateChange)
- [value](README.md#_promise_value)



   
    
##### trait util_fns

- [isArray](README.md#util_fns_isArray)
- [isFunction](README.md#util_fns_isFunction)
- [isObject](README.md#util_fns_isObject)


    
    


   
      
    



      
    
      
            
#### Class channelClient


- [_classFactory](README.md#channelClient__classFactory)
- [_createTransaction](README.md#channelClient__createTransaction)
- [_fetch](README.md#channelClient__fetch)
- [_incoming](README.md#channelClient__incoming)
- [_onFrameLoop](README.md#channelClient__onFrameLoop)
- [addCommand](README.md#channelClient_addCommand)
- [at](README.md#channelClient_at)
- [disconnect](README.md#channelClient_disconnect)
- [fork](README.md#channelClient_fork)
- [get](README.md#channelClient_get)
- [getChannelData](README.md#channelClient_getChannelData)
- [getData](README.md#channelClient_getData)
- [indexOf](README.md#channelClient_indexOf)
- [length](README.md#channelClient_length)
- [moveDown](README.md#channelClient_moveDown)
- [moveTo](README.md#channelClient_moveTo)
- [moveUp](README.md#channelClient_moveUp)
- [reconnect](README.md#channelClient_reconnect)
- [redo](README.md#channelClient_redo)
- [remove](README.md#channelClient_remove)
- [set](README.md#channelClient_set)
- [setObject](README.md#channelClient_setObject)
- [undo](README.md#channelClient_undo)
- [unset](README.md#channelClient_unset)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    
    
##### trait commad_trait

- [_getNsFromUrl](README.md#commad_trait__getNsFromUrl)
- [_getNsShorthand](README.md#commad_trait__getNsShorthand)
- [_getReflections](README.md#commad_trait__getReflections)
- [_getReflectionsFor](README.md#commad_trait__getReflectionsFor)
- [_getReverseNs](README.md#commad_trait__getReverseNs)
- [_idFromNs](README.md#commad_trait__idFromNs)
- [_idToNs](README.md#commad_trait__idToNs)
- [_nsFromId](README.md#commad_trait__nsFromId)
- [_transformCmdFromNs](README.md#commad_trait__transformCmdFromNs)
- [_transformCmdToNs](README.md#commad_trait__transformCmdToNs)
- [_transformObjFromNs](README.md#commad_trait__transformObjFromNs)
- [_transformObjToNs](README.md#commad_trait__transformObjToNs)
- [_transformToNsBeforeInsert](README.md#commad_trait__transformToNsBeforeInsert)


    
    


   
      
    
      
    



      
    





   
# Class channelClientModule


The class has following internal singleton variables:
        
        
### channelClientModule::constructor( t )

```javascript

```
        


   
    
    
    
    
    
    


   
      
            
# Class later


The class has following internal singleton variables:
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        
### <a name="later_add"></a>later::add(fn, thisObj, args)


```javascript
if(thisObj || args) {
   var tArgs;
   if( Object.prototype.toString.call( args ) === '[object Array]' ) {
       tArgs = args;
   } else {
       tArgs = Array.prototype.slice.call(arguments, 2);
       if(!tArgs) tArgs = [];
   }
   _callers.push([thisObj, fn, tArgs]);   
} else {
    _callers.push(fn);
}
```

### <a name="later_asap"></a>later::asap(fn)


```javascript
this.add(fn);

```

### <a name="later_every"></a>later::every(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0
};
```

### later::constructor( interval, fn )

```javascript
if(!_initDone) {

   var frame, cancelFrame;
   
   this.polyfill();
 
   if(typeof(window) != "undefined") {
       var frame = window['requestAnimationFrame'], 
           cancelFrame= window['cancelRequestAnimationFrame'];
       ['', 'ms', 'moz', 'webkit', 'o'].forEach( function(x) { 
           if(!frame) {
            frame = window[x+'RequestAnimationFrame'];
            cancelFrame = window[x+'CancelAnimationFrame'] 
                                       || window[x+'CancelRequestAnimationFrame'];
           }
        });
   }
 
    if (!frame)
        frame= function(cb) {
            return setTimeout(cb, 16);
        };
 
    if (!cancelFrame)
        cancelFrame = function(id) {
            clearTimeout(id);
        };    
        
    _callers = [];
    _oneTimers = {};
    _everies = {};
    _framers = [];
    var lastMs = 0;
    
    var _callQueQue = function() {
       var ms = (new Date()).getTime();
       var fn;
       while(fn=_callers.shift()) {
          if(Object.prototype.toString.call( fn ) === '[object Array]' ) {
              fn[1].apply(fn[0], fn[2]);
          } else {
              fn();
          }
           
       }
       
       for(var i=0; i<_framers.length;i++) {
           var fFn = _framers[i];
           fFn();
       }
       
       for(var n in _oneTimers) {
           if(_oneTimers.hasOwnProperty(n)) {
               var v = _oneTimers[n];
               v[0](v[1]);
               delete _oneTimers[n];
           }
       }
       
       for(var n in _everies) {
           if(_everies.hasOwnProperty(n)) {
               var v = _everies[n];
               if(v.nextTime < ms) {
                   v.fn();
                   v.nextTime = ms + v.step;
               }
               if(v.until) {
                   if(v.until < ms) {
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
```
        
### <a name="later_once"></a>later::once(key, fn, value)


```javascript
// _oneTimers

_oneTimers[key] = [fn,value];
```

### <a name="later_onFrame"></a>later::onFrame(fn)


```javascript

_framers.push(fn);
```

### <a name="later_polyfill"></a>later::polyfill(t)


```javascript
// --- let's not ---
```

### <a name="later_removeFrameFn"></a>later::removeFrameFn(fn)


```javascript

var i = _framers.indexOf(fn);
if(i>=0) {
    if(fn._onRemove) {
        fn._onRemove();
    }
    _framers.splice(i,1);
    return true;
} else {
    return false;
}
```



   


   



      
    
      
            
# Class _promise


The class has following internal singleton variables:
        
        
### <a name="_promise_all"></a>_promise::all(firstArg)


```javascript

var args;
if(this.isArray(firstArg)) {
  args = firstArg;
} else {
  args = Array.prototype.slice.call(arguments, 0);
}
// console.log(args);
var targetLen = args.length,
    rCnt = 0,
    myPromises = [],
    myResults = new Array(targetLen);
    
return this.then(
    function() {
 
        var allPromise = _promise();
        if(args.length==0) {
            allPromise.resolve([]);
        }
        args.forEach( function(b, index) {
            if(b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);
                
                b.then(function(v) {
                    myResults[index] = v;
                    rCnt++;
                    if(rCnt==targetLen) {

                        allPromise.resolve(myResults);
                    }
                }, function(v) {
                    allPromise.reject(v);
                });
                
            } else {
                allPromise.reject("Not list of promises");
            }
        })
        
        return allPromise;
        
    });



    

```

### <a name="_promise_collect"></a>_promise::collect(collectFn, promiseList, results)


```javascript

var args;
if(this.isArray(promiseList)) {
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
    
return this.then(
    function() {
 
        var allPromise = _promise();
        args.forEach( function(b, index) {
            if(b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);
                
                b.then(function(v) {
                    rCnt++;
                    isReady = collectFn(v, myResults);
                    if( (isReady && !noMore) || (noMore==false && targetLen == rCnt) ) {
                        allPromise.resolve(myResults);
                        noMore = true;
                    }
                }, function(v) {
                    allPromise.reject(v);
                });
                
            } else {
                allPromise.reject("Not list of promises");
            }
        })
        
        return allPromise;
        
    });

```

### <a name="_promise_fail"></a>_promise::fail(fn)


```javascript
return this.then(null, fn);
```

### <a name="_promise_fulfill"></a>_promise::fulfill(withValue)


```javascript
// if(this._fulfilled || this._rejected) return;

if(this._rejected) return;
if(this._fulfilled && withValue != this._stateValue) {
    return;
}

var me = this;
this._fulfilled = true;
this._stateValue = withValue;

var chCnt = this._childPromises.length;

while(chCnt--) {
    var p = this._childPromises.shift();
    if(p._onFulfill) {
        try {
            var x = p._onFulfill(withValue);
            // console.log("Returned ",x);
            if(typeof(x)!="undefined") {
                p.resolve(x);
            } else {
                p.fulfill(withValue);
            }
        } catch(e) {
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

```

### _promise::constructor( onFulfilled, onRejected )

```javascript
// 0 = pending
// 1 = fullfilled
// 2 = error

this._state = 0;
this._stateValue = null;
this._isAPromise = true;
this._childPromises = [];

if(this.isFunction(onFulfilled))
    this._onFulfill = onFulfilled;
if(this.isFunction(onRejected))
    this._onReject = onRejected;
    
if(!onRejected && this.isFunction(onFulfilled) ) {

    var me = this;
    later().asap(
        function() {
            onFulfilled( function(v) {
                me.resolve(v)
            }, function(v) {
                me.reject(v);
            });           
        });
 
}
```
        
### <a name="_promise_isFulfilled"></a>_promise::isFulfilled(t)


```javascript
return this._state == 1;
```

### <a name="_promise_isPending"></a>_promise::isPending(t)


```javascript
return this._state == 0;
```

### <a name="_promise_isRejected"></a>_promise::isRejected(v)


```javascript
return this._state == 2;
```

### <a name="_promise_onStateChange"></a>_promise::onStateChange(fn)


```javascript

if(!this._listeners)
    this._listeners = [];

this._listeners.push(fn);
```

### <a name="_promise_reject"></a>_promise::reject(withReason)


```javascript

// if(this._rejected || this._fulfilled) return;

// conso

if(this._fulfilled) return;
if(this._rejected && withReason != this._rejectReason) return;


this._state = 2;
this._rejected = true;
this._rejectReason = withReason;
var me = this;

var chCnt = this._childPromises.length;
while(chCnt--) {
    var p = this._childPromises.shift();

    if(p._onReject) {
        try {
            p._onReject(withReason);
            p.reject(withReason);
        } catch(e) {
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

```

### <a name="_promise_rejectReason"></a>_promise::rejectReason(reason)


```javascript
if(reason) {
    this._rejectReason = reason;
    return;
}
return this._rejectReason;
```

### <a name="_promise_resolve"></a>_promise::resolve(x)


```javascript

// console.log("Resolving ", x);

// can not do this many times...
if(this._state>0) return;

if(x==this) {
    // error
    this._rejectReason = "TypeError";
    this.reject(this._rejectReason);
    return;
}

if(this.isObject(x) && x._isAPromise) {
    
    // 
    this._state = x._state;
    this._stateValue = x._stateValue;
    this._rejectReason = x._rejectReason;
    // ... 
    if(this._state===0) {
        var me = this;
        x.onStateChange( function() {
            if(x._state==1) {
                // console.log("State change");
                me.resolve(x.value());
            } 
            if(x._state==2) {
                me.reject(x.rejectReason());                
            }
        });
    }
    if(this._state==1) {
        // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
        this.fulfill(this._stateValue);    
    }
    if(this._state==2) {
        // console.log("Relved to be Promise was rejected ", x._rejectReason);
        this.reject(this._rejectReason);
    }
    return;
}
if(this.isObject(x) && x.then && this.isFunction(x.then)) {
    // console.log("Thenable ", x);
    var didCall = false;
    try {
        // Call the x.then
        var  me = this;
        x.then.call(x, 
            function(y) {
                if(didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
            },
            function(r) {
                if(didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
            });
    } catch(e) {
        if(!didCall) this.reject(e);
    }
    return;    
}
this._state = 1;
this._stateValue = x;

// fulfill the promise...
this.fulfill(x);

```

### <a name="_promise_state"></a>_promise::state(newState)


```javascript
if(typeof(newState)!="undefined") {
    this._state = newState;
}
return this._state;
```

### <a name="_promise_then"></a>_promise::then(onFulfilled, onRejected)


```javascript

if(!onRejected) onRejected = function() {};

var p = new _promise(onFulfilled, onRejected);
var me = this;

if(this._state==1) {
    later().asap( function() {
        me.fulfill(me.value());
    });
}
if(this._state==2) {
    later().asap( function() {
        me.reject(me.rejectReason());
    });
}
this._childPromises.push(p);
return p;



```

### <a name="_promise_triggerStateChange"></a>_promise::triggerStateChange(t)


```javascript
var me = this;
if(!this._listeners) return;
this._listeners.forEach( function(fn) {
    fn(me); 
});
// one-timer
this._listeners.length = 0;
```

### <a name="_promise_value"></a>_promise::value(v)


```javascript
if(typeof(v)!="undefined") {
    this._stateValue = v;
    return this;
}
return this._stateValue;
```



   
    
## trait util_fns

The class has following internal singleton variables:
        
        
### <a name="util_fns_isArray"></a>util_fns::isArray(someVar)


```javascript
return Object.prototype.toString.call( someVar ) === '[object Array]';
```

### <a name="util_fns_isFunction"></a>util_fns::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="util_fns_isObject"></a>util_fns::isObject(obj)


```javascript
return obj === Object(obj);
```


    
    


   
      
    



      
    
      
            
# Class channelClient


The class has following internal singleton variables:
        
* _instanceCache
        
        
### <a name="channelClient__classFactory"></a>channelClient::_classFactory(id, socket)


```javascript

if(!id || !socket) return;

id = id + socket.getId();

if(!_instanceCache) _instanceCache = {};
if(_instanceCache[id]) return _instanceCache[id];
_instanceCache[id] = this;
```

### <a name="channelClient__createTransaction"></a>channelClient::_createTransaction(t)


```javascript

// package to be sent to the server
this._currentFrame = {
    id : this.guid(),
    version : 1,
    from : this._data.getJournalLine(),
    fail_tolastok : true,
    commands : []
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

```

### <a name="channelClient__fetch"></a>channelClient::_fetch(id)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );
if(obj) {
    return obj;
}

```

### <a name="channelClient__incoming"></a>channelClient::_incoming(socket, myNamespace)

This is the beef of almost everything, when a new frame comes around, what to do with it? There are many options what to do, we just have to pick one strategy.
```javascript

var me = this,
    channelId = this._channelId;


socket.on("s2c_"+this._channelId, function(cmd) {

   // just don't accept any msgs 
   if(me._disconnected) return;
    
   if(cmd) {
       var res = me._policy.deltaServerToClient( cmd, me._clientState);
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
```

### <a name="channelClient__onFrameLoop"></a>channelClient::_onFrameLoop(socket)


```javascript

var me = this,
    channelId = this._channelId;

later().onFrame(  function() {
    
    if(!me._policy) return;
    if(me._disconnected) return;    // in case disconnected, don't send data
    
    var packet = me._policy.constructClientToServer( me._clientState );
    if(packet) {
        // debugger;
    
            socket.send("channelCommand", {
                        channelId : channelId,
                        cmd : "c2s",
                        data : packet
                }).then( function() {
                    
                })    
    }
    
    if(me._currentFrame && me._currentFrame.commands.length ) {
        
        // Then, send the data to server 
        

        
        /*
        var sent = me._currentFrame;
        me._pendingFrames.push( me._currentFrame );
        //console.log("--- about to send ----");
        //console.log(JSON.stringify(me._currentFrame )); 
        // TODO: how to resolve the change conflicts here...
        socket.send("channelCommand", {
                        channelId : channelId,
                        cmd : "changeFrame",
                        data : me._currentFrame
                }).then( function(resp) {
                    
                    console.log("Command response "+socket.getEnum());
                    console.log(JSON.stringify( sent ) );
                    console.log(JSON.stringify( resp ) );
                    
                    var i = me._pendingFrames.indexOf( sent );
                    me._pendingFrames.splice(i,1);                    
                    if(resp.result) {
                            console.log("---- ok ---- ");
                            //console.log(JSON.stringify(sent)); 

                        if(resp.correctLines && resp.correctLines.length) {
                            
                            var first = resp.correctStart;
                            console.log("---- rolling back JUST IN CASE ---- ");
                            me._data.reverseToLine( first );
                            
                            resp.correctLines.forEach( function(c) {
//                                 me._data.execCmd(c);
                                me._data.execCmd(me._transformCmdToNs(c, me._ns) );
                            })
                            
                        }
                                                     
                            
                    } else {
                        //  var frame = resp.data;
                        // check if we need to rollback changes
                        if(resp.correctLines && resp.correctLines.length) {
                            
                            var first = resp.correctStart;
                            console.log("---- rolling back ---- ");
                            me._data.reverseToLine( first );
                            
                            resp.correctLines.forEach( function(c) {
//                                 me._data.execCmd(c);
                                me._data.execCmd(me._transformCmdToNs(c, me._ns) );
                            })
                            
                            me._createTransaction();
                        } else {
                            console.log("---- failed, but no rollback ---- ");
                            //console.log(JSON.stringify(sent));                            
                        }
                    }
                });
        me._createTransaction();
        */
    
    }
})
```

### <a name="channelClient_addCommand"></a>channelClient::addCommand(cmd, dontBroadcast)

Add command to next change frame to be sent over the network. TODO: validate the commands against the own channelObject, for example the previous value etc.
```javascript
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

if(this._currentFrame) {
    var cmdOut = this._transformCmdFromNs(cmd, this._ns);
    var cmdIn  = this._transformCmdToNs(cmd, this._ns);
    // the local command is run immediately and if it passes then we add it to the frame
    if( this._data.execCmd(cmdIn, dontBroadcast)  ) {
        this._currentFrame.commands.push( cmdOut );        
    }

} else {
    // local command, no frame to add commands.
    var cmdIn  = this._transformCmdToNs(cmd, this._ns);
    // the local command is run immediately and if it passes then we add it to the frame
    if( this._data.execCmd(cmdIn, dontBroadcast)  ) {
        
    }    
}
```

### <a name="channelClient_at"></a>channelClient::at(id, index)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );
if(obj) {
    return obj.data[index];
}
```

### <a name="channelClient_disconnect"></a>channelClient::disconnect(t)


```javascript
this._disconnected = true;
return this;
```

### <a name="channelClient_fork"></a>channelClient::fork(name, description, options)


```javascript
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

if(this._isLocal) return;



// ==> OK, ready to send data forward...

// What is the journal line we are using for the fork???
var forkCmd = {
    version : this._channelStatus.version,
    channelId : name,
    name : description,
    journalLine : 1
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

return _promise(
    function(results) {
        me._socket.send("channelCommand", {
                    channelId : me._channelId,
                    cmd : "fork",
                    data : forkCmd
            }).then( function(resp) {
                // information from the server.
                // build new channel object
                // return it as the promise...
                results(resp);
                
                
            })          
    });





```

### <a name="channelClient_get"></a>channelClient::get(id, name)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );
if(obj) {
    return obj.data[name];
}
```

### <a name="channelClient_getChannelData"></a>channelClient::getChannelData(t)


```javascript
return this._data;
```

### <a name="channelClient_getData"></a>channelClient::getData(t)


```javascript
return this._data.getData();

```

### <a name="channelClient_indexOf"></a>channelClient::indexOf(id)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );
if(obj) {
    var parent = this._fetch( obj.__p );
    if(parent && parent.data) {
        var index = parent.data.indexOf( obj );
        return index;
    }
}
return -1;
```

### channelClient::constructor( channelId, socket, options )

```javascript

if(options && options.localChannel) {
    
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
    mainData = me._transformObjToNs( options.localData, myNamespace );
    
    var chData = _channelData( me._id, mainData, [] );
    me._data = chData;
    me.resolve({ result : true, channelId : channelId });
    return;
    
} else {
    
    
}

if(!channelId || !socket) return;

this._channelId = channelId;
this._socket = socket;
this._options = options;
this._changeFrames = [];
this._pendingFrames = [];

var myNamespace = socket.getEnum();

this._ns = myNamespace;

this._id = channelId + socket.getId();
var me = this;

this._onFrameLoop( socket, myNamespace );
this._incoming(socket, myNamespace);

socket.on("connect", function() {
    
    
    // Authenticate...
    if(options.auth) {
        socket.send("auth", {   userId :    options.auth.username, 
                                password :  options.auth.password 
                            }).then( function(resp) {
            
            if(resp.userId) {
                
                me._userId = resp.userId;
                me._logged = true;
            } else {
                return false;
            }
            // ask to join the channel with this socket...
            return socket.send("requestChannel", {
                        channelId : channelId
                });
        })
        .then( function(resp) {
            // this channel client has been connected to the server ok
            if( resp && resp.channelId == channelId ) {
                
                me._connected = true;
                // The next step: to load the channel information for the
                // local objects to consume

                return socket.send("channelCommand", {
                            channelId : channelId,
                            cmd : "readBuildTree",
                            data : ""
                    });                  
                
            } else {
                return false;
            }
        })
        .then( function(respData) {

            
            if(respData) {
                
                var resp = respData.build;
                console.log("STATUS", JSON.stringify( respData.status) );
                
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
                mainData = me._transformObjToNs( mainData, myNamespace );

                var chData = _channelData( me._id, mainData, [] );
                var list = resp.pop();

                while(list) {
                    chData._journalPointer = 0;
                    chData._journal.length = 0; // <-- the journal length, last will be spared
                    list.forEach( function(c) {
                        chData.execCmd(me._transformCmdToNs(c, myNamespace));
                    });
                    list = resp.pop();
                }                
                
                // the state management
                me._clientState = {
                    data : chData,              // The channel data object
                    client : me,                // The channel client object (for Namespace conversion )
                    needsRefresh : false,       // true if client is out of sync and needs to reload
                    version : me._channelStatus.version,               
                    last_update : [0, chData.getJournalLine()],  // last succesfull server update
                    last_sent : []              // last range sent to the server
                
                };
                me._policy = _chPolicy();
                                
                me._data = chData;
                me._createTransaction();
                me.resolve({ result : true, channelId : channelId });
                
            } else {
                me.resolve({ result : false, text : "Authorization or connection failed" });
            }
        })
    }
});


```
        
### <a name="channelClient_length"></a>channelClient::length(id)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );
if(obj && obj.data) {
    return obj.data.length || 0;
}
return 0;
```

### <a name="channelClient_moveDown"></a>channelClient::moveDown(id)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );
if(obj) {
    var parent = this._fetch( obj.__p );
    if(parent && parent.data) {
        var index = parent.data.indexOf( obj );
        var newIndex = index-1;
        if(newIndex>=0 && index>=0 && index != newIndex && parent.data.length > newIndex) {
            this.addCommand([12, ns_id, newIndex, index, parent.__id]);
            // dataTest.execCmd( [12, "obj4", 0, 2, "array1"], true);
        }
        
    }
}

```

### <a name="channelClient_moveTo"></a>channelClient::moveTo(id, newIndex)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );
if(obj) {
    var parent = this._fetch( obj.__p );
    if(parent && parent.data) {
        var index = parent.data.indexOf( obj );
        if(index>=0 && index != newIndex && parent.data.length > newIndex) {
            this.addCommand([12, ns_id, newIndex, index, parent.__id]);
            // dataTest.execCmd( [12, "obj4", 0, 2, "array1"], true);
        }
        
    }
}

```

### <a name="channelClient_moveUp"></a>channelClient::moveUp(id)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );
if(obj) {
    var parent = this._fetch( obj.__p );
    if(parent && parent.data) {
        var index = parent.data.indexOf( obj );
        var newIndex = index+1;
        if(newIndex>=0 && index>=0 && index != newIndex && parent.data.length > newIndex) {
            this.addCommand([12, ns_id, newIndex, index, parent.__id]);
            // dataTest.execCmd( [12, "obj4", 0, 2, "array1"], true);
        }
        
    }
}

```

### <a name="channelClient_reconnect"></a>channelClient::reconnect(t)


```javascript
this._disconnected = false;
return this;
```

### <a name="channelClient_redo"></a>channelClient::redo(cnt)


```javascript
this._data.redo(cnt);
```

### <a name="channelClient_remove"></a>channelClient::remove(id)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );
if(obj) {
    var parent = this._fetch( obj.__p );
    if(parent && parent.data) {
        var index = parent.data.indexOf( obj );
        if(index>=0) {
            this.addCommand([8, index, ns_id, 0, parent.__id]);
            // this.addCommand([4, name, value, old_value, ns_id ]);
        }
        
    }
    // dataTest.execCmd( [8, 0, "obj1", 0, "array1"], true);
    // return obj.data[name];
}



```

### <a name="channelClient_set"></a>channelClient::set(id, name, value)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );
if(obj && !this.isObject(value)) {
    var old_value = obj.data[name];
    if( old_value != value) {
        this.addCommand([4, name, value, old_value, ns_id ]);
    }
}

```

### <a name="channelClient_setObject"></a>channelClient::setObject(id, name, propObj)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );

if(obj && this.isObject(propObj) && propObj.__id) {
    var old_value = obj.data[name];
    
    if( !old_value ) {
        // insert object only if there is no old value
        this.addCommand([5, name, propObj.__id, null, ns_id ]);
    }
}

```

### <a name="channelClient_undo"></a>channelClient::undo(cnt)


```javascript
this._data.undo(cnt);
```

### <a name="channelClient_unset"></a>channelClient::unset(id, name)


```javascript
var ns_id = this._idToNs( id, this._ns ); // is this too slow?
var obj = this._data._find( ns_id );
if(obj) {
    var old_obj = obj.data[name];
    if( old_obj && old_obj.__id ) {
        this.addCommand([10, name, old_obj.__id, null, ns_id ]);
    }
}

```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript
return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return t instanceof Array;
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    
    
## trait commad_trait

The class has following internal singleton variables:
        
* _cmdNsMap
        
        
### <a name="commad_trait__getNsFromUrl"></a>commad_trait::_getNsFromUrl(url)


```javascript
if(_nsShortcuts[url]) {
    return _nsShortcuts[url];
}
_nsReverse[_nsIndex] = url;
_nsShortcuts[url] = _nsIndex++;

return _nsShortcuts[url];
```

### <a name="commad_trait__getNsShorthand"></a>commad_trait::_getNsShorthand(nsName)


```javascript

if(_nsShortcuts[nsName]) {
    return _nsShortcuts[nsName];
}
_nsReverse[_nsIndex] = nsName;
_nsShortcuts[nsName] = _nsIndex++;

return _nsShortcuts[nsName];
```

### <a name="commad_trait__getReflections"></a>commad_trait::_getReflections(t)


```javascript
return _localReflections;
```

### <a name="commad_trait__getReflectionsFor"></a>commad_trait::_getReflectionsFor(objId)


```javascript

if(_localReflections) {
    var list = _localReflections[objId];
    if(list) return list;
}
return [];
```

### <a name="commad_trait__getReverseNs"></a>commad_trait::_getReverseNs(index)


```javascript

return _nsReverse[index];
```

### <a name="commad_trait__idFromNs"></a>commad_trait::_idFromNs(id)


```javascript
if(id) {
    
    var len = id.length;
    if(id[len-1]=="#") {    
        id = id.split("@").shift();
    } 
}
return id;
```

### <a name="commad_trait__idToNs"></a>commad_trait::_idToNs(id, ns)


```javascript

if(id) {
    var len = id.length;
    // longString
    
    if(id[len-1]=="#") {
        var ind = id.indexOf("@");
        var oldNs = id.substring(ind+1, len-1);
        if(oldNs != ns ) {
            id = id.substring(0,ind) +"@"+ns+"#";
        }
    } else {
        id = id+"@"+ns+"#";
    }
}
return id;
```

### <a name="commad_trait__nsFromId"></a>commad_trait::_nsFromId(id)


```javascript
var ns;
if(id) {
    id = id+"";
    var len = id.length;
    if(id[len-1]=="#") {    
        ns = id.split("@").pop();
        ns = ns.split("#").shift();
    } 
}
return ns;
```

### <a name="commad_trait__transformCmdFromNs"></a>commad_trait::_transformCmdFromNs(cmd, ns)


```javascript

if(!ns) ns = this._ns;

var map = _cmdNsMap,
    nextCmd = cmd.slice(),
    swap = map[cmd[0]],
    me = this;
if(swap) {
    swap.forEach( function(index) {
        nextCmd[index] = me._idFromNs( nextCmd[index], ns );
    });
}
return nextCmd;
```

### <a name="commad_trait__transformCmdToNs"></a>commad_trait::_transformCmdToNs(cmd, ns)


```javascript

if(!ns) ns = this._ns;

var map = _cmdNsMap,
    nextCmd = cmd.slice(),
    swap = map[cmd[0]],
    me = this;
if(swap) {
    for(var i=0; i< swap.length;i++) {
        var index = swap[i];
        nextCmd[index] = this._idToNs( nextCmd[index], ns );
    }
} 
return nextCmd;

```

### <a name="commad_trait__transformObjFromNs"></a>commad_trait::_transformObjFromNs(obj, ns)


```javascript
if(!ns) ns = this._ns;

if(obj && obj.__id) {
    if(obj.__p) obj.__p = this._idFromNs( obj.__p, ns );
    obj.__id = this._idFromNs( obj.__id, ns );
    for(var n in obj.data) {
        if(obj.data.hasOwnProperty(n)) {
            if(this.isObject(obj.data[n])) this._transformObjFromNs( obj.data[n], ns );
        }
    }
}
return obj;

```

### <a name="commad_trait__transformObjToNs"></a>commad_trait::_transformObjToNs(obj, ns)


```javascript
if(!ns) ns = this._ns;
if(obj && obj.__id) {
    
    // the old way, currently the socket ID may be the same, but not used right now
    /*
    var nsNext;
    if(obj.__radioURL) {
        var nsNext = this._getNsShorthand( obj.__radioURL );
    }
    ns = nsNext || ns;
    */
    
    // obj = me._transformObjToNs( obj, ns );
    obj.__id = this._idToNs( obj.__id, ns );
    if(obj.__p) {
        obj.__p = this._idToNs( obj.__p, ns );
    }
    for(var n in obj.data) {
        if(obj.data.hasOwnProperty(n)) {
            if(this.isObject(obj.data[n])) this._transformObjToNs( obj.data[n], ns );
        }
    }
}

return obj;


```

### <a name="commad_trait__transformToNsBeforeInsert"></a>commad_trait::_transformToNsBeforeInsert(obj, parentObj, parentObj2)


```javascript

// OK, so...

var cmdList = obj.__ctxCmdList;
var ns = this._nsFromId( parentObj.__id );

console.log(" _transformToNsBeforeInsert ");

var me = this;
if(ns) {
    // console.log("Using namespace "+ns);
    if(cmdList) {
        cmdList.forEach( function(c) {
            c.cmd = me._transformCmdToNs( c.cmd, ns );
        });
    }
    obj = me._transformObjToNs( obj, ns );
    obj.__ctxCmdList = cmdList;
    this._addToCache( obj );
    return obj;
}
// this._addToCache( obj );
return obj;



```

### commad_trait::constructor( t )

```javascript
if(!_cmdNsMap) {
    _cmdNsMap = {
        1 : [1],
        2 : [1],
        4 : [4],
        5  : [2,4],
        7  : [2,4],
        8  : [2,4],
        10 : [2,4],
        12 : [1,4],
        13 : [4],
        16 : [3,4]
    };    
}
```
        

    
    


   
      
    
      
    



      
    




