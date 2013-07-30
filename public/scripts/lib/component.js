define(['lib/eventtree/index', 'lib/yaclass','lib/constraints'], function (EventTree, YAC, TC) {
  'use strict';
  var tc = TC();
  var yaclass = YAC();

  tc.define('config', {
    childFactories:'object| {}',
    name: 'string',
    fullname: 'string',
    events: {},
    View: 'function'
  });

  return yaclass.defclass({
    name:'Component',
    private: {
      rendered: false,
      eventtree: null,
      children:[]
    },
    public: function (p) {
      return {
        //same as organel
        constructor: function (eventbus, config) {
          tc.extend('config', config, true);
          p(this).childFactories = config.childFactories || {};
          p(this).events = config.events;

          var et = EventTree.organic(eventbus, config.name);
          p(this).eventtree = EventTree.children(et, this.getChildNames.bind(this));
        },
        getChildNames: function () {
          //copy the list for safety
          return p(this).children.slice(0);
        },
        //Override
        createView: function (data) {
          return new p(this).View(data);
        },
        //Override
        createChildren: function (callback) {
          callback();
        },
        eld: function (events) {
          EventTree.eld(this, events || p(this).events);
        }
      };
    }
  });
});