/*global document: false*/
define(['lib/eventtree/index', 'lib/constraints', 'ui/HeadView'], function  (EventTree, createTypeCheck, HeadView) {
  'use strict';
  
  return function UIHead (eventbus, config) {
    if (typeof this === 'undefined')
      return new UIHead(eventbus, config);

    var eventtree = EventTree.organic(eventbus, config.name);
    var tc = createTypeCheck();
    var view = null;

    EventTree.eld(eventtree, {
      ':create': function (event) {
        event.callback(null, null);
      },
      ':render': function (event) {
        var self = this;
        HeadView.create(function (e, v) {
          view = v;
          view.on(':click',function () {
            console.log('view event started');
            self.emit('','action', { state:'success' }, function () {});
          });
          event.callback(e, v.root)
        });
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