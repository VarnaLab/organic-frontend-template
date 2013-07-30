/*global document: false*/
define(['lib/eventtree/index', 'lib/constraints'], function  (EventTree, createTypeCheck) {
  'use strict';
  
  return function UIHead (eventbus, config) {
    if (typeof this === 'undefined')
      return new UIHead(eventbus, config);

    var etorg = EventTree.organic(eventbus, config.name);
    var eventtree = EventTree.children(etorg, function () { return []; });
    var tc = createTypeCheck();
    var view = document.createElement('div');

    EventTree.eld(eventtree, {
      ':create': function (event) {
        event.callback(null, null);
      },
      ':render': function (event) {
        var self = this;
        view.style.width = '300px';
        view.style.height = '100px;';
        view.style.backgroundColor = '#BAE3FA';
        view.innerHTML = 'start event';
        view.onclick = function () {
          console.log('view event started');
          self.emit('','action', { state:'success' }, function () {});
        };
        event.callback(null, view);
      },
      ':updateView': function (event) {
        event.callback();
      },
      ':updateModel': function (event) {
        event.callback(null, {fuck: 'off'});
      },
      ':unrender': function (event) {
        event.callback(null, null);
      },
      ':destroy': function (event) {
        event.callback(null, null);
      }
    });

    this.emit = function (event, data, callback) {
      tc.args('string', 'object', 'function', arguments);
      eventtree.emit('', event, data, callback);
    };


  };
});