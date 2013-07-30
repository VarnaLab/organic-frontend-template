/*global document:false*/
define(['lib/eventtree/index', 'lib/organic-plasma-multimatch/index', 'ui/root'], function(Eventtree, multimatch, UIRoot){
  'use strict';
  
  return function(plasma, config){
    plasma = plasma.use(multimatch);
    console.log('Organel created', plasma, config);    

    var root = new UIRoot(plasma, {
      name: 'root'
    });
    
    root.emit('create', null, function (data) {
      root.emit('render', null, function (data) {
        document.body.appendChild(data);
        root.emit('updateView', { text: 'Hello, World!' }, function (datas) {
          
          console.log('shown');
        });
      });
    });

  };
});