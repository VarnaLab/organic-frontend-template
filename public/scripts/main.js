require(["lib/Cell", "lib/DNA", "lib/Nucleus", "lib/Plasma"], 
  function(Cell, DNA, Nucleus, Plasma){
    var cell = new Cell(new DNA({
      ui: {
        "Main": {
          "source": "ui/Main"
        }
      }
    }), {
      Nucleus: Nucleus,
      Plasma: Plasma
    })
    cell.plasma.emit({type: "build", branch: "ui"});
  })