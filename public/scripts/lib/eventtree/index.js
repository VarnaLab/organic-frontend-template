'use strict';

define(['./eventtree', './eventtree-organic', './eventtree-children', './eld'], function (et, organicEt, childrenEt, eld) {
  return {
    'Type_event': et.typedef,
    'Type_conditions': et.typeConditions,
    'organic': organicEt,
    'children': childrenEt,
    'eld': eld
  };
});
