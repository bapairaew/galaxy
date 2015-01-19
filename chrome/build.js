var swig = require('swig');
var browserify = require('browserify')();
var fs = require('fs');

browserify.add('./chrome/main.js').bundle(function (error, buffer) {
  var tpl = swig.compileFile('./chrome/template.html');
  fs.writeFile('build/index.html', tpl({
    script: buffer.toString('utf8')
  }));
});
