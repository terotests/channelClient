
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

### channelClient::constructor( channelId, channelData )

```javascript

this._channelId = channelId;
this._channel = channelData;

this._done = {};

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


    
    


   
      
    



      
    




