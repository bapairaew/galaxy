var Utility = require('./utility');

function Colony(id, stars, cost, portals) {
  this.id = id;
  this.stars = stars;
  this.cost = cost;
  this.portals = portals;
}

// Number/String
Colony.prototype.id = null;

// Array of stars in the colony
Colony.prototype.stars = [];

// Number
Colony.prototype.cost = 0;

// Portals
Colony.prototype.portals = [];

// Add portals to the colony
Colony.prototype.addStars = function (stars) {
  this.portals = Utility.makeItBecomeArray(this.stars).concat(stars);
};

// Add portals to the colony
Colony.prototype.addPortals = function (portals) {
  this.portals = Utility.makeItBecomeArray(this.portals).concat(portals);
};

// Check if the colony has the input star
Colony.prototype.hasStar = function (star) {
  return this.stars.indexOf(star) > -1;
};

// Parse list of colonies in json format to colony object
Colony.parse = function (list) {
  return list.map(function (item) {
    return new Colony(item.id, item.stars, item.cost);
  });
};

module.exports = Colony;
