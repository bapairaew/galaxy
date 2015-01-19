// Hash for path finder
function Hash(distance, routes) {
  this.distance = distance;
  this.routes = routes;
}

Hash.prototype.distance = Infinity;

Hash.prototype.routes = [];

Hash.prototype.getLastRoute = function () {
  return this.routes[this.routes.length - 1];
};

module.exports = Hash;
