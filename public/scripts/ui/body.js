/* global document: false */
define(['lib/eventtree/index', 'lib/constraints'], function  (EventTree, createTypeCheck) {
  'use strict';
  
  return function UIBody (eventbus, config) {
    if (typeof this === 'undefined')
      return new UIBody(eventbus, config);

    var etorg = EventTree.organic(eventbus, config.name);
    var eventtree = EventTree.children(etorg, function () { return []; });
    var tc = createTypeCheck();
    var alternatives = ['green', 'red'];
    var alterIndex = 0;
    var view = document.createElement('div');

    EventTree.eld(eventtree, {
      ':create': function (event) {
        event.callback(null, null);
      },
      ':render': function (event) {
        view.innerText = 'targetArea';
        view.style.width = '300px';
        view.style.height = '100px;';
        event.callback(null, view);
      },
      ':updateView': function (event) {
        view.style.backgroundColor = alternatives[alterIndex];
        event.callback();
      },
      ':updateModel': function (event) {
        event.callback(null, null);
      },
      ':unrender': function (event) {
        event.callback(null, null);
      },
      ':destroy': function (event) {
        event.callback(null, null);
      },
      ':toggleColor': function (event) {
        alterIndex = (alterIndex + 1) % alternatives.length;
        event.callback(null, null);
      }
    });

  };
});