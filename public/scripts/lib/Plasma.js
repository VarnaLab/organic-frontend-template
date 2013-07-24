define(["lib/dict", "lib/uuid"], function(dict, uuid){

  var exports = function Plasma(){
    this._listeners = dict({});
    
    var _states = Object.create(null);
    
    //this function needs access to _states
    this.decorate = function(decorator) {
      var id = decorator.id = decorator.id ||uuid.v1(); //or use name?
      _states[id]= _states[id] || {};
      decorator.call(this, _states[id]);
      return this;
    }
    
  }

  exports.prototype.getChemicalType = function (chemical) { //:String
    if (typeof chemical === "string") return chemical;
    return chemical.type || chemical.constructor.toString();
  }

  exports.prototype.chemicalPatternToString = function (chemicalPattern) { //:String
    if (typeof chemicalPattern === 'string')
      return chemicalPattern;
    if (typeof chemicalPattern === 'function')
      return chemicalPattern.toString();
    
    throw "String or Function expected: " + typeof chemicalPattern + " toString: " + chemicalPattern;
  }

  exports.prototype.emit = function(chemical, sender, callback){

    if(typeof sender == "function") {
      callback = sender;
      sender = undefined;
    }
    
    var type = this.getChemicalType(chemical);
    var ls = this._listeners.get(type) || [];
    for(var i = 0; i < ls.length; i++) {
      var listener = ls[i];
      
      // prevent emitting to self
      if(sender && sender == listener.context)
        continue;

      // self remove from listeners if "once" has been invoked
      if(listener.once) {
        ls.splice(i, 1);
        i -= 1;
      }
    
      var chemicalRecieved;
      if(listener.handle.length == 3)
        chemicalRecieved = listener.handle.call(listener.context, chemical, sender, callback);
      else
        chemicalRecieved = listener.handle.call(listener.context, chemical, callback);

      // in case plasma organelles received the chemical, further iterations are not allowed.
      if(chemicalRecieved !== false)
        return;
    }
  }

  var _addListener = function (plasma, lsnr) {
    var cp = lsnr.chemicalPattern;
    var ls = plasma._listeners;
    if (! ls.has(cp))
      ls.set(cp, []);
    ls.get(cp).push(lsnr);
  }

  exports.prototype.once = function(chemicalPattern, handler, context) {
    var cp = this.chemicalPatternToString(chemicalPattern);
    _addListener(this, {chemicalPattern: cp, handle: handler, context: context, once: true});
  }

  exports.prototype.on = function(chemicalPattern, handler, context){
    var cp = this.chemicalPatternToString(chemicalPattern);
    _addListener(this, {chemicalPattern: cp, handle: handler, context: context});
  }

  exports.prototype.off = function(chemicalPattern, handler){
    var cp = this.chemicalPatternToString(chemicalPattern);
    var ls = this._listeners.get(cp);
    for(var i = 0 ;i<ls.length; i++) {
      var listener = ls[i];
      if(listener.chemicalPattern == cp && listener.handle == handler)
        ls.splice(i, 1);
    }  
  }

  exports.prototype.use = function (decorator) {
    return this.decorate.call(Object.create(this), decorator);
  }

  return exports;
})