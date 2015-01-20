var Door = require('./door');
var Star = require('./star');
var Portal = require('./portal');
var Set = require('./set');
var ObjectFinder = require('./object-finder');
var PathFinder = require('./path-finder');
var Utility = require('./Utility');

function Galaxy() { }

// Array of doors in the Galaxy
Galaxy.prototype.doors = [];

// Array of stars in the Galaxy
Galaxy.prototype.stars = [];

// Array of portals in the Galaxy
Galaxy.prototype.portals = [];

// Add doors to the Galaxy
Galaxy.prototype.addDoors = function (doors) {
  this.doors = Utility.makeItBecomeArray(this.doors).concat(doors);
};

// Add stars to the Galaxy
Galaxy.prototype.addStars = function (stars) {
  this.stars = Utility.makeItBecomeArray(this.stars).concat(stars);

  this.stars.forEach(function (star) {
    // Add non-existed doors from stars to galaxy
    this.addDoors(Set.subtract(star.doors, this.doors));
  }.bind(this));
};

// Remove a door
Galaxy.prototype.removeDoor = function (door) {
  var index = this.doors.indexOf(door);

  if (index > -1) {
    this.doors.splice(index, 1);
    this.stars.forEach(function (star) {
      star.removeDoor(door);
    });
  } else {
    throw 'Door does not existed';
  }
};

// Remove a star
// Redirect the portals
// Relocate the doors
Galaxy.prototype.removeStar = function (star)  {
  var index = this.stars.indexOf(star);

  if (index > -1) {
    // Redirect all portals connected to the removed star to the first exit1
    var portals = PathFinder.findPathsWhichHasEndingNode(this.portals, star);
    for (var i = 1; i < portals.length; i++) {
      var portal = portals[i];
      portal.exit1 = portals[0].exit1;
    }

    // Relocate all the doors belong to the star to the first connected star
    portals[0].exit1.addDoors(star.doors);

    // Remove all portals the still connected to the removed star
    this.portals = this.portals.filter(function (portal) {
      return portal.exit1 !== star || portal.exit2 !== star;
    });

    this.stars.forEach(function (c) {
      c.portals = star.portals.filter(function (portal) {
        return portal.exit1 !== star || portal.exit2 !== star;
      });
    });

    this.stars.splice(index, 1);
  } else {
    throw 'Star does not existed';
  }
};

// Add portals to the Galaxy
Galaxy.prototype.addPortals = function (portals) {
  this.portals = Utility.makeItBecomeArray(this.portals).concat(portals);

  this.portals.forEach(function (portal) {
    // Add non-existed portals from stars to galaxy
    this.addStars(Set.subtract([portal.exit1, portal.exit2], this.stars));
  }.bind(this));
};

// Get door with input id
// null if not found
Galaxy.prototype.getDoorById = function (id) {
  return ObjectFinder.find(this.doors, 'id', id);
};

// Get star with input id
// null if not found
Galaxy.prototype.getStarById = function (id) {
  return ObjectFinder.find(this.stars, 'id', id);
};

// Get star of the input door
// null if not found
Galaxy.prototype.getStarByDoor = function (door) {
  return ObjectFinder.findByTestFunction(this.stars, function (star) {
    return star.hasDoor(door);
  });
};

// Get routing from a to b
Galaxy.prototype.route = function (a, b) {
  if (a === null || b === null) {
    throw 'Door must not be null! - please check if your input door is existed.';
  }

  if (a === b) {
    throw 'You are already there!';
  }

  var result = PathFinder.search(this.getStarByDoor(a), this.getStarByDoor(b), this.portals);
  if (result === null) {
    throw 'No path found!';
  }

  return result.routes;
};

// Get routing string from a to b
Galaxy.prototype.routeString = function (a, b) {
  try {
    var routes = this.route(a, b);
    if (routes.length === 0) {  // Same star
      return a.getReadableName() + '->' + this.getStarByDoor(a).getReadableName() + '->' + b.getReadableName();
    } else {
      var routesLength = routes.length;

      var path = a.getReadableName() + '->' + routes[0].exit1.getReadableName();
      for (var i = 0; i < routesLength; i++) {
        path += '->' + routes[i].exit2.getReadableName();
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

  galaxy.addDoors(Door.parse(json.doors));

  galaxy.addStars(Star.parse(json.stars.map(function (star) {
    // Door id to acutal door
    star.doors = star.doors.map(function (id) {
      return galaxy.getDoorById(id);
    });
    return star;
  })));

  galaxy.addPortals(Portal.parse(json.portals.map(function (portal) {
    // Star id to acutal star
    portal.exit1 = galaxy.getStarById(portal.exit1);
    portal.exit2 = galaxy.getStarById(portal.exit2);
    return portal;
  })));

  return galaxy;
};

module.exports = Galaxy;
