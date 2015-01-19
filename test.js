var Galaxy = require('./source/galaxy');
var fs = require('fs');

var json = JSON.parse(fs.readFileSync('andromeda.json', 'utf8'));
var galaxy = Galaxy.parse(json);

var testcases = {
  'a-b': '\'A\'->10->\'B\'',
  'c-l': '\'C\'->30->20->15->5->3->\'L\'',
  'r-a': '\'R\'->2->3->5->15->20->30->10->\'A\'',
  'p-b': 'No path found!'
};

var length = testcases.length;

for (var test in testcases) {
  var splits = test.split('-');
  var start = splits[0];
  var destination = splits[1];
  var actual = galaxy.routeString(galaxy.getStarById(start), galaxy.getStarById(destination));
  var expected = testcases[test];
  if (actual !== expected) {
    throw 'Fail!' + actual + expected;
  }
}

console.log('Success!');
