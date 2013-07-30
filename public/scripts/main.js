'use strict';

require(['lib/Cell', 'lib/DNA', 'lib/Nucleus', 'lib/Plasma', 'lib/organic-plasma-multimatch/index'], 
  function(Cell, DNA, Nucleus, Plasma, multimatch){
    var cell = new Cell(new DNA({
      ui: {
        'Main': {
          'source': 'ui/Main'
        }
      }
    }), {
      Nucleus: Nucleus,
      Plasma: Plasma
    });
    cell.plasma = cell.plasma.use(multimatch);
    cell.plasma.emit({type: 'build', branch: 'ui'});
  });