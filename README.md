
# channelClient

The client module for the channels

```javascript
// TODO: add code, examples etc.
```
















   

 


   
#### Class channelClientModule





   
    
    


   
      
            
#### Class channelClient


- [_classFactory](README.md#channelClient__classFactory)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    



      
    





   
# Class channelClientModule


The class has following internal singleton variables:
        
        
### channelClientModule::constructor( t )

```javascript

```
        


   
    
    


   
      
            
# Class channelClient


The class has following internal singleton variables:
        
* _instanceCache
        
        
### <a name="channelClient__classFactory"></a>channelClient::_classFactory(id)


```javascript

if(!_instanceCache) _instanceCache = {};

if(_instanceCache[id]) return _instanceCache[id];

_instanceCache[id] = this;
```

### channelClient::constructor( channelId, socket, options )

```javascript

this._channelId = channelId;
this._socket = socket;
this._options = options;

var me = this;

socket.on("connect", function() {
    
    // Authenticate...
    if(options.auth) {
        socket.send("auth", {   userId :    options.auth.username, 
                                password :  options.auth.password 
                            }).then( function(resp) {
            
            if(resp.userId) {
                me._userId = resp.userId;
                me._logged = true;
            } 
            // ask to join the channel with this socket...
            return socket.send("requestChannel", {
                        channelId : channelId
                });
        })
        .then( function(resp) {
            // this channel client has been connected to the server ok
            if( resp.channelId == channelId ) {
                me._connected = true;
                // The next step: to load the channel information for the
                // local objects to consume
            }
        });
    }
});


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


    
    


   
      
    



      
    




