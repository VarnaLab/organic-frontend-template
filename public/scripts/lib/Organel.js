define(["lib/super"],function(inherits){

  var exports = function Organel(plasma, config, parent){
    this.plasma = plasma;
    this.config = config;
    this.parent = parent;
  }

  exports.prototype.emit = function(chemical, callback){
    this.plasma.emit(chemical, this, callback);
  }

  exports.prototype.on = function(checmicalPattern, handler){
    this.plasma.on(checmicalPattern, handler, this);
  }

  exports.prototype.once = function(checmicalPattern, handler){
    this.plasma.once(checmicalPattern, handler, this);
  }

  exports.prototype.off = function(checmicalPattern, handler){
    this.plasma.off(checmicalPattern, handler, this);
  }

  exports.extend = function(constructor, properties){
    inherits(constructor, exports);
    for(var key in properties) 
      constructor.prototype[key] = properties[key];
    return constructor;
  }

  return exports;
})
