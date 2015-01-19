var Galaxy = require('../source/galaxy.js');
var andromeda = require('../andromeda.json');

window.galaxy = Galaxy.parse(andromeda);
window.findPath = function (a, b) {
  return galaxy.routeString(galaxy.getStarById(a.toLowerCase()), galaxy.getStarById(b.toLowerCase()));
};
