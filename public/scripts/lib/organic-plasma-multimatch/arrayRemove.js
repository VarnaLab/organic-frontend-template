'use strict';
/**
 * Removes an item from an array
 */
define([], function () {
  return function arrayRemove (array, item) {
    array.splice(array.indexOf(item), 1);
  };
});
