function Portal(exit1, exit2) {
  this.exit1 = exit1;
  this.exit2 = exit2;

  this.exit1.addPortals(exit1);
  this.exit2.addPortals(exit2);
}

// Inherhit path
// Exit colony 1
Portal.prototype.exit1 = null;

// Inherhit path
// Exit colony 2
Portal.prototype.exit2 = null;

// Inherhit path
// Get distance value
Portal.prototype.getDistance = function () {
  return this.exit2.cost;
};

// Get the counterpath
Portal.prototype.getInvert = function () {
  return new Portal(this.exit2, this.exit1);
};

// Check if the input portal has the same exits
Portal.prototype.isEqual = function (portal) {
  return this.exit1 === portal.exit1 && this.exit2 === portal.exit2;
};

// Create the portal and its inverse
Portal.bidirection = function (a, b) {
  return [
    new Portal(a, b),
    new Portal(b, a)
  ];
};

// Parse list of portals in json format to portal object
Portal.parse = function (list) {
  var portals = [];

  list.forEach(function (item) {
    portals = portals.concat(item.bidirectional ? Portal.bidirection(item.exit1, item.exit2) : [new Portal(item.exit1, item.exit2)]);
  });

  return portals
};

module.exports = Portal;
