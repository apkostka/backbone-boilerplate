// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/app',
  'bootstrap'
], function($, _, Backbone, AppView){
  var initialize = function(){
    var app = new AppView();
  }

  return {
    initialize: initialize
  };
});