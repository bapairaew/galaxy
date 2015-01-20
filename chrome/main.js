var Galaxy = require('../source/galaxy.js');
var Star = require('../source/star.js');
var Portal = require('../source/portal.js');
var Door = require('../source/door.js');
var andromeda = require('../andromeda.json');

window.galaxy = Galaxy.parse(andromeda);

window.findPath = function (a, b) {
  return galaxy.routeString(galaxy.getDoorById(a.toLowerCase()), galaxy.getDoorById(b.toLowerCase()));
};

window.createStar = function (srcStarId, newStarId) {
  var star = new Star(newStarId, [], +newStarId);
  var portals = Portal.bidirection(galaxy.getStarById(srcStarId), star);
  galaxy.addStars([star]);
  galaxy.addPortals(portals);
};

window.addDoor = function (doorId, starId) {
  var door = new Door(doorId);
  galaxy.addDoors(door);

  var star = galaxy.getStarById(starId);
  if (star) {
    star.addDoors([door]);
  } else {
    console.error('This star does not existed.', starId);
  }
};

window.removeDoor = function (doorId) {
  galaxy.removeDoor(galaxy.getDoorById(doorId));
};

window.destroyStar = function (starId) {
  galaxy.removeStar(galaxy.getStarById(starId));
};
