define(['lib/merge-recursive'], function(merge) {
  
  var exports = function DNA(data){
    if(data)
      for(var key in data)
        this[key] = data[key];
  }

  exports.prototype.createBranch = function(namespace, value) {

    // merge value if the namespace is the dna itself (namespace equal to "")
    if(namespace == "" && value) {
      if(typeof value == "object") {
        for(var key in value)
          this[key] = value[key];
      } else
        throw new Error("can not set primitive value to dna structure (error while trying this = value)");
      return;
    }

    var b = this;
    var currentB = "";
    var lastP = "", lastB = b;

    // iterate namaspace and create holder objects if they do not exist
    namespace.split(".").forEach(function(p){
      if(b[p] === undefined)
        b[p] = {};
      if(typeof b[p] != "object")
        throw new Error("can not create branch path at value "+p+" using "+currentB);
      currentB += "."+p;
      lastP = p;
      lastB = b;
      b = b[p];
    });

    // assign value to last branch
    if(value !== undefined)
      lastB[lastP] = value;
  }

  exports.prototype.selectBranch = function(namespace) {
    if(namespace == "")
      return this;
    if(namespace.indexOf(".") === -1)
      return this[namespace];
    var b = this;
    var currentB = "";
    namespace.split(".").forEach(function(p){
      if(b[p] !== undefined)
        b = b[p];
      else
        throw new Error("can not walk to branch '"+namespace+"' found gap at "+currentB);
      currentB += "."+p;
    });
    return b;
  }

  exports.prototype.mergeBranchInRoot = function(namespace) {
    var branch = this.selectBranch(namespace);
    merge.recursive(this, branch);
  }

  return exports;
});