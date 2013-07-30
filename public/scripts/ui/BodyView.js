// V. View API (require AMD, ACM, M, ELD)
//   f.create(moduleLoader, readyFn); -> v
//   v.root                                                      // get the root element of that view.
//   v.set(data/* model, i18n, children, etc */, callback);      // generate or set into view properties from model, internationalize some of them, embed children's structure, etc
//   v.get(data/* query, model, de_i18n, etc */, callback);      // write its state based on query into model, maybe covert from localized to standart using de_i18n, etc
//   v.on(X)
//     X: "eventType", handlerFn/* (data) */
//     X: [EventListenerDefinition]
//   v.destroy();

define(['lib/jquery-2.0.3'], function ($) {
  'use strict';
  function View() {
    if (typeof this === 'undefined')
      return new View();
    this.root = document.createElement('div');

    this.root.innerText = 'targetArea';
    this.root.style.width = '300px';
    this.root.style.height = '100px;';
  }

  View.prototype.set = function(data, callback) {
    this.root.style.backgroundColor = data;
    callback(null, data);
  };

  View.prototype.get = function(data, callback) {
    callback(null, data);
  };

  View.prototype.on = function (eventType, handlerFn) {
    var e = eventType.split(':');
    var target = (e[0])? $(e[0], this.root): $(this.root);
    target.on(e[1], handlerFn);
  };
  View.prototype.destroy = function () {
    //TODO: free memory
    this.root = null;
  };


  return {
    create: function (callback) {
      var result = new View();
      callback(null, result);
    }
  };
});