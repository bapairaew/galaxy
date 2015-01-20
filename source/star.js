var Utility = require('./utility');

function Star(id, doors, cost, portals) {
  this.id = id;
  this.doors = doors;
  this.cost = cost;
  this.portals = portals;
}

// Number/String
Star.prototype.id = null;

// Array of doors in the star
Star.prototype.doors = [];

// Number
Star.prototype.cost = 0;

// Portals
Star.prototype.portals = [];

// Add portals to the star
Star.prototype.addDoors = function (doors) {
  this.doors = Utility.makeItBecomeArray(this.doors).concat(doors);
};

// Add portals to the star
Star.prototype.addPortals = function (portals) {
  this.portals = Utility.makeItBecomeArray(this.portals).concat(portals);
};

// Remove a door
Star.prototype.removeDoor = function (door) {
  var index = this.doors.indexOf(door);

  if (index > -1) {
    this.doors.splice(index, 1);
  }
};

// Return readable name
Star.prototype.getReadableName = function () {
  return this.id.toUpperCase();
};

// Check if the star has the input door
Star.prototype.hasDoor = function (door) {
  return this.doors.indexOf(door) > -1;
};

// Parse list of stars in json format to star object
Star.parse = function (list) {
  return list.map(function (item) {
    return new Star(item.id, item.doors, item.cost);
  });
};

module.exports = Star;
