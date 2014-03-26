// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
  paths: {
    "vendor": "./vendor",
    "underscore": "./vendor/underscore",
    "jquery": "./vendor/jquery",
    "backbone": "./vendor/backbone",
    "hbs": './vendor/require-handlebars-plugin/hbs',
    "respond": "./vendor/respond",
    "bootstrap": "./vendor/bootstrap"
  },
  shim: {
    "hbs": { // optional
        helpers: true,            // default: true
        i18n: false,              // default: false
        templateExtension: 'hbs', // default: 'hbs'
        partialsUrl: ''           // default: ''
    },
    "respond": {},
    "bootstrap": {
      deps: ["jquery"]
    }
  },
  urlArgs: "bust=" + (new Date()).getTime() //Cache buster for development
});