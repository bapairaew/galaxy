var Galaxy = require('./source/galaxy');
var Star = require('./source/star');
var Portal = require('./source/portal');
var Door = require('./source/door');
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
    var actual = galaxy.routeString(galaxy.getDoorById(start), galaxy.getDoorById(destination));
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

var newStar = new Star('17', [], 17);
var portals = Portal.bidirection(galaxy.getStarById('20'), newStar);
galaxy.addStars([newStar]);
galaxy.addPortals(portals);
var zDoor = new Door('z');
galaxy.addDoors([zDoor]);
newStar.addDoors([zDoor]);

testRouting(galaxy, {
  'a-z': '\'A\'->10->30->20->17->\'Z\''
});

galaxy.removeDoor(galaxy.getDoorById('f'));

testRouting(galaxy, {
  'a-f': 'Door must not be null! - please check if your input door is existed.'
});

console.log('Success!');

//// //Question #2 Test ////

//// Special Test ////

galaxy = getSampleGalaxy();

var starToDestroy = galaxy.getStarById('5');
galaxy.removeStar(starToDestroy);

testRouting(galaxy, {
  'a-k': '\'A\'->10->30->20->15->\'K\''
});

console.log('Success!');

//// //Special Test ////
