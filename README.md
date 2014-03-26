## Backbone Boilerplate
The Backbone Boilerplate app we use for projects at Steady.

### Installation
Run `npm install` from the root directory to install dependencies.

#### Dependencies
[node](http://nodejs.org)  
[Grunt](http://gruntjs.com): `npm install -g grunt-cli`  
[SASS](http://sass-lang.com/): `gem install sass`  
[Compass](http://compass-style.org/): `gem install compass`  
[Compass Normalize](https://github.com/ksmandersen/compass-normalize): `gem install compass-normalize`  
[Compass rgbapng](https://github.com/aaronrussell/compass-rgbapng): `gem install compass-rgbapng` 

### Structure and Build Process
===
#### Development
This boilerplate uses `requirejs` to include modular dependencies. Javascript modules are included in the `app/js` directory. Vendor libraries should be placed in `app/js/vendor` and included in the configuration file `app/js/config.js`. Vendor libraries that are not AMD-compatible should also have an entry in the `shim` section in `app/js/config.js`.

Run `grunt` to compile assets for development and start the `grunt watch` process. The project also uses `browser-sync` for live reload in the browser.

ERROR WARNING: In development, you will see a console error that says:
```javascript
Uncaught Error: Mismatched anonymous define() module: function () { return io; }`.
```
This is due to the fact that `browser-sync` uses socket.io to livereload the page, and `reuirejs` throws an error anytime a script is loaded outside of a `requirejs` module that uses the `define()` method. This hasn't seemed to cause any issues so far, and shouldn't throw the error outside of your dev environment since `browser-sync` won't be enabled.

#### Production
`grunt-bump-build-git` is used to compile production assets, bump the version number in `package.json`, and commit with version tags. Full documentation for this package [can be found here](https://github.com/blueimp/grunt-bump-build-git#usage-examples). Here are some example commands:

Build the project and bump the major version (major.minor.patch):
```sh
grunt build:major
```
Build the project and bump the minor version (major.minor.patch):
```sh
grunt build:minor
```
Build the project and bump the patch version (major.minor.patch):
```sh
grunt build:patch
```
Build the project and run `git add`, `git commit` and `git tag` automatically:
```sh
grunt build:patch:"Fixed #42"
```
Build and commit a test version without creating a tag:
```sh
grunt build::"Test build"
```

You can run `grunt compile` to build without bumping the file version or committing.

These tasks will be run before the bump/commit:
 * `compass:prod` compiles and compresses SASS files into `dist/screen.css`.
 * `requirejs` uglifies javascript modules into `dist/source.min.js`.
 * `processhtml` replaces dev environment assets with those in `dist` and removes the `browser-sync` script tags for production.