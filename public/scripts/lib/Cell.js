define(["lib/xtend", "lib/Plasma", "lib/Nucleus"], function(xtend, Plasma, Nucleus){
  
  //default core organelles
  var dcore = {};
  dcore.Plasma = Plasma;
  dcore.Nucleus = Nucleus;

  var Cell = function(dna, core){
    core = xtend({}, dcore, core || {});

    if(!this.plasma)
      this.plasma = new core.Plasma();

    var nucleus = new core.Nucleus(this.plasma, dna);
    this.plasma.on("build", function(c,callback){
      nucleus.build(c,callback)
    })
  }

  Cell.prototype.emit = function(c, callback) {
    this.plasma.emit(c, callback);
  }

  Cell.prototype.on = function(pattern, callback) {
    this.plasma.on(pattern, callback);
  }

  return Cell;
});