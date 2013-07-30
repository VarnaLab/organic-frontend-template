/* global document: false */
define(['lib/eventtree/index', 'lib/constraints', 'ui/BodyView'], function  (EventTree, createTypeCheck, BodyView) {
  'use strict';
  
  return function UIBody (eventbus, config) {
    if (typeof this === 'undefined')
      return new UIBody(eventbus, config);

    var eventtree = EventTree.organic(eventbus, config.name);
    var tc = createTypeCheck();
    var alternatives = ['green', 'red'];
    var alterIndex = 0;
    var view = null;

    EventTree.eld(eventtree, {
      ':create': function (event) {
        event.callback(null, null);
      },
      ':render': function (event) {
        console.log('render');
        BodyView.create(function (e, v) {
          view = v;
          event.callback(e, v.root);
        });
      },
      ':updateView': function (event) {
        view.set(alternatives[alterIndex], event.callback);
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