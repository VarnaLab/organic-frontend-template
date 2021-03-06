/* global document: false */
define(['lib/eventtree/index', 'lib/constraints', 'ui/header', 'ui/body', 'ui/RootView'], function  (EventTree, createTypeCheck, Header, Body, RootView) {
  'use strict';
  
  return function UIRoot (eventbus, config) {
    if (typeof this === 'undefined')
      return new UIRoot(eventbus, config);

    var eventtree = EventTree.organic(eventbus, config.name);
    var tc = createTypeCheck();
    var view = null

    EventTree.eld(eventtree, {
      ':create': function (event) {
        var self = this;
        var header = new Header(eventbus, { name: config.name + '.header' });
        self.emit('header','create', event.data, function () {
          var body = new Body(eventbus, {name: config.name + '.body'});
          self.emit('body','create', event.data, event.callback);
        });
      },
      ':render': function (event) {
        var self = this;
        self.emit('header','render', event.data, function (err1, headerDom) {
          self.emit('body', 'render', event.data, function (err2, bodyDom) {
            RootView.create(headerDom, bodyDom, function (e, v) {
              view = v;
              event.callback(e, v.root);
            });
          });
        });
      },
      ':updateView': function (event) {
        var self = this;
        self.emit('header','updateView', null, function () {
          self.emit('body', 'updateView', null, function () {
            view.set(event.data, event.callback);
          });
        });
      },
      ':updateModel': function (event) {
        //TODO: delegate to children?
        event.callback(null, {fuck: 'off'});
      },
      ':unrender': function (event) {
        //TODO: delegate to children?
        event.callback(null, null);
      },
      ':destroy': function (event) {
        //TODO: delegate to children?
        event.callback(null, null);
      },
      'header:action': function (event) {
        console.log('event captured');
        var self = this;
        self.emit('body', 'toggleColor', null, function() {
          self.emit('body', 'updateView', null, function () {
            event.callback();
          });
        });
      }
    });

    this.emit = function (event, data, callback) {
      tc.args('string', 'object', 'function', arguments);
      eventtree.emit('', event, data, callback);
    };


  };
});