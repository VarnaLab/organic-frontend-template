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
  function RootView(head, body) {
    if (typeof this === 'undefined')
      return new RootView();
    this.root = document.createElement('div');

    this.text = document.createElement('div');
    this.root.appendChild(this.text);

    this.root.appendChild(head);
    this.root.appendChild(body);
  }

  RootView.prototype.set = function(data, callback) {
    this.text.innerText = data.text;
    callback(null, data);
  };

  RootView.prototype.get = function(data, callback) {
    callback(null, data);
  };

  RootView.prototype.on = function (eventType, handlerFn) {
    var e = eventType.split(':');
    $(e[0], this.root).on(e[1], handlerFn);
  };
  RootView.prototype.destroy = function () {
    //TODO: free memory
    this.root = null;
  };


  return {
    create: function (requirejs, callback) {
      var result = new RootView();
      callback(result);
    }
  };
});