define([
    'jquery',
    'underscore',
    'backbone'
  ], function($,_,Backbone) {
  "use strict";

  var DefaultModel = Backbone.Model.extend({
    defaults: function(){
      return {
        "name":     "Model Name"
      };
    }
  });

  var DefaultCollection = Backbone.Collection.extend({
    model: DefaultModel,
    url: 'http://default.com/models',
  });

  return {
    Model: DefaultModel,
    Collection: DefaultCollection
  };
});