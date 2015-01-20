var Galaxy = require('./source/galaxy');
var Colony = require('./source/colony');
var Portal = require('./source/portal');
var Star = require('./source/star');
var fs = require('fs');

var getSampleGalaxy = function () {
  var json = JSON.parse(fs.readFileSync('andromeda.json', 'utf8'));
  return Galaxy.parse(json);;
};

var testRouting = function (galaxy, testcases) {
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
};

//// Basic Test ////

var galaxy = getSampleGalaxy();

testRouting(galaxy, {
  'a-b': '\'A\'->10->\'B\'',
  'c-l': '\'C\'->30->20->15->5->3->\'L\'',
  'r-a': '\'R\'->2->3->5->15->20->30->10->\'A\'',
  'p-b': 'No path found!'
});

console.log('Success!');

//// //Basic Test ////

//// Question #2 Test ////

galaxy = getSampleGalaxy();

var newColony = new Colony('17', [], 17);
var portals = Portal.bidirection(galaxy.getColonyById('20'), newColony);
galaxy.addColonies([newColony]);
galaxy.addPortals(portals);
var zStar = new Star('z');
galaxy.addStars([zStar]);
newColony.addStars([zStar]);

testRouting(galaxy, {
  'a-z': '\'A\'->10->30->20->17->\'Z\''
});

galaxy.removeStar(galaxy.getStarById('f'));

testRouting(galaxy, {
  'a-f': 'Star must not be null! - please check if your input star is existed.'
});

console.log('Success!');

//// //Question #2 Test ////

//// Special Test ////

galaxy = getSampleGalaxy();

var colonyToDestroy = galaxy.getColonyById('5');
galaxy.removeColony(colonyToDestroy);

testRouting(galaxy, {
  'a-k': '\'A\'->10->30->20->15->\'K\''
});

console.log('Success!');

//// //Special Test ////
