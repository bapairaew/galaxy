var Galaxy = require('../source/galaxy.js');
var Colony = require('../source/colony.js');
var Portal = require('../source/portal.js');
var Star = require('../source/star.js');
var andromeda = require('../andromeda.json');

window.galaxy = Galaxy.parse(andromeda);

// ------------------------------
// |     Chrome     |   Code      |
// ------------------------------
// |     Star       |   Colony    |
// |     Door       |   Star      |

window.findPath = function (a, b) {
  return galaxy.routeString(galaxy.getStarById(a.toLowerCase()), galaxy.getStarById(b.toLowerCase()));
};

window.createStar = function (srcColonyId, newColonyId) {
  var colony = new Colony(newColonyId, [], +newColonyId);
  var portals = Portal.bidirection(galaxy.getColonyById(srcColonyId), colony);
  galaxy.addColonies([colony]);
  galaxy.addPortals(portals);
};

window.addDoor = function (starId, colonyId) {
  var star = new Star(starId);
  galaxy.addStars(star);

  var colony = galaxy.getColonyById(colonyId);
  if (colony) {
    colony.addStars([star]);
  } else {
    console.error('This star does not existed.', colonyId);
  }
};

window.removeDoor = function (starId) {
  galaxy.removeStar(galaxy.getStarById(starId));
};

window.destroyStar = function (colonyId) {
  galaxy.removeColony(galaxy.getColonyById(colonyId));
};
