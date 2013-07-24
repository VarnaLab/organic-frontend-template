define(['require', 'lib/DNA'], function(require, DNA){
  
  var exports = function Nucleus(plasma, dna){
    this.plasma = plasma;
    this.dna = dna instanceof DNA?dna:new DNA(dna);
  }

  exports.prototype.buildOne = function(c, callback){
    if(typeof c.source == "function") {
      var instance = new c.source(this.plasma, c, this);
      if(callback) callback(instance);
      return instance
    }

    var objectConfig = c;
    if(!objectConfig.source)
      throw new Error("can not create object without source but with "+c);

    var source = objectConfig.source;
    var self = this;

    require([source], function(OrganelClass){
      var instance = new OrganelClass(self.plasma, objectConfig, self);
      if(callback) callback(instance);
    });
  }

  exports.prototype.build = function(c, callback) {
    if(c.source) {
      return this.buildOne(c, callback)
    }

    if(c.branch)
      c = this.dna.selectBranch(c.branch)
    if(typeof c == "string")
      c = this.dna.selectBranch(c)

    var results = [];
    var total = Object.getOwnPropertyNames(c).length // TODO: IE9-

    for(var name in c) {
      this.buildOne(c[name], function(instance) {
        results.push(instance);
        total -= 1;
        if(total == 0 && callback) callback(results);
      });
    }
  }  

  return exports;
})
