var Star = require('./star');
var Colony = require('./colony');
var Portal = require('./portal');
var Set = require('./set');
var ObjectFinder = require('./object-finder');
var PathFinder = require('./path-finder');
var Utility = require('./Utility');

function Galaxy() { }

// Array of stars in the Galaxy
Galaxy.prototype.stars = [];

// Array of colonies in the Galaxy
Galaxy.prototype.colonies = [];

// Array of portals in the Galaxy
Galaxy.prototype.portals = [];

// Add stars to the Galaxy
Galaxy.prototype.addStars = function (stars) {
  this.stars = Utility.makeItBecomeArray(this.stars).concat(stars);
};

// Add colonies to the Galaxy
Galaxy.prototype.addColonies = function (colonies) {
  this.colonies = Utility.makeItBecomeArray(this.colonies).concat(colonies);

  this.colonies.forEach(function (colony) {
    // Add non-existed stars from colonies to galaxy
    this.addStars(Set.subtract(colony.stars, this.stars));
  }.bind(this));
};

// Add portals to the Galaxy
Galaxy.prototype.addPortals = function (portals) {
  this.portals = Utility.makeItBecomeArray(this.portals).concat(portals);

  this.portals.forEach(function (portal) {
    // Add non-existed portals from colonies to galaxy
    this.addColonies(Set.subtract([portal.exit1, portal.exit2], this.colonies));
  }.bind(this));
};

// Get star with input id
// null if not found
Galaxy.prototype.getStarById = function (id) {
  return ObjectFinder.find(this.stars, 'id', id);
};

// Get colony with input id
// null if not found
Galaxy.prototype.getColonyById = function (id) {
  return ObjectFinder.find(this.colonies, 'id', id);
};

// Get colony of the input star
// null if not found
Galaxy.prototype.getColonyByStar = function (star) {
  return ObjectFinder.findByTestFunction(this.colonies, function (colony) {
    return colony.hasStar(star);
  });
};

// Get routing from a to b
Galaxy.prototype.route = function (a, b) {
  if (a === null || b === null) {
    throw 'Star must not be null! - please check if your input star is existed.';
  }

  if (a === b) {
    throw 'You are already there!';
  }

  var result = PathFinder.search(this.getColonyByStar(a), this.getColonyByStar(b), this.portals);
  if (result === null) {
    throw 'No path found!';
  }

  return result.routes;
};

// Get routing string from a to b
Galaxy.prototype.routeString = function (a, b) {
  try {
    var routes = this.route(a, b);
    if (routes.length === 0) {  // Same colony
      return a.getReadableName() + '->' + this.getColonyByStar(a).cost + '->' + b.getReadableName();
    } else {
      var routesLength = routes.length;

      var path = a.getReadableName() + '->' + routes[0].exit1.cost;
      for (var i = 0; i < routesLength; i++) {
        path += '->' + routes[i].exit2.cost;
      }
      path += '->' + b.getReadableName();

      return path;
    }
  } catch (ex) {
    return ex;
  }
};

// Parse Galaxy json format to Galaxy object
Galaxy.parse = function (json) {
  var galaxy = new Galaxy();

  galaxy.addStars(Star.parse(json.stars));

  galaxy.addColonies(Colony.parse(json.colonies.map(function (colony) {
    // Star id to acutal star
    colony.stars = colony.stars.map(function (id) {
      return galaxy.getStarById(id);
    });
    return colony;
  })));

  galaxy.addPortals(Portal.parse(json.portals.map(function (portal) {
    // Colony id to acutal colony
    portal.exit1 = galaxy.getColonyById(portal.exit1);
    portal.exit2 = galaxy.getColonyById(portal.exit2);
    return portal;
  })));

  return galaxy;
};

module.exports = Galaxy;
