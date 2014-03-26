define([
    'jquery',
    'underscore',
    'backbone',
    'views/default',
    'hbs!templates/app'
  ], function($,_,Backbone,DefaultView,appTemplate) {
  "use strict";

  var AppView = Backbone.View.extend({
    el: '#main',
    className: "",
    template: appTemplate,

    initialize: function(){
      var self = this;
      
      self.render();
    },

    render: function(house){
      var self = this;
      $('#main').html(this.template());

      return this;
    }
  });

  return AppView;
});