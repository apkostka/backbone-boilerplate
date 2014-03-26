define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!templates/default'
  ], function($,_,Backbone,defaultTemplate) {
  "use strict";

  var DefaultView = Backbone.View.extend({
    tagName: "div",
    className: "default",
    template: defaultTemplate,

    initialize: function(){
      this.render();
    },

    render: function(){
      $(this.el).html(this.template(this.model));
      return this;
    }
  });

  return DefaultView;
});