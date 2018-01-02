#!/usr/bin/env node
'use strict';var _Promise = require('babel-runtime/core-js/promise')['default'];var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];exports.__esModule = true;exports.resolveModuleOrGlob = resolveModuleOrGlob;exports.expandGlobList = expandGlobList;exports.addHandlebarsHelpers = addHandlebarsHelpers;exports.addHandlebarsPartials = addHandlebarsPartials;exports.addObjectsToData = addObjectsToData;exports.renderHandlebarsTemplate = renderHandlebarsTemplate;var _path = require(
'path');var _handlebars = require(
'handlebars');var _handlebars2 = _interopRequireDefault(_handlebars);var _minimist = require(
'minimist');var _minimist2 = _interopRequireDefault(_minimist);var _globPromise = require(
'glob-promise');var _globPromise2 = _interopRequireDefault(_globPromise);var _packageJson = require(
'../package.json');var _packageJson2 = _interopRequireDefault(_packageJson);var _resolve = require(
'resolve');var _resolve2 = _interopRequireDefault(_resolve);var _fsPromise = require(
'fs-promise');var _lodashMerge = require(
'lodash.merge');var _lodashMerge2 = _interopRequireDefault(_lodashMerge);
var debug = require('debug')('hbs');
function resolve(file, options) {
  return new _Promise(function (resolvePromise, reject) {return _resolve2['default'](file, options, function (error, path) {
      if (error) {
        reject(error);} else 
      {
        resolvePromise(path);}});});}



function resolveModuleOrGlob(path) {var cwd = arguments.length <= 1 || arguments[1] === undefined ? process.cwd() : arguments[1];return _regeneratorRuntime.async(function resolveModuleOrGlob$(context$1$0) {while (1) switch (context$1$0.prev = context$1$0.next) {case 0:context$1$0.prev = 0;

        debug('Trying to require ' + path + ' as a node_module');context$1$0.next = 4;return _regeneratorRuntime.awrap(
        resolve(path, { basedir: cwd }));case 4:context$1$0.t0 = context$1$0.sent;return context$1$0.abrupt('return', [context$1$0.t0]);case 8:context$1$0.prev = 8;context$1$0.t1 = context$1$0['catch'](0);

        debug(path + ' is glob or actual file, expanding...');context$1$0.next = 13;return _regeneratorRuntime.awrap(
        _globPromise2['default'](path, { cwd: cwd }));case 13:return context$1$0.abrupt('return', context$1$0.sent);case 14:case 'end':return context$1$0.stop();}}, null, this, [[0, 8]]);}



function expandGlobList(globs) {return _regeneratorRuntime.async(function expandGlobList$(context$1$0) {while (1) switch (context$1$0.prev = context$1$0.next) {case 0:
        if (typeof globs === 'string') {
          globs = [globs];}if (!(

        Array.isArray(globs) === false)) {context$1$0.next = 3;break;}throw (
          new Error('expandGlobList expects Array or String, given ' + typeof globs));case 3:context$1$0.next = 5;return _regeneratorRuntime.awrap(

        _Promise.all(
        globs.map(function (path) {return resolveModuleOrGlob(path);})));case 5:context$1$0.t0 = 
        function (total, current) {return total.concat(current);};context$1$0.t1 = [];return context$1$0.abrupt('return', context$1$0.sent.reduce(context$1$0.t0, context$1$0.t1));case 8:case 'end':return context$1$0.stop();}}, null, this);}


function addHandlebarsHelpers(files) {
  files.forEach(function (file) {
    debug('Requiring ' + file);
    var handlebarsHelper = require(_path.resolve(file)); // eslint-disable-line global-require
    if (handlebarsHelper && typeof handlebarsHelper.register === 'function') {
      debug(file + ' has a register function, registering with handlebars');
      handlebarsHelper.register(_handlebars2['default']);} else 
    {
      console.error('WARNING: ' + file + ' does not export a \'register\' function, cannot import');}});}




function addHandlebarsPartials(files) {return _regeneratorRuntime.async(function addHandlebarsPartials$(context$1$0) {while (1) switch (context$1$0.prev = context$1$0.next) {case 0:context$1$0.next = 2;return _regeneratorRuntime.awrap(
        _Promise.all(files.map(function registerPartial(file) {return _regeneratorRuntime.async(function registerPartial$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:
                debug('Registering partial ' + file);context$2$0.t0 = _handlebars2['default'];context$2$0.t1 = 
                _path.basename(file, _path.extname(file));context$2$0.next = 5;return _regeneratorRuntime.awrap(_fsPromise.readFile(file, 'utf8'));case 5:context$2$0.t2 = context$2$0.sent;context$2$0.t0.registerPartial.call(context$2$0.t0, context$2$0.t1, context$2$0.t2);case 7:case 'end':return context$2$0.stop();}}, null, this);})));case 2:case 'end':return context$1$0.stop();}}, null, this);}



function addObjectsToData(objects) {var 






  dataSets, 
  files, 








  fileContents;return _regeneratorRuntime.async(function addObjectsToData$(context$1$0) {while (1) switch (context$1$0.prev = context$1$0.next) {case 0:if (typeof objects === 'string') {objects = [objects];}if (!(Array.isArray(objects) === false)) {context$1$0.next = 3;break;}throw new Error('addObjectsToData expects Array or String, given ' + typeof objects);case 3:dataSets = [];context$1$0.next = 6;return _regeneratorRuntime.awrap(expandGlobList(objects.filter(function (object) {try {debug('Attempting to parse ' + object + ' as JSON');dataSets.push(JSON.parse(object));return false;} catch (error) {return true;}})));case 6:files = context$1$0.sent;context$1$0.next = 9;return _regeneratorRuntime.awrap(_Promise.all(
        files.map(function registerPartial(file) {return _regeneratorRuntime.async(function registerPartial$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:
                debug('Loading JSON file ' + file);context$2$0.t0 = 
                JSON;context$2$0.next = 4;return _regeneratorRuntime.awrap(_fsPromise.readFile(file, 'utf8'));case 4:context$2$0.t1 = context$2$0.sent;return context$2$0.abrupt('return', context$2$0.t0.parse.call(context$2$0.t0, context$2$0.t1));case 6:case 'end':return context$2$0.stop();}}, null, this);})));case 9:fileContents = context$1$0.sent;return context$1$0.abrupt('return', 


        _lodashMerge2['default'].apply(undefined, [{}].concat(dataSets.concat(fileContents))));case 11:case 'end':return context$1$0.stop();}}, null, this);}


function renderHandlebarsTemplate(files) {var outputDirectory = arguments.length <= 1 || arguments[1] === undefined ? process.cwd() : arguments[1];var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];var stdout = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];return _regeneratorRuntime.async(function renderHandlebarsTemplate$(context$1$0) {while (1) switch (context$1$0.prev = context$1$0.next) {case 0:context$1$0.next = 2;return _regeneratorRuntime.awrap(
        _Promise.all(files.map(function renderTemplate(file) {var 

          path, 
          htmlContents;return _regeneratorRuntime.async(function renderTemplate$(context$2$0) {while (1) switch (context$2$0.prev = context$2$0.next) {case 0:debug('Rendering template ' + file + ' with data', data);path = _path.resolve(outputDirectory, _path.basename(file, _path.extname(file)) + '.html');context$2$0.t0 = _handlebars2['default'];context$2$0.next = 5;return _regeneratorRuntime.awrap(_fsPromise.readFile(file, 'utf8'));case 5:context$2$0.t1 = context$2$0.sent;context$2$0.t2 = data;htmlContents = context$2$0.t0.compile.call(context$2$0.t0, context$2$0.t1)(context$2$0.t2);if (!
                stdout) {context$2$0.next = 13;break;}context$2$0.next = 11;return _regeneratorRuntime.awrap(
                process.stdout.write(htmlContents, 'utf8'));case 11:context$2$0.next = 17;break;case 13:context$2$0.next = 15;return _regeneratorRuntime.awrap(

                _fsPromise.writeFile(path, htmlContents, 'utf8'));case 15:
                debug('Wrote ' + path);
                console.error('Wrote ' + path + ' from ' + file);case 17:case 'end':return context$2$0.stop();}}, null, this);})));case 2:case 'end':return context$1$0.stop();}}, null, this);}




if (require.main === module) {(function () {
    var options = _minimist2['default'](process.argv.slice(2), { 
      string: [
      'output', 
      'partial', 
      'helper', 
      'data'], 

      boolean: [
      'version', 
      'help', 
      'stdout'], 

      alias: { 
        'v': 'version', 
        'h': 'help', 
        'o': 'output', 
        's': 'stdout', 
        'D': 'data', 
        'P': 'partial', 
        'H': 'helper' } });


    debug('Parsed argv', options);
    if (options.version) {
      console.error(_packageJson2['default'].version);} else 
    if (options.help || !options._ || !options._.length) {
      console.error('\n    Usage:\n      hbs --version\n      hbs --help\n      hbs [-P <partial>]... [-H <helper>]... [-D <data>]... [-o <directory>] [--] (<template...>)\n\n      -h, --help                 output usage information\n      -v, --version              output the version number\n      -o, --output <directory>   Directory to output rendered templates, defaults to cwd\n      -s, --stdout               Output to standard output\n      -P, --partial <glob>...    Register a partial (use as many of these as you want)\n      -H, --helper <glob>...     Register a helper (use as many of these as you want)\n      -D, --data <glob|json>...  Parse some data\n\n    Examples:\n\n    hbs --helper handlebars-layouts --partial ./templates/layout.hbs -- ./index.hbs\n    hbs --data ./package.json --data ./extra.json ./homepage.hbs --output ./site/\n    hbs --helper ./helpers/* --partial ./partials/* ./index.hbs # Supports globs!\n    ');} else 



















    {(function () {
        var setup = [];
        var data = {};
        if (options.helper) {
          debug('Setting up helpers', options.helper);
          setup.push(expandGlobList(options.helper).then(addHandlebarsHelpers));}

        if (options.partial) {
          debug('Setting up partials', options.partial);
          setup.push(expandGlobList(options.partial).then(addHandlebarsPartials));}

        if (options.data) {
          debug('Setting up data', options.data);
          setup.push(addObjectsToData(options.data).then(function (result) {return data = result;}));}

        _Promise.all(setup).
        then(function () {return expandGlobList(options._);}).
        then(function (files) {return renderHandlebarsTemplate(files, options.output, data, options.stdout);})['catch'](
        function (error) {
          console.error(error.stack || error);
          process.exit(1);});})();}})();}